export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { abstract = '', keywords = [], years = 5 } = req.body || {};
    const cleanAbstract = String(abstract).trim();
    const cleanKeywords = Array.isArray(keywords) ? keywords.map(x => String(x).trim()).filter(Boolean) : [];
    if (cleanAbstract.length < 120) return res.status(400).json({ error: 'Please enter a fuller abstract.' });

    const now = new Date().getFullYear();
    const fromYear = now - Math.max(1, Math.min(10, Number(years) || 5));

    async function callOpenAlex(mode) {
      const p = new URLSearchParams();
      if (mode === 'semantic') {
        let q = cleanAbstract.slice(0, 1700);
        if (cleanKeywords.length) q += ' Keywords: ' + cleanKeywords.slice(0, 10).join(', ').slice(0, 220);
        p.set('search.semantic', q.slice(0, 1950));
      } else {
        const fallback = cleanKeywords.length
          ? cleanKeywords.slice(0, 10).join(' OR ')
          : cleanAbstract.replace(/[^A-Za-z0-9\s-]/g, ' ').split(/\s+/).filter(x => x.length > 4).slice(0, 12).join(' OR ');
        p.set('search', fallback);
      }
      p.set('filter', `publication_year:>${fromYear},type:article`);
      p.set('per_page', '50');
      if (process.env.OPENALEX_API_KEY) p.set('api_key', process.env.OPENALEX_API_KEY);

      const url = 'https://api.openalex.org/works?' + p.toString();
      const response = await fetch(url, { headers: { Accept: 'application/json' } });
      let data = null;
      try { data = await response.json(); } catch {}
      return { response, data, url };
    }

    let mode = 'semantic';
    let out = await callOpenAlex('semantic');
    if (!out.response.ok) {
      mode = 'text';
      out = await callOpenAlex('text');
    }

    if (!out.response.ok) {
      return res.status(out.response.status).json({
        error: 'OpenAlex request failed',
        status: out.response.status,
        message: out.data?.message || out.data?.error || 'Unknown OpenAlex error'
      });
    }

    const results = (out.data?.results || []).filter(w => w?.primary_location?.source?.type === 'journal');
    return res.status(200).json({ mode, results, meta: out.data?.meta || null });
  } catch (error) {
    return res.status(500).json({ error: 'Proxy error', message: error?.message || String(error) });
  }
}
