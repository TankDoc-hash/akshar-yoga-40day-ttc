# Akshar Yoga — 40-Day Basic Residential Teacher Training Course (TTC)

A high-conversion landing page for **Akshar Yoga's Basic Level Residential Teacher Training Course**, tailored for Meta Ads and Google Ads targeting domestic Indian and international audiences.

---

## Design Scheme & Visual Identity

Engineered in alignment with the **Quiet Luxury & Wellness Retreat** aesthetic:
- **Palette**: Warm Ivory (`#FBF9F5`), Natural Linen/Sand (`#F3EFEA`), Deep Espresso Charcoal (`#1E1B18`), Muted Earth Taupe (`#7D7358`), and Subtle Champagne Gold (`#C2A267`).
- **Typography**: 
  - Headings: `Cormorant Garamond` (editorial serif)
  - Body: `Inter` (high legibility, generous line height)
  - Kickers / Overlines: Spaced uppercase tracking (`0.18em` to `0.22em`)
- **Structure**:
  - Top announcement banner (`TRANSFORM. DEEPEN. TEACH.`)
  - Full-bleed cinematic hero with authentic photography and dark gradient overlay
  - 4-column value strip (`40 Days & 200 Hours`, `Authentic Tradition`, `Residential Living`, `Global Cohorts`)
  - Split editorial feature blocks with authentic Akshar Yoga photography
  - 6-pillar curriculum grid with modal drawer
  - 5-phase 40-day progressive timeline
  - 3-tier luxury pricing cards with clear INR pricing (`₹1.75L`, `₹3.5L`, `₹5L`)
  - Purantha vs. CSE residential sanctuary comparison
  - Dedicated International + Indian admissions guidance with travel/visa advisory
  - Authentic student testimonials
  - Accessible FAQ accordion covering all required admissions questions
  - High-impact dark closing CTA

---

## Core Offer & Pricing Architecture

1. **Basic TTC — ₹1.75 Lakh INR**
   - 40 Days Training (200 Hours)
   - All Akshar Yoga TTC Material
   - 2 Diet & Health Consultations
   - DYC Access — 6 Months
   - 3 Ayurveda Therapy Sessions at Purantha
   - Special Training at Purantha (Min 8 sessions during training)
   - Awaken Tribe — 6 Months
   - 3-Day Purantha Camp Access
   - *Not included: Stay, food and travel.*

2. **CSE Residential — ₹3.5 Lakh INR (Residential Experience)**
   - 40 Days Training
   - TTC Material
   - Accommodation at CSE Residences (1 BHK accommodation)
   - Food included
   - Travel included
   - DYC Access — 6 Months
   - Awaken Tribe — 6 Months
   - Purantha experiences
   - 3-Day Purantha Camp Access
   - *Note: Facility charges are applicable as per residence/hotel terms.*

3. **Purantha Immersion — ₹5 Lakh INR (Full Immersion)**
   - 40 Days Training
   - Full Purantha Campus Access
   - 3 Ayurveda Sessions
   - 2 Medicinal Showers
   - 2 Tissue Healing Sessions* (*Subject to recommendation by experts)
   - Sattvik Food included
   - Awaken Tribe — 1 Year
   - DYC — 1 Year
   - 3-Day Purantha Camp Access

---

## Conversion & Lead Capture Design

1. **Two-Step Application Wizard**:
   - **Step 1**: Full Name, Email, Phone/WhatsApp (with international dialing code dropdown), Country of residence.
   - **Step 2**: Yoga experience level, preferred pricing tier (preselected based on which card was clicked), preferred start timing.
   - **Confirmation**: Instant thank-you screen + direct pre-populated WhatsApp chat link with admissions.
2. **Talk to Admissions Modal**:
   - One-step callback request with preferred contact window + direct phone lines (`+91 89717 00394`, `+91 97422 20607`).
3. **Direct WhatsApp Connect**:
   - Contextual pre-filled message generator routing inquiries to official admissions line.
4. **Sticky Mobile CTA Bar**:
   - Persistent on scroll (`₹1.75L INR onwards | APPLY NOW` + WhatsApp icon) optimized for Meta mobile ad traffic.

---

## Analytics, Ad Tracking & GTM DataLayer

Tracks the following events via `window.dataLayer.push()`:
- `page_view`
- `cta_click`
- `apply_click`
- `form_start`
- `form_submit`
- `whatsapp_click`
- `phone_click`
- `pricing_option_selected`
- `curriculum_open`
- `scroll_50`
- `scroll_90`

### UTM & Ad Parameter Persistence
Automatically captures and retains the following parameters in `sessionStorage` and `localStorage`, passing them into form submission payloads:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `gclid`
- `fbclid`

---

## SEO & Rich Schemas

- **H1**: Singular, editorial H1 matching prompt specifications.
- **Canonical URL**: `https://aksharyoga.com/basic-residential-ttc`
- **JSON-LD Schema**:
  - `EducationalOrganization`
  - `Course` (with structured `Offer` items in INR)
  - `FAQPage`

---

## Running the Preview Server

To start the local preview server:

```bash
npm start
```
or
```bash
node scripts/local-server.js
```

The landing page will be available at:
`http://localhost:3000`
