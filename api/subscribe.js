// Vercel serverless function. The only server-side code on this site, and it
// exists for one reason: beehiiv's API needs a Bearer token, and a token in a
// static page is a token anybody can read and use to write to our list.
//
// Environment variables, set in Vercel under Settings > Environment Variables:
//   BEEHIIV_API_KEY                    from beehiiv Settings > API
//   BEEHIIV_PUBLICATION_ID             pub_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
//   BEEHIIV_SCORECARD_AUTOMATION_ID    optional, see below
//
// The scorecard gate promises four worked examples. They are delivered by a
// beehiiv automation whose trigger is API, and this is what enrols people in
// it. Only people who finished the scorecard reach this endpoint, so passing
// the id here is the whole of the split: no segments, no tags, and somebody
// who subscribes on beehiiv directly is never enrolled and never sent them.
//
// Unset means nobody is enrolled, which means the gate is asking for an
// address in exchange for something that never arrives. Of every unset state
// in this repo, that is the one to fix first.
//
// ponytail: no rate limiting. The endpoint can be hit repeatedly to add
// addresses to the list. beehiiv's double opt-in means nothing is confirmed
// without the owner clicking, so the blast radius is junk pending records. If
// that becomes a real problem, put a rate limit here keyed on IP.

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST' });
  }

  const key = process.env.BEEHIIV_API_KEY;
  const pub = process.env.BEEHIIV_PUBLICATION_ID;
  const automation = process.env.BEEHIIV_SCORECARD_AUTOMATION_ID;
  if (!key || !pub) {
    // Loud, not silent. A missing key is a configuration mistake, and the page
    // needs to be able to tell the person we did not add them.
    console.error('subscribe: BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID is not set');
    return res.status(503).json({ error: 'Not configured' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {});
  const email = String(body.email || '').trim();
  if (!EMAIL.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  // The four scores travel with the address so the list knows what someone
  // scored without anyone copying it across by hand.
  const custom = [];
  if (Array.isArray(body.answers) && body.answers.length === 4
      && body.answers.every(n => Number.isInteger(n) && n >= 1 && n <= 5)) {
    custom.push({ name: 'scorecard_answers', value: body.answers.join('') });
    custom.push({ name: 'scorecard_total', value: String(body.answers.reduce((a, b) => a + b, 0)) });
  }
  if (typeof body.verdict === 'string' && body.verdict.length <= 60) {
    custom.push({ name: 'scorecard_verdict', value: body.verdict });
  }

  try {
    const payload = {
      email,
      reactivate_existing: true,
      send_welcome_email: true,
      utm_source: 'aifoundingtable.com',
      utm_medium: 'scorecard',
      utm_campaign: 'ai-readiness-scorecard',
      custom_fields: custom
    };
    if (automation) payload.automation_ids = [automation];

    const r = await fetch(`https://api.beehiiv.com/v2/publications/${encodeURIComponent(pub)}/subscriptions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      // Log the detail for us, return none of it to the browser.
      console.error('beehiiv responded', r.status, (await r.text()).slice(0, 500));
      return res.status(502).json({ error: 'Upstream refused' });
    }
    if (!automation) {
      // Not fatal, so the score still gets shown, but it must not be quiet.
      console.warn('subscribe: BEEHIIV_SCORECARD_AUTOMATION_ID is not set, so nobody is being sent the four examples the gate promised');
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('subscribe threw', err && err.message);
    return res.status(502).json({ error: 'Upstream unreachable' });
  }
};

function safeParse(s) { try { return JSON.parse(s) } catch { return {} } }
