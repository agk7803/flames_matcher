
-- Create matches table for storing compatibility results
CREATE TABLE public.matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name1 TEXT NOT NULL,
  name2 TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  message TEXT NOT NULL,
  quote TEXT NOT NULL,
  share_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- Public read policy (anyone with share link can view)
CREATE POLICY "Anyone can view matches by share_id"
ON public.matches
FOR SELECT
USING (true);

-- Allow inserts from edge function (anon key)
CREATE POLICY "Allow anonymous inserts"
ON public.matches
FOR INSERT
WITH CHECK (true);
