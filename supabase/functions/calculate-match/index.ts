import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const quotes: Record<string, string[]> = {
  high: [
    "A love story for the ages ✨",
    "Written in the stars, destined by fate 💫",
    "Two hearts beating as one 💕",
    "The universe conspired to bring you together 🌙",
  ],
  medium: [
    "A spark that could ignite the heavens 🔥",
    "Love is a journey, and yours has just begun 🌹",
    "Opposites attract, darling 💘",
    "Every great love starts with a little mystery ✨",
  ],
  low: [
    "Sometimes the best stories are the unexpected ones 🦋",
    "Love works in mysterious ways 🌸",
    "The heart wants what the heart wants 💭",
    "Every connection has its own magic ✨",
  ],
};

const messages: Record<string, string[]> = {
  high: [
    "Your names dance together like poetry in motion. This is a connection that transcends the ordinary.",
    "The stars have aligned for you two. Your compatibility radiates with a warmth that few ever experience.",
    "Rare and radiant — your bond carries the energy of a thousand love letters.",
  ],
  medium: [
    "There's a beautiful tension between your names — a pull that draws you together with curious magnetism.",
    "Your connection holds the promise of adventure. Where there's intrigue, there's often love waiting to bloom.",
    "Like the moon and the tide, you influence each other in ways both subtle and profound.",
  ],
  low: [
    "Your names carry contrasting energies — and that contrast is where the most fascinating stories are born.",
    "The most legendary romances were the ones nobody expected. Your story could be one for the books.",
    "Different rhythms can create the most beautiful melodies when they find their harmony.",
  ],
};

function calculateScore(name1: string, name2: string): number {
  const combined = (name1 + name2).toLowerCase().replace(/\s/g, "");
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  // Map to 45-99 range for fun results
  return 45 + Math.abs(hash % 55);
}

function generateShareId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name1, name2 } = await req.json();

    if (!name1 || !name2) {
      return new Response(
        JSON.stringify({ error: "Both names are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const score = calculateScore(name1, name2);
    const tier = score >= 80 ? "high" : score >= 60 ? "medium" : "low";

    const quoteList = quotes[tier];
    const messageList = messages[tier];
    const quote = quoteList[Math.floor(Math.random() * quoteList.length)];
    const message = messageList[Math.floor(Math.random() * messageList.length)];
    const shareId = generateShareId();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!
    );

    const { error } = await supabase.from("matches").insert({
      name1,
      name2,
      score,
      message,
      quote,
      share_id: shareId,
    });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ score, message, quote, shareId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
