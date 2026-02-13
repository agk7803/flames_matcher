

# 💕 Valentine Couple Matcher

A romantic, elegant web app where users enter two names and get a fun compatibility result with beautiful typography, animations, and a downloadable keepsake card.

---

## Typography System
- **Headings**: Elegant serif font (Playfair Display) — e.g., *"You were written in the stars ✨"*
- **Buttons & UI**: Soft rounded font (Nunito / Quicksand) for a warm, approachable feel
- **Quotes & Messages**: Script/calligraphy font (Dancing Script / Great Vibes) for romantic flair
- **Subtext**: Soft italic serif for supporting copy

---

## Page 1: Landing Page (`/`)
- Romantic hero with floating heart/petal animations
- Large serif heading: *"Discover Your Love Story"*
- Script font tagline beneath
- Prominent soft-rounded "Match Your Hearts 💕" button
- Cream/blush/burgundy color palette throughout

## Page 2: Matcher Form (`/match`)
- Two elegant name input fields with subtle heart icons
- Beautiful animated "Match" button
- Smooth transition when submitting

## Page 3: Results (`/result/:id`)
- **Typewriter animation** reveals the compatibility message letter by letter — building romantic suspense
- Animated love score (circular heart-fill or progress ring)
- Script-font quote based on score range (e.g., *"A love story for the ages"* or *"Opposites attract, darling"*)
- Soft italic serif subtext with details

### Result Actions:
- **"Save Our Story" button** — generates and downloads a beautiful keepsake card (image) with:
  - Both names in script font
  - The compatibility score
  - The romantic quote
  - A decorative border with hearts/florals
  - Date stamp
- **Share link** — copyable URL so couples can show off their result
- **Try Again** button

---

## Design & Feel
- **Colors**: Soft rose, blush pink, cream backgrounds, deep burgundy accents, rose gold touches
- **Animations**: Floating hearts, typewriter text reveal, smooth page transitions, score animation
- **Overall**: Sophisticated, romantic, Instagram-worthy, keepsake-worthy

---

## Backend (Lovable Cloud)
- **`matches` table**: stores names, score, unique share ID, romantic message, timestamp
- **Edge function**: runs the compatibility algorithm server-side (keeps the formula secret)
- **Shareable URLs**: each match gets a unique `/result/:id` link

---

## Pages Summary
1. **`/`** — Landing page with romantic CTA
2. **`/match`** — Enter names, get matched
3. **`/result/:id`** — Shareable result with typewriter animation, score, quote, and "Save Our Story" download

