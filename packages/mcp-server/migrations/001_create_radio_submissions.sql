-- SQL migration to create radio_submissions table for Supabase/Postgres
CREATE TABLE IF NOT EXISTS radio_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text,
  cid text NOT NULL,
  livepeer_asset_id text,
  playback_id text,
  title text,
  artist text,
  metadata jsonb,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_radio_submissions_user ON radio_submissions(user_id);
