# Consulta 360 — Dra. Cristiane Martins
Plataforma clínica · Metodologia Respira e Cresce 360

## Stack
- Frontend: HTML/CSS/JS (single file)
- Base de dados: Supabase (PostgreSQL)
- Auth: Supabase Auth
- Hosting: Vercel

## Variáveis de ambiente (configurar no Vercel)
```
SUPABASE_URL=https://XXXXXXXX.supabase.co
SUPABASE_KEY=eyJhbGci...
```

## SQL — criar tabela no Supabase
```sql
CREATE TABLE consultas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age TEXT,
  tipo TEXT DEFAULT 'base',
  parent TEXT,
  phone TEXT,
  data JSONB DEFAULT '{}',
  semaphores JSONB DEFAULT '{"1":"a","2":"r","3":"a","4":"g"}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE consultas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users own data" ON consultas FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_consultas_user_id ON consultas(user_id);
```
