module.exports = (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const clean = (v) => (v || "").replace(/\s+/g, "");
  const supabaseUrl = clean(process.env.SUPABASE_URL);
  const supabaseKey = clean(process.env.SUPABASE_ANON_KEY);

  if (!supabaseUrl || !supabaseKey) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({
      error: "SUPABASE_URL e SUPABASE_ANON_KEY têm de estar configuradas no Vercel."
    }));
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify({ supabaseUrl, supabaseKey }));
};
