import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BASE_URL from "./config/api";

/* ─────────────────────────────────────────────────────────
   ADMIN CREDENTIALS (hardcoded)
───────────────────────────────────────────────────────── */
const ADMIN_EMAIL = "admin@markvibe.in";
const ADMIN_PASSWORD = "Markvibe@2026";

/* ─────────────────────────────────────────────────────────
   PHOTO MAP
───────────────────────────────────────────────────────── */
const DEFAULT_PHOTOS = {
  hero: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85&fit=crop",
  about:
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80&fit=crop",
  kitchen:
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80&fit=crop",
  wardrobe:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&fit=crop",
  livingroom:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80&fit=crop",
  fullhome:
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80&fit=crop",
  ceiling:
    "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=900&q=80&fit=crop",
  wallpaper:
    "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=900&q=80&fit=crop",
  step1:
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=700&q=80&fit=crop",
  step2:
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=700&q=80&fit=crop",
  step3:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80&fit=crop",
  step4:
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80&fit=crop",
  step5:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&fit=crop",
  step6:
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=700&q=80&fit=crop",
  proj1:
     "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80&fit=crop",
  proj2:
     "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80&fit=crop",
  proj3:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80&fit=crop",
  proj4:
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80&fit=crop",
  proj5:
    "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=700&q=80&fit=crop",
  proj6:
    "https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?w=700&q=80&fit=crop",
  proj7:
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=700&q=80&fit=crop",
  proj8:
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=700&q=80&fit=crop",
};

const PHOTO_LABELS = {
  hero: "Hero Background",
  about: "About Strip",
  kitchen: "Kitchen Speciality",
  wardrobe: "Wardrobe Speciality",
  livingroom: "Living Room Speciality",
  fullhome: "Full Home Speciality",
  ceiling: "Ceiling Speciality",
  wallpaper: "Wallpaper Speciality",
  step1: "Step 1 – Consultation",
  step2: "Step 2 – 3D Design",
  step3: "Step 3 – Quotation",
  step4: "Step 4 – Factory",
  step5: "Step 5 – Logistics",
  step6: "Step 6 – Handover",
  proj1: "Portfolio 1",
  proj2: "Portfolio 2",
  proj3: "Portfolio 3",
  proj4: "Portfolio 4",
  proj5: "Portfolio 5",
  proj6: "Portfolio 6",
  proj7: "Portfolio 7",
  proj8: "Portfolio 8",
};

const G = "#B8892A";

/* ─────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --gold:#B8892A;--gold-light:#D4A84B;--gold-pale:#FDF6E9;
      --ink:#1A1714;--ink-2:#2E2A27;--muted:#7A746E;
      --border:#E8E2DA;--white:#FFFFFF;--off-white:#FAFAF8;
    }
    html{scroll-behavior:smooth}
    body{background:var(--white);color:var(--ink);font-family:'DM Sans',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:#f5f5f3}
    ::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}
    .serif{font-family:'Playfair Display',serif}
    .section-label{font-size:.68rem;letter-spacing:.25em;text-transform:uppercase;color:#a8842f, 42);font-weight:500;font-family:'DM Sans',sans-serif}
    .section-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3.2rem);font-weight:600;line-height:1.15;color:var(--ink)}
    .gold-divider{width:48px;height:2px;background:linear-gradient(90deg,var(--gold),var(--gold-light));margin:16px 0 28px}
    .gold-divider.center{margin:16px auto 28px}

    /* Buttons */
    .btn-primary{background:var(--ink);color:#fff;font-family:'DM Sans',sans-serif;font-weight:500;font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;padding:14px 30px;border:2px solid var(--ink);cursor:pointer;transition:background .22s,color .22s,transform .18s;display:inline-block}
    .btn-primary:hover{background:transparent;color:var(--ink);transform:translateY(-2px)}
    .btn-gold{background:linear-gradient(135deg,var(--gold) 0%,var(--gold-light) 100%);color:#fff;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;padding:14px 30px;border:none;cursor:pointer;transition:opacity .22s,transform .18s;display:inline-block;box-shadow:0 4px 20px rgba(184,137,42,.3)}
    .btn-gold:hover{opacity:.88;transform:translateY(-2px)}
    .btn-outline{background:transparent;color:var(--ink);border:1.5px solid var(--border);padding:13px 28px;font-family:'DM Sans',sans-serif;font-weight:500;font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:border-color .2s,color .2s}
    .btn-outline:hover{border-color:var(--gold);color:var(--gold)}
    .btn-sm{padding:9px 18px;font-size:.7rem}

    /* Nav */
    .nav-link{font-size:.74rem;letter-spacing:.12em;text-transform:uppercase;color:var(--ink);font-weight:500;cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif;padding:4px 0;position:relative;transition:color .2s;white-space:nowrap}
    .nav-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1.5px;background:var(--gold);transition:width .25s ease}
    .nav-link:hover{color:var(--gold)}
    .nav-link:hover::after{width:100%}

    /* Spec tabs */
    .spec-tab{padding:9px 18px;border:1.5px solid var(--border);background:var(--white);color:var(--muted);font-size:.76rem;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:400;transition:all .2s;white-space:nowrap}
    .spec-tab.active{border-color:var(--gold);background:var(--gold-pale);color:var(--gold);font-weight:600}

    /* Comparison */
    .comp-table{width:100%;border-collapse:collapse}
    .comp-table th{padding:18px 14px;font-size:.73rem;letter-spacing:.15em;text-transform:uppercase;font-weight:600;border-bottom:2px solid var(--border)}
    .comp-table th.us{background:var(--ink);color:#fff}
    .comp-table th.them{background:var(--off-white);color:var(--muted)}
    .comp-table td{padding:14px 14px;font-size:.86rem;border-bottom:1px solid var(--border);vertical-align:middle}
    .comp-table tr:last-child td{border-bottom:none}
    .comp-table td.feature{font-weight:500;color:var(--ink-2);font-size:.84rem;padding:14px 22px}
    .comp-table td.us-col{background:#FFFDF7;text-align:center}
    .comp-table td.them-col{background:var(--off-white);text-align:center}
    .comp-table tr:hover td{background:#FDF9F0}
    .comp-table tr:hover td.them-col{background:#F0EFED}

    /* Process */
    .step-num-btn{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:600;cursor:pointer;transition:all .3s;border:1.5px solid var(--border);background:var(--white);color:var(--muted);font-family:'DM Sans',sans-serif;flex-shrink:0}
    .step-num-btn.active{background:var(--ink);color:var(--white);border-color:var(--ink);transform:scale(1.12)}
    .step-num-btn:not(.active):hover{border-color:var(--gold);color:var(--gold)}

    /* Portfolio */
    .portfolio-card{position:relative;overflow:hidden;cursor:pointer}
    .portfolio-card img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease;display:block}
    .portfolio-card:hover img{transform:scale(1.06)}
    .portfolio-card .p-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(26,23,20,.88) 100%);opacity:0;transition:opacity .3s}
    .portfolio-card:hover .p-overlay{opacity:1}
    .portfolio-card .p-label{position:absolute;bottom:20px;left:20px;right:20px;transform:translateY(12px);opacity:0;transition:all .3s}
    .portfolio-card:hover .p-label{transform:translateY(0);opacity:1}

    /* Pricing */
    .pricing-card{border:1.5px solid var(--border);background:var(--white);transition:all .3s;position:relative;overflow:hidden}
    .pricing-card.featured{border-color:var(--gold);background:var(--ink);box-shadow:0 12px 48px rgba(0,0,0,.18)}
    .pricing-card:not(.featured):hover{box-shadow:0 8px 36px rgba(0,0,0,.1);border-color:var(--gold-light);transform:translateY(-4px)}

    /* Why / Sol / Testi */
    .why-card{background:var(--off-white);padding:28px 20px;border:1px solid var(--border);text-align:center;transition:all .3s}
    .why-card:hover{background:var(--white);box-shadow:0 6px 30px rgba(184,137,42,.12);border-color:var(--gold-light)}
    .sol-card{background:var(--white);border:1px solid var(--border);padding:20px 14px;text-align:center;transition:all .28s}
    .sol-card:hover{border-color:var(--gold-light);background:var(--gold-pale);transform:translateY(-3px)}
    .testi-card{background:var(--off-white);border:1px solid var(--border);padding:32px 28px;position:relative;display:flex;flex-direction:column;height:100%}
    .testi-card::before{content:'"';font-family:'Playfair Display',serif;font-size:6rem;color:var(--gold);opacity:.12;position:absolute;top:-10px;left:14px;line-height:1;pointer-events:none}

    /* Form inputs */
    .form-input{width:100%;border:1.5px solid var(--border);padding:13px 15px;font-family:'DM Sans',sans-serif;font-size:.88rem;color:var(--ink);background:var(--white);outline:none;transition:border-color .2s;border-radius:0}
    .form-input:focus{border-color:var(--gold)}
    .form-input::placeholder{color:#B0ABA5}
    textarea.form-input{min-height:100px;resize:vertical}
    select.form-input{cursor:pointer}

    /* Modal */
    .modal-overlay{position:fixed;inset:0;background:rgba(26,23,20,.78);backdrop-filter:blur(8px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px}
    .modal-box{background:var(--white);width:90%;max-width:520px;padding:48px 40px;position:relative;box-shadow:0 24px 80px rgba(0,0,0,.25);max-height:90vh;overflow-y:auto}
    .bhk-btn{border:1.5px solid var(--border);padding:16px 12px;text-align:center;cursor:pointer;transition:all .2s;background:var(--white);font-family:'DM Sans',sans-serif;font-size:.86rem;color:var(--ink)}
    .bhk-btn:hover,.bhk-btn.sel{border-color:var(--gold);background:var(--gold-pale);color:var(--gold)}

    /* Star rating */
    .star-btn{background:none;border:none;font-size:1.6rem;cursor:pointer;padding:0 3px;transition:transform .15s;line-height:1}
    .star-btn:hover{transform:scale(1.2)}

    /* Footer */
    .footer-link{font-size:.8rem;color:#6E685E;letter-spacing:.04em;transition:color .2s;cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif;text-align:left;display:block;padding:4px 0;line-height:1.6}
    .footer-link:hover{color:var(--gold)}

    #scroll-bar{position:fixed;top:0;left:0;height:3px;z-index:10000;background:linear-gradient(90deg,var(--gold),var(--gold-light));transition:width .1s linear;pointer-events:none}

    /* ── ADMIN PANEL ── */
    .admin-panel{position:fixed;inset:0;z-index:10001;background:#0F0E0C;color:#E8E2DA;font-family:'DM Sans',sans-serif;display:flex;flex-direction:column;overflow:hidden}
    .admin-topbar{height:58px;background:#1A1714;border-bottom:1px solid #2E2A27;display:flex;align-items:center;justify-content:space-between;padding:0 28px;flex-shrink:0}
    .admin-body{display:flex;flex:1;overflow:hidden}
    .admin-sidebar{width:220px;background:#131110;border-right:1px solid #2E2A27;padding:24px 0;flex-shrink:0;overflow-y:auto}
    .admin-content{flex:1;overflow-y:auto;padding:32px}
    .admin-nav-item{display:flex;align-items:center;gap:10px;padding:11px 20px;cursor:pointer;font-size:.82rem;color:#7A746E;transition:all .2s;border-left:3px solid transparent}
    .admin-nav-item:hover{color:#E8E2DA;background:rgba(255,255,255,.04)}
    .admin-nav-item.active{color:var(--gold);border-left-color:var(--gold);background:rgba(184,137,42,.08)}
    .admin-card{background:#1A1714;border:1px solid #2E2A27;padding:20px;border-radius:4px}
    .admin-table{width:100%;border-collapse:collapse;font-size:.82rem}
    .admin-table th{padding:11px 14px;text-align:left;font-size:.68rem;letter-spacing:.15em;text-transform:uppercase;color:#7A746E;border-bottom:1px solid #2E2A27;font-weight:500}
    .admin-table td{padding:12px 14px;border-bottom:1px solid #1E1B18;vertical-align:top;color:#C8C2BC;line-height:1.5}
    .admin-table tr:hover td{background:rgba(255,255,255,.025)}
    .status-badge{display:inline-block;padding:3px 10px;font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;font-weight:600;border-radius:2px}
    .status-new{background:rgba(184,137,42,.15);color:var(--gold)}
    .status-read{background:rgba(255,255,255,.06);color:#7A746E}
    .admin-input{width:100%;background:#0F0E0C;border:1px solid #2E2A27;color:#E8E2DA;padding:10px 13px;font-family:'DM Sans',sans-serif;font-size:.84rem;outline:none;transition:border-color .2s;border-radius:0}
    .admin-input:focus{border-color:var(--gold)}
    .admin-input::placeholder{color:#4A4540}
    .img-thumb{width:70px;height:50px;object-fit:cover;border:1px solid #2E2A27;display:block}
    .img-slot{background:#131110;border:1px dashed #2E2A27;padding:18px 14px;text-align:center;transition:border-color .2s}
    .img-slot:hover{border-color:var(--gold)}

    @media(max-width:900px){
      .hide-md{display:none!important}
      .two-col{grid-template-columns:1fr!important}
      .three-col{grid-template-columns:1fr 1fr!important}
      .five-col{grid-template-columns:1fr 1fr!important}
      .six-col{grid-template-columns:repeat(3,1fr)!important}
      .modal-box{padding:32px 20px!important}
      .admin-sidebar{width:180px}
    }
    @media(max-width:600px){
      .three-col{grid-template-columns:1fr!important}
      .six-col{grid-template-columns:1fr 1fr!important}
      .five-col{grid-template-columns:1fr 1fr!important}
      .admin-body{flex-direction:column}
      .admin-sidebar{width:100%;border-right:none;border-bottom:1px solid #2E2A27;padding:8px 0;display:flex;overflow-x:auto}
      .admin-nav-item{border-left:none;border-bottom:3px solid transparent;white-space:nowrap}
      .admin-nav-item.active{border-left-color:transparent;border-bottom-color:var(--gold)}
    }
  `}</style>
);

/* ─────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────── */
const Reveal = ({ children, delay = 0, style = {}, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    style={style}
    className={className}
  >
    {children}
  </motion.div>
);

const CheckIcon = ({ size = 20, color = "#27AE60" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    style={{ display: "inline-block", flexShrink: 0 }}
  >
    <circle
      cx="10"
      cy="10"
      r="9"
      fill={color}
      fillOpacity=".12"
      stroke={color}
      strokeWidth="1.5"
    />
    <path
      d="M6 10.5l3 3 5-6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const CrossIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    style={{ display: "inline-block", flexShrink: 0 }}
  >
    <circle
      cx="10"
      cy="10"
      r="9"
      fill="#E74C3C"
      fillOpacity=".1"
      stroke="#E74C3C"
      strokeWidth="1.5"
    />
    <path
      d="M7 7l6 6M13 7l-6 6"
      stroke="#E74C3C"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const PartialIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    style={{ display: "inline-block", flexShrink: 0 }}
  >
    <circle
      cx="10"
      cy="10"
      r="9"
      fill={G}
      fillOpacity=".1"
      stroke={G}
      strokeWidth="1.5"
    />
    <path d="M6 10h8" stroke={G} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

/* ─────────────────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────────────────── */
const SPECIALITIES_DATA = [
  {
    key: "kitchen",
    title: "Modular Kitchen Design",
    tagline: "India's Most Trusted Kitchen Specialists",
    desc: "Our modular kitchens are engineered specifically for Indian cooking — built to handle high heat, heavy daily usage, and moisture. Every unit features soft-close hinges, anti-termite boards, and waterproof carcasses that last decades, not years.",
    features: [
      "Marine-grade BWP plywood carcass (not MDF)",
      "Hettich / Häfele European hardware",
      "Soft-close tandem boxes & drawers",
      "Anti-scratch laminates, acrylic & PU lacquer",
      "Built for Indian heavy cooking habits",
      "Modular pull-out systems for every zone",
    ],
    advantage:
      "All kitchens are manufactured in our ISO-certified factory with 32 quality checkpoints — not built on-site with unpredictable carpenter quality.",
    badge: "Most Booked",
  },
  {
    key: "wardrobe",
    title: "Wardrobe & Storage",
    tagline: "Maximum Space, Zero Wasted Inch",
    desc: "We design storage around how you actually live — separate zones for daily wear, formal clothing, accessories, shoes, and seasonal items. Every wardrobe is planned by a dedicated storage specialist.",
    features: [
      "Sliding, hinged & walk-in configurations",
      "Full-height designs up to 12 ft",
      "Interior LED lighting & vanity mirrors",
      "Velvet-lined drawers & jewellery trays",
      "Trouser racks, tie holders, shoe racks included",
      "Anti-humidity backing boards",
    ],
    advantage:
      "Our proprietary storage planning software maps 100% of your wardrobe space before production begins — guaranteeing every item has a home.",
    badge: null,
  },
  {
    key: "livingroom",
    title: "Living Room & TV Units",
    tagline: "Where Your Home Makes Its First Impression",
    desc: "We design living rooms that balance visual impact with everyday function. From sculptural TV wall units with integrated storage to custom entertainment centers — your living room becomes the room guests remember.",
    features: [
      "Wall-mounted & floor-standing designs",
      "Integrated cable management (no visible wires)",
      "Backlit panels & LED accent lighting",
      "Matching crockery & display shelving",
      "Custom sofa & center tables available",
      "Fluted, cane & stone panel options",
    ],
    advantage:
      "Our living room designs are backed by 3D photorealistic renders showing exact material textures, so you see the finished room before we build it.",
    badge: null,
  },
  {
    key: "fullhome",
    title: "Complete Home Interiors",
    tagline: "One Vision. Every Room. Zero Stress.",
    desc: "From front door to master bedroom, we design and execute the entire home as one cohesive vision — with a single project manager, one timeline, and one point of contact from design to final handover.",
    features: [
      "Single PM handles your entire project",
      "3D room-by-room walkthrough before execution",
      "Unified design language across all spaces",
      "Vastu & space planning included free",
      "Civil, electrical, plumbing coordination",
      "100-point snagging inspection at handover",
    ],
    advantage:
      "Whole-home projects get priority factory slots, a senior designer, and a guaranteed handover date — with a penalty clause if we're late.",
    badge: "Best Value",
  },
  {
    key: "ceiling",
    title: "False Ceiling & Lighting",
    tagline: "Where Atmosphere Is Engineered",
    desc: "Lighting transforms a room from ordinary to exceptional. Our ceiling and lighting designers use layered light techniques — ambient, accent, and task — to engineer the mood of every space with precision.",
    features: [
      "POP, gypsum, wood & coffered ceilings",
      "Recessed, cove, pendant & track lighting",
      "Smart lighting (Alexa / Google Home ready)",
      "Energy-efficient LED systems throughout",
      "Acoustic ceiling panels for bedrooms",
      "Dimmable circuits for every zone",
    ],
    advantage:
      "We use light simulation software to show you exactly how a room will feel at different times of day before we install a single fixture.",
    badge: null,
  },
  {
    key: "wallpaper",
    title: "Wallpaper & Wall Treatments",
    tagline: "Textures That Change How a Room Feels",
    desc: "Walls are the largest canvas in your home. We stock 2,000+ wallpaper designs and offer fluted panels, stone cladding, limewash, Venetian plaster, and textured paint — installed by experts with a clean-finish guarantee.",
    features: [
      "2,000+ wallpaper designs in studio",
      "Imported European & domestic options",
      "Fluted wood & stone cladding panels",
      "Limewash & Venetian plaster effects",
      "Expert installation (no bubbles guarantee)",
      "Wall art & painting coordination",
    ],
    advantage:
      "Physical wallpaper samples delivered to your home before you decide — so you see the real texture and colour in your actual lighting conditions.",
    badge: null,
  },
];

const COMPARISON_ROWS = [
  {
    feature: "3D Visualisation Before Execution",
    detail: "Photorealistic renders + VR walkthrough",
    us: "full",
    them: "partial",
  },
  {
    feature: "Dedicated Project Manager",
    detail: "One PM from first meeting to handover",
    us: "full",
    them: "cross",
  },
  {
    feature: "Fixed Price at Booking",
    detail: "Signed quote = final price, guaranteed",
    us: "full",
    them: "partial",
  },
  {
    feature: "45-Day Delivery Guarantee",
    detail: "Penalty clause in contract for delays",
    us: "full",
    them: "cross",
  },
  {
    feature: "10-Year Comprehensive Warranty",
    detail: "Covers materials AND workmanship",
    us: "full",
    them: "partial",
  },
  {
    feature: "ISO-Certified Factory Manufacturing",
    detail: "Not site-built carpentry",
    us: "full",
    them: "partial",
  },
  {
    feature: "In-House Design + Execution Team",
    detail: "No third-party contractors ever",
    us: "full",
    them: "partial",
  },
  {
    feature: "Physical Sample Box Delivered to You",
    detail: "Touch & see materials before deciding",
    us: "full",
    them: "cross",
  },
  {
    feature: "Vastu Consultation Included",
    detail: "Complimentary with every project",
    us: "full",
    them: "cross",
  },
  {
    feature: "Smart Home Integration Support",
    detail: "Alexa, Google, Lutron compatible",
    us: "full",
    them: "cross",
  },
  {
    feature: "Light Simulation Software",
    detail: "See lighting mood before installation",
    us: "full",
    them: "cross",
  },
  {
    feature: "0% EMI (No Interest Cost)",
    detail: "Up to 24 months, zero extra charge",
    us: "full",
    them: "partial",
  },
  {
    feature: "Post-Handover Service (1 Year Free)",
    detail: "Dedicated support team after delivery",
    us: "full",
    them: "cross",
  },
  {
    feature: "100-Point Snagging Inspection",
    detail: "Signed checklist before you take keys",
    us: "full",
    them: "cross",
  },
];

const STEPS_DATA = [
  {
    num: "01",
    title: "Free Design Consultation",
    desc: "A senior designer visits your home for a 60-minute session. We study your floor plan, understand your lifestyle, family habits, and aesthetic preferences. No generic templates, ever.",
    time: "Day 1",
    photoKey: "step1",
  },
  {
    num: "02",
    title: "3D Design & Material Selection",
    desc: "Within 7 working days you receive photorealistic 3D renders of every room. Walk through your home virtually before a single nail is hammered. Physical samples delivered to your door.",
    time: "Days 2–7",
    photoKey: "step2",
  },
  {
    num: "03",
    title: "Fixed Quotation & Booking",
    desc: "Receive a fully itemised quote — every material, SKU, and labour charge listed. This is your final price. Sign, pay booking amount, and your price is locked with a penalty clause.",
    time: "Day 8",
    photoKey: "step3",
  },
  {
    num: "04",
    title: "Factory Production",
    desc: "Your modular units enter production at our ISO-certified facility with 32 quality checkpoints. Every panel is labelled to your floor plan — consistent, measurable, guaranteed.",
    time: "Days 9–35",
    photoKey: "step4",
  },
  {
    num: "05",
    title: "Site Prep & Logistics",
    desc: "Our civil team handles all site work — electrical, plumbing, surface preparation — running parallel to factory production. Materials are GPS-tracked from factory to your home.",
    time: "Days 20–42",
    photoKey: "step5",
  },
  {
    num: "06",
    title: "Installation & Handover",
    desc: "Our full-time installation crew installs everything with precision. Final 100-point snagging inspection. Any snag is fixed before you receive the keys. You sign the handover document — and you're home.",
    time: "Days 40–45",
    photoKey: "step6",
  },
];

const PORTFOLIO_DATA = [
  {
    photoKey: "proj1",
    title: "3 BHK Premium",
    location: "Banjara Hills",
    tag: "Full Home · Premium",
  },
  {
    photoKey: "proj2",
    title: "Modern Kitchen",
    location: "Gachibowli",
    tag: "Modular Kitchen · Essential",
  },
  {
    photoKey: "proj3",
    title: "Luxury Villa",
    location: "Jubilee Hills",
    tag: "Villa · Luxury",
  },
  {
    photoKey: "proj4",
    title: "Contemporary 2BHK",
    location: "Kondapur",
    tag: "Full Home · Premium",
  },
  {
    photoKey: "proj5",
    title: "Master Bedroom Suite",
    location: "HITEC City",
    tag: "Bedroom · Premium",
  },
  {
    photoKey: "proj6",
    title: "Home Office & Study",
    location: "Madhapur",
    tag: "Home Office · Essential",
  },
  {
    photoKey: "proj7",
    title: "Home Decor & Display Units",
    location: "Madhapur",
    tag: "Home Office · Essential",
  },
  {
    photoKey: "proj8",
    title: "Study Table & Storage",
    location: "Madhapur",
    tag: "Home Office · Essential",
  },
];

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Priya & Rajesh Sharma",
    location: "Banjara Hills, Hyderabad",
    project: "3 BHK Full Home · Premium Plan",
    text: "We had worked with two other interior firms before MARKVIBE. The difference? These people actually delivered what they rendered. The 3D walkthrough meant zero surprises. They finished 3 days before the deadline.",
    stars: 5,
    photoKey: "testi1",
    approved: true,
    date: "2026-01-15",
  },
  {
    id: 2,
    name: "Arun Mehta",
    location: "Gachibowli, Hyderabad",
    project: "2 BHK · Modular Kitchen + Wardrobes",
    text: "I was genuinely sceptical about the 45-day guarantee — I've heard that before. But they pulled it off. The kitchen is extraordinary. The physical sample box was a brilliant touch.",
    stars: 5,
    photoKey: "testi2",
    approved: true,
    date: "2026-02-03",
  },
  {
    id: 3,
    name: "Kavitha Reddy",
    location: "Jubilee Hills, Hyderabad",
    project: "Villa · Luxury Plan",
    text: "For a luxury villa, I needed someone who would genuinely understand the vision. MARKVIBE's team spent three sessions understanding what I wanted. The Venetian plaster walls, the fluted wardrobe panels — every detail is precisely what I imagined.",
    stars: 5,
    photoKey: "testi3",
    approved: true,
    date: "2026-02-20",
  },
];

const TESTI_PHOTOS = {
  testi1:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80&fit=crop",
  testi2:
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&q=80&fit=crop",
  testi3:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80&fit=crop",
};

const SOLUTIONS = [
  { name: "Modular Kitchen", desc: "Factory engineered" },
  { name: "Wardrobes", desc: "Space-optimised" },
  { name: "TV Units", desc: "Statement walls" },
  { name: "Study Tables", desc: "Ergonomic design" },
  { name: "False Ceiling", desc: "Layered lighting" },
  { name: "Wallpaper", desc: "2,000+ designs" },
  { name: "Wall Paint", desc: "Expert application" },
  { name: "Crockery Units", desc: "Display & storage" },
  { name: "Foyer Design", desc: "First impressions" },
  { name: "Pooja Rooms", desc: "Sacred spaces" },
  { name: "Home Office", desc: "Focus-driven" },
  { name: "Kids Rooms", desc: "Fun & safe" },
  { name: "Balcony", desc: "Outdoor living" },
  { name: "Flooring", desc: "Premium surfaces" },
  { name: "Smart Lighting", desc: "App-controlled" },
];

/* ─────────────────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────────────────── */
export default function App() {
  // Photos — admin can override
  const [photos, setPhotos] = useState(() => ({
    ...DEFAULT_PHOTOS,
    ...JSON.parse(localStorage.getItem("mv_photos") || "{}"),
  }));
  // Reviews
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviews, setReviews] = useState(() =>
    JSON.parse(
      localStorage.getItem("mv_reviews") || JSON.stringify(INITIAL_REVIEWS),
    ),
  );
  // Enquiries
  const [enquiries, setEnquiries] = useState([]);

  // UI state
  const [activeStep, setActiveStep] = useState(0);
  const [activeSpec, setActiveSpec] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedBHK, setSelectedBHK] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    projectType: "",
    msg: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [navBg, setNavBg] = useState(false);

  // Review form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    location: "",
    project: "",
    text: "",
    stars: 5,
    image: null,
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const handleReviewImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ 5MB validation
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setReviewForm((prev) => ({
        ...prev,
        image: reader.result, // 👈 base64
      }));
    };

    reader.readAsDataURL(file);
  };

  // Admin
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminTab, setAdminTab] = useState("enquiries");
  const [adminCreds, setAdminCreds] = useState({ email: "", password: "" });
  const [adminError, setAdminError] = useState("");
  const [imgEditKey, setImgEditKey] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const fileRef = useRef();

  // Persist
  useEffect(() => {
    localStorage.setItem("mv_photos", JSON.stringify(photos));
  }, [photos]);
  useEffect(() => {
    localStorage.setItem("mv_reviews", JSON.stringify(reviews));
  }, [reviews]);
  useEffect(() => {
    if (isAdmin) {
      fetch(`${BASE_URL}/users`)
        .then((res) => res.json())
        .then((data) => {
          const mapped = data.map((item) => ({
            id: item._id || Math.random().toString(),
            name: item.name,
            email: item.email,
            mobile: item.number,
            projectType: item.flattype,
            budget: item.budget,
            msg: item.description || item.address,
            date: item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : new Date().toLocaleDateString(),
            read: false,
          }));
          setEnquiries(mapped);
        })
        .catch((err) => console.error("Error fetching enquiries:", err));
    }
  }, [isAdmin]);

  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setScrollPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
      setNavBg(window.scrollY > 50);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const P = (key) => photos[key] || DEFAULT_PHOTOS[key];

  // Contact form submit
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://markvibe-backend-iiyb.onrender.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            number: formData.mobile,
            address: formData.msg,
            flattype: formData.projectType,
            budget: 0,
            description: formData.msg,
          }),
        },
      );

      const data = await response.json();
      console.log("Success:", data);

      setSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const budgetMap = {
    "Under ₹5 Lakhs": 500000,
    "₹5 – ₹10 Lakhs": 1000000,
    "₹10 – ₹20 Lakhs": 2000000,
    "₹20 – ₹40 Lakhs": 4000000,
    "₹40 Lakhs+": 5000000,
    "Not decided yet": 0,
  };

  // Quote modal submit
  const handleQuoteSubmit = async () => {
    try {
      await fetch("https://markvibe-backend-iiyb.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: document.getElementById("qname").value,
          email: document.getElementById("qemail").value,
          number: document.getElementById("qmobile").value,
          address: document.getElementById("qarea").value,
          flattype: selectedBHK,
          budget: budgetMap[selectedBudget] || 0,
        }),
      });

      resetModal();
    } catch (err) {
      console.error(err);
    }
  };

  const resetModal = () => {
    setShowModal(false);
    setModalStep(1);
    setSelectedBHK(null);
    setSelectedBudget(null);
  };

  // Review submit
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.text) return;
    const newReview = {
      ...reviewForm,
      id: Date.now(),
      approved: false,
      date: new Date().toLocaleDateString(),
    };
    setReviews((prev) => [...prev, newReview]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setReviewForm({
        name: "",
        location: "",
        project: "",
        text: "",
        stars: 5,
      });
      setShowReviewForm(false);
    }, 3000);
  };

  // Admin
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (
      adminCreds.email === ADMIN_EMAIL &&
      adminCreds.password === ADMIN_PASSWORD
    ) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminError("");
    } else {
      setAdminError("Invalid credentials. Please try again.");
    }
  };

  const markEnquiryRead = (id) =>
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, read: true } : e)),
    );
  const deleteEnquiry = (id) =>
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  const approveReview = (id) =>
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: true } : r)),
    );
  const deleteReview = (id) =>
    setReviews((prev) => prev.filter((r) => r.id !== id));

  const savePhotoUrl = () => {
    if (imgEditKey && imgUrl.trim()) {
      setPhotos((prev) => ({ ...prev, [imgEditKey]: imgUrl.trim() }));
      setImgEditKey(null);
      setImgUrl("");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !imgEditKey) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotos((prev) => ({ ...prev, [imgEditKey]: ev.target.result }));
      setImgEditKey(null);
      setImgUrl("");
    };
    reader.readAsDataURL(file);
  };

  const approvedReviews = reviews.filter((r) => r.approved);
  const unreadCount = enquiries.filter((e) => !e.read).length;
  const pendingReviews = reviews.filter((r) => !r.approved).length;

  /* ──────────────────────────────────────────────
     ADMIN PANEL
  ────────────────────────────────────────────── */
  if (isAdmin)
    return (
      <div className="admin-panel">
        <GlobalStyle />
        {/* Topbar */}
        <div className="admin-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <polygon
                points="14,2 26,9 26,26 2,26 2,9"
                stroke={G}
                strokeWidth="1.8"
                fill="none"
              />
              <line
                x1="14"
                y1="26"
                x2="14"
                y2="16"
                stroke={G}
                strokeWidth="1.8"
              />
            </svg>
            <span
              style={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 700,
                letterSpacing: ".08em",
                color: "#E8E2DA",
              }}
            >
              MARKVIBE
            </span>
            <span
              style={{
                fontSize: ".6rem",
                letterSpacing: ".2em",
                color: G,
                textTransform: "uppercase",
              }}
            >
              Admin Panel
            </span>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <span style={{ fontSize: ".75rem", color: "#7A746E" }}>
              admin@markvibe.in
            </span>
            <button
              onClick={() => setIsAdmin(false)}
              className="btn-outline btn-sm"
              style={{
                borderColor: "#2E2A27",
                color: "#7A746E",
                padding: "7px 16px",
                fontSize: ".7rem",
              }}
            >
              Exit
            </button>
          </div>
        </div>

        <div className="admin-body">
          {/* Sidebar */}
          <div className="admin-sidebar">
            {[
              {
                id: "enquiries",
                label: "Enquiries",
                icon: "📋",
                badge: unreadCount,
              },
              {
                id: "reviews",
                label: "Reviews",
                icon: "⭐",
                badge: pendingReviews,
              },
              { id: "images", label: "Images", icon: "🖼️", badge: 0 },
            ].map((item) => (
              <div
                key={item.id}
                className={`admin-nav-item ${adminTab === item.id ? "active" : ""}`}
                onClick={() => setAdminTab(item.id)}
              >
                <span>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge > 0 && (
                  <span
                    style={{
                      background: G,
                      color: "#fff",
                      fontSize: ".6rem",
                      padding: "2px 7px",
                      borderRadius: "10px",
                      fontWeight: 700,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
            <div
              style={{
                margin: "20px 20px 0",
                borderTop: "1px solid #2E2A27",
                paddingTop: "20px",
              }}
            >
              <div
                style={{
                  fontSize: ".68rem",
                  color: "#4A4540",
                  letterSpacing: ".1em",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                }}
              >
                Stats
              </div>
              {[
                ["Total Enquiries", enquiries.length],
                ["Unread", unreadCount],
                ["Total Reviews", reviews.length],
                ["Pending Approval", pendingReviews],
              ].map(([l, v]) => (
                <div
                  key={l}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontSize: ".75rem", color: "#7A746E" }}>
                    {l}
                  </span>
                  <span
                    style={{ fontSize: ".75rem", color: G, fontWeight: 600 }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="admin-content">
            {/* ── ENQUIRIES TAB ── */}
            {adminTab === "enquiries" && (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: "1.5rem",
                        color: "#E8E2DA",
                      }}
                    >
                      Customer Enquiries
                    </div>
                    <div
                      style={{
                        fontSize: ".78rem",
                        color: "#7A746E",
                        marginTop: "4px",
                      }}
                    >
                      {enquiries.length} total · {unreadCount} unread
                    </div>
                  </div>
                </div>
                {enquiries.length === 0 ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "80px 20px",
                      color: "#4A4540",
                    }}
                  >
                    <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>
                      📭
                    </div>
                    <div style={{ fontSize: ".9rem" }}>
                      No enquiries yet. They'll appear here when visitors submit
                      the contact form or quote modal.
                    </div>
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Status</th>
                          <th>Name</th>
                          <th>Mobile</th>
                          <th>Email</th>
                          <th>Project Type</th>
                          <th>Budget</th>
                          <th>Message</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enquiries.map((e) => (
                          <tr key={e.id}>
                            <td>
                              <span
                                className={`status-badge ${e.read ? "status-read" : "status-new"}`}
                              >
                                {e.read ? "Read" : "New"}
                              </span>
                            </td>
                            <td style={{ fontWeight: 600, color: "#E8E2DA" }}>
                              {e.name}
                            </td>
                            <td>{e.mobile}</td>
                            <td style={{ fontSize: ".78rem" }}>
                              {e.email || "—"}
                            </td>
                            <td>{e.projectType || e.source || "—"}</td>
                            <td>{e.budget || "—"}</td>
                            <td
                              style={{
                                maxWidth: "200px",
                                fontSize: ".78rem",
                                color: "#A09A94",
                              }}
                            >
                              {e.msg || e.area || "—"}
                            </td>
                            <td
                              style={{
                                fontSize: ".75rem",
                                color: "#7A746E",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {e.date}
                            </td>
                            <td>
                              <div style={{ display: "flex", gap: "6px" }}>
                                {!e.read && (
                                  <button
                                    onClick={() => markEnquiryRead(e.id)}
                                    style={{
                                      background: G,
                                      color: "#fff",
                                      border: "none",
                                      padding: "5px 10px",
                                      fontSize: ".65rem",
                                      cursor: "pointer",
                                      letterSpacing: ".06em",
                                    }}
                                  >
                                    Mark Read
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteEnquiry(e.id)}
                                  style={{
                                    background: "rgba(231,76,60,.15)",
                                    color: "#E74C3C",
                                    border: "1px solid rgba(231,76,60,.3)",
                                    padding: "5px 10px",
                                    fontSize: ".65rem",
                                    cursor: "pointer",
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ── REVIEWS TAB ── */}
            {adminTab === "reviews" && (
              <div>
                <div style={{ marginBottom: "24px" }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.5rem",
                      color: "#E8E2DA",
                    }}
                  >
                    Reviews Management
                  </div>
                  <div
                    style={{
                      fontSize: ".78rem",
                      color: "#7A746E",
                      marginTop: "4px",
                    }}
                  >
                    {reviews.length} total · {pendingReviews} awaiting approval
                  </div>
                </div>
                {pendingReviews > 0 && (
                  <div
                    style={{
                      background: "rgba(184,137,42,.1)",
                      border: "1px solid rgba(184,137,42,.3)",
                      padding: "12px 16px",
                      marginBottom: "20px",
                      fontSize: ".82rem",
                      color: G,
                    }}
                  >
                    ⏳ {pendingReviews} review(s) pending your approval — they
                    won't show on the public site until approved.
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {reviews.map((r) => (
                    <div
                      key={r.id}
                      className="admin-card"
                      style={{
                        borderLeft: r.approved
                          ? `3px solid ${G}`
                          : "3px solid #4A4540",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: "16px",
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ flex: 1, minWidth: "0" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              marginBottom: "6px",
                              flexWrap: "wrap",
                            }}
                          >
                            <span
                              style={{
                                fontWeight: 600,
                                color: "#E8E2DA",
                                fontSize: ".9rem",
                              }}
                            >
                              {r.name}
                            </span>
                            <span
                              style={{ fontSize: ".72rem", color: "#7A746E" }}
                            >
                              {r.location}
                            </span>
                            <span
                              style={{
                                fontSize: ".65rem",
                                background: r.approved
                                  ? "rgba(39,174,96,.15)"
                                  : "rgba(255,255,255,.06)",
                                color: r.approved ? "#27AE60" : "#7A746E",
                                padding: "2px 8px",
                                borderRadius: "2px",
                                textTransform: "uppercase",
                                letterSpacing: ".1em",
                              }}
                            >
                              {r.approved ? "Approved" : "Pending"}
                            </span>
                          </div>
                          {r.project && (
                            <div
                              style={{
                                fontSize: ".72rem",
                                color: G,
                                marginBottom: "6px",
                              }}
                            >
                              {r.project}
                            </div>
                          )}
                          <div
                            style={{
                              display: "flex",
                              gap: "2px",
                              marginBottom: "8px",
                            }}
                          >
                            {Array(r.stars)
                              .fill(0)
                              .map((_, j) => (
                                <span
                                  key={j}
                                  style={{ color: G, fontSize: ".9rem" }}
                                >
                                  ★
                                </span>
                              ))}
                            {Array(5 - r.stars)
                              .fill(0)
                              .map((_, j) => (
                                <span
                                  key={j}
                                  style={{
                                    color: "#2E2A27",
                                    fontSize: ".9rem",
                                  }}
                                >
                                  ★
                                </span>
                              ))}
                          </div>
                          <p
                            style={{
                              fontSize: ".82rem",
                              color: "#A09A94",
                              lineHeight: 1.65,
                              fontStyle: "italic",
                            }}
                          >
                            "{r.text}"
                          </p>
                          <div
                            style={{
                              fontSize: ".7rem",
                              color: "#4A4540",
                              marginTop: "8px",
                            }}
                          >
                            {r.date}
                          </div>
                        </div>
                        <div
                          style={{ display: "flex", gap: "8px", flexShrink: 0 }}
                        >
                          {!r.approved && (
                            <button
                              onClick={() => approveReview(r.id)}
                              style={{
                                background: G,
                                color: "#fff",
                                border: "none",
                                padding: "7px 14px",
                                fontSize: ".7rem",
                                cursor: "pointer",
                              }}
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => deleteReview(r.id)}
                            style={{
                              background: "rgba(231,76,60,.15)",
                              color: "#E74C3C",
                              border: "1px solid rgba(231,76,60,.3)",
                              padding: "7px 14px",
                              fontSize: ".7rem",
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── IMAGES TAB ── */}
            {adminTab === "images" && (
              <div>
                <div style={{ marginBottom: "24px" }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.5rem",
                      color: "#E8E2DA",
                    }}
                  >
                    Image Management
                  </div>
                  <div
                    style={{
                      fontSize: ".78rem",
                      color: "#7A746E",
                      marginTop: "4px",
                    }}
                  >
                    Click any image slot to update it — paste a URL or upload a
                    file from your device.
                  </div>
                </div>

                {/* Edit modal */}
                {imgEditKey && (
                  <div
                    style={{
                      position: "fixed",
                      inset: 0,
                      background: "rgba(0,0,0,.85)",
                      zIndex: 200,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "20px",
                    }}
                  >
                    <div
                      style={{
                        background: "#1A1714",
                        border: "1px solid #2E2A27",
                        padding: "32px",
                        width: "90%",
                        maxWidth: "480px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          fontSize: "1.2rem",
                          color: "#E8E2DA",
                          marginBottom: "6px",
                        }}
                      >
                        Update Image
                      </div>
                      <div
                        style={{
                          fontSize: ".75rem",
                          color: G,
                          marginBottom: "20px",
                          letterSpacing: ".08em",
                        }}
                      >
                        {PHOTO_LABELS[imgEditKey]}
                      </div>
                      {photos[imgEditKey] && (
                        <img
                          src={photos[imgEditKey]}
                          alt=""
                          style={{
                            width: "100%",
                            height: "140px",
                            objectFit: "cover",
                            marginBottom: "16px",
                            border: "1px solid #2E2A27",
                          }}
                        />
                      )}
                      <div style={{ marginBottom: "12px" }}>
                        <div
                          style={{
                            fontSize: ".72rem",
                            color: "#7A746E",
                            marginBottom: "8px",
                            textTransform: "uppercase",
                            letterSpacing: ".1em",
                          }}
                        >
                          Paste Image URL
                        </div>
                        <input
                          className="admin-input"
                          placeholder="https://example.com/image.jpg"
                          value={imgUrl}
                          onChange={(e) => setImgUrl(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && savePhotoUrl()}
                        />
                      </div>
                      <div style={{ marginBottom: "20px" }}>
                        <div
                          style={{
                            fontSize: ".72rem",
                            color: "#7A746E",
                            marginBottom: "8px",
                            textTransform: "uppercase",
                            letterSpacing: ".1em",
                          }}
                        >
                          Or Upload from Device
                        </div>
                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleFileUpload}
                        />
                        <button
                          onClick={() => fileRef.current?.click()}
                          style={{
                            background: "#0F0E0C",
                            border: "1px solid #2E2A27",
                            color: "#A09A94",
                            padding: "10px 18px",
                            fontSize: ".75rem",
                            cursor: "pointer",
                            fontFamily: "'DM Sans',sans-serif",
                            transition: "border-color .2s",
                          }}
                          onMouseEnter={(e) => (e.target.style.borderColor = G)}
                          onMouseLeave={(e) =>
                            (e.target.style.borderColor = "#2E2A27")
                          }
                        >
                          📁 Choose File
                        </button>
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          onClick={savePhotoUrl}
                          style={{
                            background: G,
                            color: "#fff",
                            border: "none",
                            padding: "11px 24px",
                            fontSize: ".76rem",
                            cursor: "pointer",
                            letterSpacing: ".08em",
                            fontFamily: "'DM Sans',sans-serif",
                            flex: 1,
                          }}
                        >
                          Save Image
                        </button>
                        <button
                          onClick={() => {
                            setImgEditKey(null);
                            setImgUrl("");
                          }}
                          style={{
                            background: "#0F0E0C",
                            color: "#7A746E",
                            border: "1px solid #2E2A27",
                            padding: "11px 20px",
                            fontSize: ".76rem",
                            cursor: "pointer",
                            fontFamily: "'DM Sans',sans-serif",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Image grid */}
                {[
                  { group: "Core Pages", keys: ["hero", "about", "fullhome"] },
                  {
                    group: "Specialities",
                    keys: [
                      "kitchen",
                      "wardrobe",
                      "livingroom",
                      "ceiling",
                      "wallpaper",
                    ],
                  },
                  {
                    group: "Process Steps",
                    keys: [
                      "step1",
                      "step2",
                      "step3",
                      "step4",
                      "step5",
                      "step6",
                    ],
                  },
                  {
                    group: "Portfolio Projects",
                    keys: [
                      "proj1",
                      "proj2",
                      "proj3",
                      "proj4",
                      "proj5",
                      "proj6",
                    ],
                  },
                ].map(({ group, keys }) => (
                  <div key={group} style={{ marginBottom: "32px" }}>
                    <div
                      style={{
                        fontSize: ".68rem",
                        letterSpacing: ".2em",
                        textTransform: "uppercase",
                        color: G,
                        marginBottom: "14px",
                      }}
                    >
                      {group}
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill,minmax(160px,1fr))",
                        gap: "10px",
                      }}
                    >
                      {keys.map((key) => (
                        <div
                          key={key}
                          className="img-slot"
                          onClick={() => {
                            setImgEditKey(key);
                            setImgUrl("");
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={P(key)}
                            alt={PHOTO_LABELS[key]}
                            className="img-thumb"
                            style={{
                              width: "100%",
                              height: "90px",
                              objectFit: "cover",
                              display: "block",
                              marginBottom: "8px",
                            }}
                          />
                          <div
                            style={{
                              fontSize: ".7rem",
                              color: "#7A746E",
                              marginBottom: "4px",
                              lineHeight: 1.3,
                            }}
                          >
                            {PHOTO_LABELS[key]}
                          </div>
                          <div style={{ fontSize: ".62rem", color: G }}>
                            Click to update
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );

  /* ──────────────────────────────────────────────
     PUBLIC SITE
  ────────────────────────────────────────────── */
  return (
    <>
      <GlobalStyle />
      <div id="scroll-bar" style={{ width: `${scrollPct}%` }} />

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 500,
          padding: "0 48px",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: navBg
            ? "rgba(255,255,255,0.97)"
            : "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${navBg ? "var(--border)" : "transparent"}`,
          transition: "all .35s ease",
          boxShadow: navBg ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <img
            src="/images/I-logo.png"
            alt="Markvibe Logo"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "contain",
              filter: "contrast(1.2)",
            }}
          />{" "}
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.35rem",
                fontWeight: 700,
                letterSpacing: ".08em",
                color: "var(--ink)",
                lineHeight: 1,
              }}
            >
              MARKVIBE
            </div>
            <div
              style={{
                fontSize: ".5rem",
                letterSpacing: ".28em",
                color: G,
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              INTERIORS
            </div>
          </div>
        </div>
        <div
          className="hide-md"
          style={{ display: "flex", gap: "28px", alignItems: "center" }}
        >
          {[
            ["about", "About"],
            ["specialities", "Specialities"],
            ["compare", "Why Us"],
            ["process", "Process"],
            ["portfolio", "Portfolio"],
            ["pricing", "Pricing"],
            ["reviews", "Reviews"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <button key={id} className="nav-link" onClick={() => go(id)}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
          <button
            onClick={() => setShowAdminLogin(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: ".65rem",
              color: "var(--muted)",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              fontFamily: "'DM Sans',sans-serif",
              padding: "2px 2px",
            }}
          >
            Admin
          </button>
          <button
            className="btn-gold"
            style={{ fontSize: ".7rem", padding: "11px 22px" }}
            onClick={() => setShowModal(true)}
          >
            Get Free Quote
          </button>
        </div>
      </nav>
      

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src={P("hero")}
            alt="Luxury interior"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg,rgba(255,255,255,.96) 0%,rgba(255,255,255,.85) 38%,rgba(255,255,255,.25) 65%,rgba(255,255,255,0) 100%)",
            }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          style={{
            position: "absolute",
            bottom: "100px",
            right: "48px",
            zIndex: 3,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--border)",
            padding: "18px 24px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          <div
            className="serif"
            style={{ fontSize: "1.9rem", color: G, lineHeight: 1 }}
          >
            98%
          </div>
          <div
            style={{
              fontSize: ".64rem",
              letterSpacing: ".14em",
              color: "var(--muted)",
              textTransform: "uppercase",
              marginTop: "4px",
            }}
          >
            Client Satisfaction
          </div>
        </motion.div>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "560px",
            padding: "130px 48px 100px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            Hyderabad's Premier Interior Studio · Since 2023
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="serif"
            style={{
              fontSize: "clamp(2.2rem,4.5vw,3.8rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "var(--ink)",
              marginTop: "18px",
              marginBottom: "22px",
            }}
          >
            Interiors That
            <br />
            <span style={{ color: G, fontStyle: "italic" }}>
              Actually Deliver
            </span>
            <br />
            What You Were Promised
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              fontSize: ".96rem",
              color: "var(--muted)",
              lineHeight: 1.85,
              marginBottom: "32px",
            }}
          >
            Fixed pricing. 3D visualization before a single nail is hammered.
            45-day delivery guarantee with a penalty clause.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              Get Free Quote
            </button>
            <button className="btn-outline" onClick={() => go("compare")}>
              See How We Compare
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              display: "flex",
              gap: "28px",
              marginTop: "44px",
              paddingTop: "28px",
              borderTop: "1px solid var(--border)",
              flexWrap: "wrap",
            }}
          >
            {[
              ["1000+", "Projects"],
              ["600+", "Designers"],
              ["45 Days", "Guarantee"],
              ["10 Yr", "Warranty"],
            ].map(([n, l]) => (
              <div key={l}>
                <div
                  className="serif"
                  style={{
                    fontSize: "1.5rem",
                    color: "var(--ink)",
                    fontWeight: 700,
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontSize: ".64rem",
                    letterSpacing: ".14em",
                    color: "var(--muted)",
                    textTransform: "uppercase",
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => go("about")}
          style={{
            position: "absolute",
            bottom: "28px",
            left: "48px",
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "32px",
              background: "rgba(26,23,20,0.2)",
            }}
          />
          <span
            style={{
              fontSize: ".62rem",
              letterSpacing: ".18em",
              color: "var(--muted)",
              textTransform: "uppercase",
            }}
          >
            Scroll to explore
          </span>
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: "var(--ink)", padding: 0 }}>
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            minHeight: "360px",
          }}
          className="two-col"
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              maxHeight: "360px",
            }}
          >
            <img
              src={P("about")}
              alt="Interior designer"
              style={{ width: "100%", height: "360px", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg,transparent 60%,rgba(26,23,20,.6) 100%)",
              }}
            />
          </div>
          <div
            style={{
              padding: "60px 56px 60px 48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Reveal>
              <span
                style={{
                  fontSize: ".66rem",
                  letterSpacing: ".25em",
                  textTransform: "uppercase",
                  color: G,
                  display: "block",
                  marginBottom: "14px",
                }}
              >
                Our Philosophy
              </span>
              <h2
                className="serif"
                style={{
                  fontSize: "clamp(1.7rem,3vw,2.4rem)",
                  color: "#fff",
                  fontWeight: 400,
                  marginBottom: "20px",
                }}
              >
                Honesty in Design.
                <br />
                <em style={{ color: G }}>Precision in Execution.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p
                style={{
                  color: "#A09A94",
                  lineHeight: 1.9,
                  fontSize: ".93rem",
                  marginBottom: "16px",
                }}
              >
                MARKVIBE was founded with one simple frustration: interior
                design in India was full of broken promises — 3D renders that
                never matched reality, budgets that doubled, contractors who
                disappeared.
              </p>
              <p
                style={{
                  color: "#A09A94",
                  lineHeight: 1.9,
                  fontSize: ".93rem",
                }}
              >
                So we built the opposite.{" "}
                <strong style={{ color: "#fff" }}>
                  Fixed prices locked at booking.
                </strong>{" "}
                <strong style={{ color: "#fff" }}>
                  3D visualizations you can trust.
                </strong>{" "}
                <strong style={{ color: "#fff" }}>
                  A 45-day delivery guarantee with a penalty clause.
                </strong>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SPECIALITIES ── */}
      <section
        id="specialities"
        style={{ padding: "96px 48px", background: "var(--white)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "14px" }}>
            <span className="section-label">What We Excel At</span>
            <h2 className="section-title" style={{ marginTop: "12px" }}>
              Our Core Specialities
            </h2>
            <div className="gold-divider center" />
            <p
              style={{
                color: "var(--muted)",
                maxWidth: "580px",
                margin: "0 auto",
                lineHeight: 1.8,
                fontSize: ".93rem",
              }}
            >
              Each speciality is supported by dedicated designers, proprietary
              manufacturing, and factory precision.
            </p>
          </Reveal>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              margin: "36px 0 28px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {SPECIALITIES_DATA.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSpec(i)}
                className={`spec-tab ${activeSpec === i ? "active" : ""}`}
              >
                {s.title.split(" ").slice(0, 2).join(" ")}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSpec}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1fr",
                gap: 0,
                border: "1.5px solid var(--border)",
                marginBottom: "2px",
                minHeight: "420px",
              }}
              className="two-col"
            >
              {/* Photo left */}
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img
                  src={P(SPECIALITIES_DATA[activeSpec].key)}
                  alt={SPECIALITIES_DATA[activeSpec].title}
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "420px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg,rgba(0,0,0,0) 35%,rgba(26,23,20,.88) 100%)",
                  }}
                />
                {SPECIALITIES_DATA[activeSpec].badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: "18px",
                      left: "18px",
                      background: G,
                      color: "#fff",
                      fontSize: ".6rem",
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      padding: "6px 13px",
                      fontWeight: 600,
                    }}
                  >
                    ★ {SPECIALITIES_DATA[activeSpec].badge}
                  </div>
                )}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "28px 28px 24px",
                  }}
                >
                  <h3
                    className="serif"
                    style={{
                      fontSize: "1.7rem",
                      color: "#fff",
                      marginBottom: "6px",
                      fontWeight: 600,
                    }}
                  >
                    {SPECIALITIES_DATA[activeSpec].title}
                  </h3>
                  <p
                    style={{
                      fontSize: ".7rem",
                      color: G,
                      letterSpacing: ".11em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    {SPECIALITIES_DATA[activeSpec].tagline}
                  </p>
                </div>
              </div>
              {/* Features right */}
              <div
                style={{
                  padding: "40px 36px",
                  background: "var(--off-white)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "var(--muted)",
                      lineHeight: 1.85,
                      fontSize: ".9rem",
                      marginBottom: "24px",
                    }}
                  >
                    {SPECIALITIES_DATA[activeSpec].desc}
                  </p>
                  <p
                    style={{
                      fontSize: ".6rem",
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      marginBottom: "16px",
                    }}
                  >
                    What's Included
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      marginBottom: "24px",
                    }}
                  >
                    {SPECIALITIES_DATA[activeSpec].features.map((f, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                        }}
                      >
                        <CheckIcon size={16} color={G} />
                        <span
                          style={{
                            fontSize: ".86rem",
                            color: "var(--ink-2)",
                            lineHeight: 1.5,
                          }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      background: "var(--white)",
                      border: `1px solid ${G}`,
                      borderLeft: `4px solid ${G}`,
                      padding: "16px",
                      marginBottom: "20px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: ".6rem",
                        letterSpacing: ".16em",
                        textTransform: "uppercase",
                        color: G,
                        marginBottom: "6px",
                        fontWeight: 600,
                      }}
                    >
                      MARKVIBE ADVANTAGE
                    </p>
                    <p
                      style={{
                        fontSize: ".81rem",
                        color: "var(--muted)",
                        lineHeight: 1.7,
                      }}
                    >
                      {SPECIALITIES_DATA[activeSpec].advantage}
                    </p>
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => go("contact")}
                    style={{ fontSize: ".7rem", padding: "11px 22px" }}
                  >
                    Enquire About This →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Photo thumbnail grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6,1fr)",
              gap: "2px",
              marginTop: "2px",
            }}
          >
            {SPECIALITIES_DATA.map((s, i) => (
              <motion.div
                key={i}
                onClick={() => setActiveSpec(i)}
                whileHover={{ y: -2 }}
                style={{
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  height: "148px",
                }}
              >
                <img
                  src={P(s.key)}
                  alt={s.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform .5s",
                    transform: activeSpec === i ? "scale(1.06)" : "scale(1)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      activeSpec === i
                        ? "rgba(184,137,42,0.35)"
                        : "rgba(26,23,20,0.48)",
                    transition: "background .3s",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "8px 10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".68rem",
                      fontWeight: 600,
                      color: "#fff",
                      lineHeight: 1.3,
                    }}
                  >
                    {s.title.split(" ").slice(0, 2).join(" ")}
                  </div>
                  {activeSpec === i && (
                    <div
                      style={{
                        width: "18px",
                        height: "2px",
                        background: G,
                        marginTop: "4px",
                      }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section
        id="compare"
        style={{ padding: "96px 48px", background: "var(--off-white)" }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "52px" }}>
            <span className="section-label">The Honest Comparison</span>
            <h2 className="section-title" style={{ marginTop: "12px" }}>
              MARKVIBE vs. Typical Interior Firms
            </h2>
            <div className="gold-divider center" />
            <p
              style={{
                color: "var(--muted)",
                maxWidth: "500px",
                margin: "0 auto",
                lineHeight: 1.8,
                fontSize: ".93rem",
              }}
            >
              Feature by feature, promise by promise — no marketing language,
              just facts.
            </p>
          </Reveal>
          <Reveal>
            <div
              style={{
                overflowX: "auto",
                boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
                border: "1px solid var(--border)",
              }}
            >
              <table className="comp-table">
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        background: "var(--white)",
                        width: "46%",
                        padding: "18px 22px",
                        color: "var(--muted)",
                        fontSize: ".7rem",
                        letterSpacing: ".18em",
                      }}
                    >
                      Feature / Promise
                    </th>
                    <th className="us" style={{ width: "27%" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Playfair Display',serif",
                            fontSize: ".9rem",
                            fontWeight: 700,
                            textTransform: "none",
                            color: G,
                          }}
                        >
                          MARKVIBE
                        </span>
                        <span
                          style={{
                            fontSize: ".56rem",
                            color: "rgba(255,255,255,0.4)",
                            textTransform: "uppercase",
                            letterSpacing: ".14em",
                          }}
                        >
                          Interiors
                        </span>
                      </div>
                    </th>
                    <th className="them" style={{ width: "27%" }}>
                      Other Firms
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <td className="feature" style={{ padding: "13px 22px" }}>
                        <div>{row.feature}</div>
                        <div
                          style={{
                            fontSize: ".71rem",
                            color: "var(--muted)",
                            marginTop: "2px",
                            fontWeight: 400,
                          }}
                        >
                          {row.detail}
                        </div>
                      </td>
                      <td className="us-col">
                        {row.us === "full" && <CheckIcon />}
                        {row.us === "partial" && <PartialIcon />}
                        {row.us === "cross" && <CrossIcon />}
                      </td>
                      <td className="them-col">
                        {row.them === "full" && <CheckIcon />}
                        {row.them === "partial" && <PartialIcon />}
                        {row.them === "cross" && <CrossIcon />}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              style={{
                display: "flex",
                gap: "24px",
                marginTop: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {[
                ["#27AE60", "Fully Provided"],
                [G, "Partially / Extra Cost"],
                ["#E74C3C", "Not Provided"],
              ].map(([c, l]) => (
                <div
                  key={l}
                  style={{ display: "flex", alignItems: "center", gap: "7px" }}
                >
                  <div
                    style={{
                      width: "11px",
                      height: "11px",
                      borderRadius: "50%",
                      background: c,
                    }}
                  />
                  <span style={{ fontSize: ".74rem", color: "var(--muted)" }}>
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal style={{ textAlign: "center", marginTop: "44px" }}>
            <div
              style={{
                background: "var(--white)",
                border: "1.5px solid var(--border)",
                padding: "36px 44px",
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              <h3
                className="serif"
                style={{ fontSize: "1.5rem", marginBottom: "10px" }}
              >
                See the difference for yourself
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: ".86rem",
                  lineHeight: 1.7,
                  marginBottom: "20px",
                }}
              >
                Book a free home visit. Our designer comes to you — no
                obligation, no pressure.
              </p>
              <button className="btn-gold" onClick={() => setShowModal(true)}>
                Book Free Home Visit →
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section
        id="process"
        style={{ padding: "96px 48px", background: "var(--white)" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "52px" }}>
            <span className="section-label">Our 6-Step Process</span>
            <h2 className="section-title" style={{ marginTop: "12px" }}>
              From Vision to Handover in 45 Days
            </h2>
            <div className="gold-divider center" />
          </Reveal>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "40px",
              gap: 0,
              flexWrap: "wrap",
            }}
          >
            {STEPS_DATA.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <motion.button
                  className={`step-num-btn ${activeStep === i ? "active" : ""}`}
                  onClick={() => setActiveStep(i)}
                  whileTap={{ scale: 0.95 }}
                >
                  {s.num}
                </motion.button>
                {i < STEPS_DATA.length - 1 && (
                  <div
                    style={{
                      width: "36px",
                      height: "1.5px",
                      background: i < activeStep ? G : "var(--border)",
                      transition: "background .4s",
                    }}
                    className="hide-md"
                  />
                )}
              </div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.36 }}
              style={{
                maxWidth: "920px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "380px 1fr",
                gap: 0,
                border: "1.5px solid var(--border)",
                overflow: "hidden",
              }}
              className="two-col"
            >
              <div style={{ position: "relative", height: "340px" }}>
                <img
                  src={P(STEPS_DATA[activeStep].photoKey)}
                  alt={STEPS_DATA[activeStep].title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg,rgba(26,23,20,0.5) 0%,transparent 55%)",
                  }}
                />
                <div
                  className="serif"
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "18px",
                    fontSize: "4.5rem",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.15)",
                    lineHeight: 1,
                  }}
                >
                  {STEPS_DATA[activeStep].num}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "18px",
                    left: "18px",
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    padding: "7px 14px",
                  }}
                >
                  <span
                    style={{
                      fontSize: ".62rem",
                      letterSpacing: ".13em",
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    {STEPS_DATA[activeStep].time}
                  </span>
                </div>
              </div>
              <div
                style={{
                  padding: "40px 36px",
                  background: "var(--off-white)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span className="section-label">
                  Step {parseInt(STEPS_DATA[activeStep].num)} of 6
                </span>
                <h3
                  className="serif"
                  style={{
                    fontSize: "1.7rem",
                    color: "var(--ink)",
                    margin: "10px 0 14px",
                  }}
                >
                  {STEPS_DATA[activeStep].title}
                </h3>
                <p
                  style={{
                    color: "var(--muted)",
                    lineHeight: 1.9,
                    fontSize: ".91rem",
                    marginBottom: "28px",
                  }}
                >
                  {STEPS_DATA[activeStep].desc}
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="btn-outline btn-sm"
                    style={{ opacity: activeStep === 0 ? 0.35 : 1 }}
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
                  >
                    ← Prev
                  </button>
                  {activeStep < STEPS_DATA.length - 1 ? (
                    <button
                      className="btn-primary btn-sm"
                      onClick={() => setActiveStep((p) => p + 1)}
                    >
                      Next Step →
                    </button>
                  ) : (
                    <button
                      className="btn-gold btn-sm"
                      onClick={() => go("contact")}
                    >
                      Start My Project →
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Thumbnail strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6,1fr)",
              gap: "4px",
              maxWidth: "920px",
              margin: "6px auto 0",
            }}
          >
            {STEPS_DATA.map((s, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i)}
                style={{
                  position: "relative",
                  height: "64px",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
              >
                <img
                  src={P(s.photoKey)}
                  alt={s.num}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: activeStep === i ? "none" : "grayscale(55%)",
                    transition: "filter .3s",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      activeStep === i
                        ? "rgba(184,137,42,0.3)"
                        : "rgba(26,23,20,0.38)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "4px",
                    left: "6px",
                    fontSize: ".58rem",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  {s.num}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section
        id="portfolio"
        style={{ padding: "96px 48px", background: "var(--off-white)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="section-label">Our Work</span>
            <h2 className="section-title" style={{ marginTop: "12px" }}>
              Recent Projects
            </h2>
            <div className="gold-divider center" />
            <p
              style={{
                color: "var(--muted)",
                maxWidth: "480px",
                margin: "0 auto",
                lineHeight: 1.8,
                fontSize: ".93rem",
              }}
            >
              Real homes, real clients — delivered on time and within the quoted
              price.
            </p>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gridTemplateRows: "268px 268px",
              gap: "8px",
            }}
            className="three-col"
          >
            <Reveal style={{ gridRow: "1 / 3" }}>
              <div className="portfolio-card" style={{ height: "100%" }}>
                <img
                  src={P(PORTFOLIO_DATA[0].photoKey)}
                  alt={PORTFOLIO_DATA[0].title}
                />
                <div className="p-overlay" />
                <div className="p-label">
                  <div
                    style={{
                      fontSize: ".58rem",
                      letterSpacing: ".14em",
                      color: G,
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {PORTFOLIO_DATA[0].tag}
                  </div>
                  <div
                    className="serif"
                    style={{
                      fontSize: "1.15rem",
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  >
                    {PORTFOLIO_DATA[0].title}
                  </div>
                  <div
                    style={{
                      fontSize: ".72rem",
                      color: "rgba(255,255,255,.7)",
                      marginTop: "3px",
                    }}
                  >
                    {PORTFOLIO_DATA[0].location}
                  </div>
                </div>
              </div>
            </Reveal>
            {PORTFOLIO_DATA.slice(1).map((p, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="portfolio-card" style={{ height: "268px" }}>
                  <img src={P(p.photoKey)} alt={p.title} />
                  <div className="p-overlay" />
                  <div className="p-label">
                    <div
                      style={{
                        fontSize: ".56rem",
                        letterSpacing: ".13em",
                        color: G,
                        textTransform: "uppercase",
                        marginBottom: "3px",
                      }}
                    >
                      {p.tag}
                    </div>
                    <div
                      className="serif"
                      style={{
                        fontSize: ".95rem",
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    >
                      {p.title}
                    </div>
                    <div
                      style={{
                        fontSize: ".7rem",
                        color: "rgba(255,255,255,.7)",
                        marginTop: "3px",
                      }}
                    >
                      {p.location}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ textAlign: "center", marginTop: "36px" }}>
            <button className="btn-outline" onClick={() => go("contact")}>
              Discuss Your Project →
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section style={{ padding: "64px 48px", background: "var(--white)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "36px" }}>
            <span className="section-label">Every Room, Every Need</span>
            <h2 className="section-title" style={{ marginTop: "12px" }}>
              Complete Interior Solutions
            </h2>
            <div className="gold-divider center" />
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5,1fr)",
              gap: "1px",
              background: "var(--border)",
            }}
            className="five-col"
          >
            {SOLUTIONS.map((s, i) => (
              <Reveal key={i} delay={i * 0.02}>
                <div className="sol-card">
                  <div
                    style={{
                      fontSize: ".86rem",
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: "4px",
                    }}
                  >
                    {s.name}
                  </div>
                  <div
                    style={{
                      fontSize: ".68rem",
                      color: G,
                      letterSpacing: ".06em",
                    }}
                  >
                    {s.desc}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY STATS ── */}
      <section style={{ padding: "56px 48px", background: "var(--off-white)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6,1fr)",
              gap: "1px",
              background: "var(--border)",
            }}
            className="six-col"
          >
            {[
              ["10 Yr", "Warranty", "On all products"],
              ["0%", "EMI Available", "Up to 24 months"],
              ["600+", "Expert Designers", "Pan-India team"],
              ["₹0", "Hidden Costs", "Fixed price always"],
              ["45", "Day Delivery", "Penalty if delayed"],
              ["1000+", "Projects Done", "Since 2012"],
            ].map(([v, l, s], i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="why-card">
                  <div
                    className="serif"
                    style={{ fontSize: "1.9rem", color: G, fontWeight: 700 }}
                  >
                    {v}
                  </div>
                  <div
                    style={{
                      fontSize: ".78rem",
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginTop: "6px",
                    }}
                  >
                    {l}
                  </div>
                  <div
                    style={{
                      fontSize: ".66rem",
                      color: "var(--muted)",
                      marginTop: "3px",
                    }}
                  >
                    {s}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section
        id="pricing"
        style={{ padding: "96px 48px", background: "var(--white)" }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "52px" }}>
            <span className="section-label">Transparent Investment</span>
            <h2 className="section-title" style={{ marginTop: "12px" }}>
              Pricing Plans
            </h2>
            <div className="gold-divider center" />
            <p
              style={{
                color: "var(--muted)",
                maxWidth: "480px",
                margin: "0 auto",
                lineHeight: 1.8,
                fontSize: ".93rem",
              }}
            >
              All prices fixed at booking. What you're quoted is what you pay —
              guaranteed in writing.
            </p>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 0,
              background: "var(--border)",
            }}
            className="three-col"
          >
            {[
              {
                plan: "Essential",
                price: "₹750",
                tag: "/sq.ft",
                feat: false,
                desc: "Functional interiors within budget. Ideal for 1-2 BHK.",
                photoKey: "proj4",
                features: [
                  "Standard laminates & finishes",
                  "Basic modular kitchen",
                  "Hinged wardrobe with fittings",
                  "Simple false ceiling with LEDs",
                  "Wall paint & basic wallpaper",
                  "2-year product warranty",
                ],
                cta: "Start with Essential",
              },
              {
                plan: "Premium",
                price: "₹1200",
                tag: "/sq.ft",
                feat: true,
                desc: "Our most popular plan — luxury materials and real value. Suits 2-3 BHK.",
                photoKey: "proj1",
                features: [
                  "Premium laminates, acrylic & lacquer",
                  "Full modular kitchen + tall units",
                  "Sliding wardrobes with LED lighting",
                  "Gypsum ceiling with cove lighting",
                  "Smart lighting integration",
                  "5-year comprehensive warranty",
                ],
                cta: "Choose Premium",
              },
              {
                plan: "Luxury",
                price: "₹2000+",
                tag: "/sq.ft",
                feat: false,
                desc: "The finest materials, bespoke design and Italian hardware.",
                photoKey: "proj3",
                features: [
                  "Imported laminates & Italian hardware",
                  "Custom kitchen + island + stone top",
                  "Walk-in wardrobe + full vanity",
                  "Coffered ceiling + Lutron lighting",
                  "Full smart home (KNX / Lutron)",
                  "10-year comprehensive warranty",
                ],
                cta: "Design My Luxury Home",
              },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.09}>
                <div
                  className={`pricing-card ${p.feat ? "featured" : ""}`}
                  style={{ height: "100%" }}
                >
                  <div
                    style={{
                      height: "170px",
                      margin: "-1px -1px 24px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={P(p.photoKey)}
                      alt={p.plan}
                      style={{
                        width: "100%",
                        height: "170px",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: p.feat
                          ? "rgba(26,23,20,0.4)"
                          : "rgba(26,23,20,0.28)",
                      }}
                    />
                    {p.feat && (
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          background: G,
                          color: "#fff",
                          fontSize: ".58rem",
                          letterSpacing: ".14em",
                          textTransform: "uppercase",
                          padding: "5px 11px",
                        }}
                      >
                        Most Popular
                      </div>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "13px",
                        left: "16px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: ".6rem",
                          letterSpacing: ".18em",
                          textTransform: "uppercase",
                          color: p.feat ? G : "rgba(255,255,255,.75)",
                          fontFamily: "'DM Sans',sans-serif",
                        }}
                      >
                        {p.plan}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "0 32px 36px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "4px",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        className="serif"
                        style={{
                          fontSize: "2.8rem",
                          fontWeight: 700,
                          color: p.feat ? G : "var(--ink)",
                        }}
                      >
                        {p.price}
                      </span>
                      <span
                        style={{
                          fontSize: ".8rem",
                          color: p.feat
                            ? "rgba(255,255,255,0.5)"
                            : "var(--muted)",
                        }}
                      >
                        {p.tag}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: ".81rem",
                        color: p.feat
                          ? "rgba(255,255,255,0.6)"
                          : "var(--muted)",
                        lineHeight: 1.65,
                        marginBottom: "20px",
                      }}
                    >
                      {p.desc}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        marginBottom: "28px",
                      }}
                    >
                      {p.features.map((f, j) => (
                        <div
                          key={j}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <CheckIcon size={14} color={G} />
                          <span
                            style={{
                              fontSize: ".8rem",
                              color: p.feat
                                ? "rgba(255,255,255,0.8)"
                                : "var(--ink-2)",
                            }}
                          >
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      className={p.feat ? "btn-gold" : "btn-primary"}
                      style={{ width: "100%", textAlign: "center" }}
                      onClick={() => setShowModal(true)}
                    >
                      {p.cta}
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ textAlign: "center", marginTop: "20px" }}>
            <p style={{ fontSize: ".78rem", color: "var(--muted)" }}>
              All plans: Free 3D design · Dedicated PM · Fixed pricing · Factory
              manufacturing · Professional installation · Vastu consultation
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section
  id="reviews"
  style={{ padding: "96px 48px", background: "var(--off-white)" }}
>
  <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
    <Reveal style={{ textAlign: "center", marginBottom: "48px" }}>
      <span className="section-label">Client Stories</span>
      <h2 className="section-title" style={{ marginTop: "12px" }}>
        Homes We've Transformed
      </h2>
      <div className="gold-divider center" />
      <p
        style={{
          color: "var(--muted)",
          maxWidth: "480px",
          margin: "0 auto",
          lineHeight: 1.8,
          fontSize: ".93rem",
        }}
      >
        Real experiences from real clients. Every review is verified by
        our team.
      </p>
    </Reveal>

    {/* Reviews grid */}
    {approvedReviews.length > 0 ? (
      <>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
            marginBottom: "48px",
          }}
          className="three-col"
        >
          {(showAllReviews
            ? approvedReviews
            : approvedReviews.slice(0, 3)
          ).map((r, i) => (
            <Reveal key={r.id} delay={i * 0.08}>
              <div className="testi-card">
                {/* Project photo */}
                <div
                  style={{
                    height: "170px",
                    margin: "-32px -28px 22px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={
                      r.image ||
                      TESTI_PHOTOS[r.photoKey] ||
                      TESTI_PHOTOS.testi1
                    }
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg,transparent 40%,rgba(26,23,20,.65) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "11px",
                      left: "14px",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        padding: "3px 9px",
                        background: "rgba(184,137,42,0.9)",
                        fontSize: ".6rem",
                        color: "#fff",
                        letterSpacing: ".09em",
                        textTransform: "uppercase",
                      }}
                    >
                      {r.project || "Client Review"}
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div
                  style={{
                    display: "flex",
                    gap: "2px",
                    marginBottom: "14px",
                  }}
                >
                  {Array(r.stars)
                    .fill(0)
                    .map((_, j) => (
                      <svg
                        key={j}
                        width="13"
                        height="13"
                        viewBox="0 0 14 14"
                        fill={G}
                      >
                        <polygon points="7,1 8.8,5.5 13.5,5.5 9.8,8.5 11.2,13 7,10.2 2.8,13 4.2,8.5 0.5,5.5 5.2,5.5" />
                      </svg>
                    ))}
                </div>

                {/* Review Text */}
                <p
                  style={{
                    fontSize: ".88rem",
                    color: "var(--muted)",
                    lineHeight: 1.82,
                    marginBottom: "22px",
                    fontStyle: "italic",
                    flex: 1,
                  }}
                >
                  "{r.text}"
                </p>

                {/* User Info */}
                <div
                  style={{
                    borderTop: "1px solid var(--border)",
                    paddingTop: "16px",
                    marginTop: "auto",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: ".86rem",
                      color: "var(--ink)",
                    }}
                  >
                    {r.name}
                  </div>
                  <div
                    style={{
                      fontSize: ".7rem",
                      color: G,
                      letterSpacing: ".07em",
                      marginTop: "3px",
                    }}
                  >
                    {r.location}
                  </div>
                  <div
                    style={{
                      fontSize: ".66rem",
                      color: "var(--muted)",
                      marginTop: "3px",
                    }}
                  >
                    {r.date}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 🔥 Read More Button */}
        {approvedReviews.length > 3 && (
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <button
              onClick={() => {
                setShowAllReviews(!showAllReviews);

                if (showAllReviews) {
                  document
                    .getElementById("reviews")
                    .scrollIntoView({ behavior: "smooth" });
                }
              }}
              style={{
                padding: "10px 24px",
                border: "1px solid #C9A34E",
                background: "transparent",
                color: "#C9A34E",
                cursor: "pointer",
                fontSize: ".8rem",
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              {showAllReviews ? "Show Less ↑" : "Read More ↓"}
            </button>
          </div>
        )}
      </>
    ) : (
      <div
        style={{
          textAlign: "center",
          padding: "48px 20px",
          marginBottom: "32px",
          background: "var(--white)",
          border: "1px solid var(--border)",
        }}
      >
        <div style={{ fontSize: "2rem", marginBottom: "10px" }}>💬</div>
        <p style={{ color: "var(--muted)", fontSize: ".9rem" }}>
          Be the first to share your experience with MARKVIBE!
        </p>
      </div>
    )}

    {/* Add Review CTA */}
    <Reveal style={{ textAlign: "center" }}>
      <div
        style={{
          background: "var(--white)",
          border: "1.5px solid var(--border)",
          padding: "36px 44px",
          maxWidth: "540px",
          margin: "0 auto",
        }}
      >
        <h3
          className="serif"
          style={{ fontSize: "1.5rem", marginBottom: "10px" }}
        >
          Share Your Experience
        </h3>
        <p
          style={{
            color: "var(--muted)",
            fontSize: ".86rem",
            lineHeight: 1.7,
            marginBottom: "20px",
          }}
        >
          Had your home designed by MARKVIBE? We'd love to hear from you —
          your review helps other homeowners make the right choice.
        </p>
        <button
          className="btn-gold"
          onClick={() => setShowReviewForm(true)}
        >
          Write a Review →
        </button>
      </div>
    </Reveal>
  </div>
</section>
      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: 0, background: "var(--white)" }}>
        <div
          style={{ height: "260px", position: "relative", overflow: "hidden" }}
        >
          <img
            src={P("fullhome")}
            alt="Beautiful home"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 40%",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(26,23,20,.65)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              padding: "24px",
            }}
          >
            <span className="section-label" style={{ color: G }}>
              Start Your Project
            </span>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(1.7rem,4vw,2.8rem)",
                color: "#fff",
                marginTop: "12px",
                fontWeight: 400,
              }}
            >
              Let's Build <em style={{ color: G }}>Your Dream Home</em>
            </h2>
          </div>
        </div>
        <div
          style={{
            maxWidth: "1060px",
            margin: "0 auto",
            padding: "72px 48px",
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: "72px",
            alignItems: "start",
          }}
          className="two-col"
        >
          <Reveal>
            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.9,
                fontSize: ".92rem",
                marginBottom: "36px",
              }}
            >
              Book your free 60-minute design consultation. Our senior designer
              will visit your home, study your space, and show you what's
              possible — completely free, zero obligation.
            </p>
            {[
              {
                label: "Studio",
                val: "Suchitra Branch 2nd floor , plot no: 107,6-8/2 Beside priyadarshini Hotel Above HDFC Bank , Suchitra X road , Hyderabad, Telangana",
                link: "https://maps.app.goo.gl/dTShmJAosqDqPjsa9"
              },
              { label: "Phone", val: "+91 9390127834" },
              { label: "Email", val: "markvibeinteriors@gmail.com" },
              { label: "Hours", val: "Mon–Sat · 9:00 AM – 7:00 PM" }
            ].map((c, i) => (
              <div
                key={c.label}
                onClick={() => c.link && window.open(c.link, "_blank")}
                style={{
                  display: "flex",
                  gap: "14px",
                  marginBottom: "18px",
                  alignItems: "flex-start",
                  cursor: c.link ? "pointer" : "default",
                  transition: "all 0.25s ease",
                  padding: "10px 8px",
                  borderRadius: "6px"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(184,137,42,0.06)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateX(0px)";
                }}
              >

                {/* 🔥 Premium side box */}
<div style={{
  minWidth: "36px",
  height: "36px",
  borderRadius: "8px",
  background: "linear-gradient(135deg, rgba(184,137,42,0.15), rgba(184,137,42,0.05))",
  border: "1px solid rgba(184,137,42,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "4px",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 10px rgba(184,137,42,0.08)"
}}>
  
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
  {c.label === "Studio" && (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z" stroke={G} strokeWidth="1.6"/>
      <circle cx="12" cy="11" r="2.5" stroke={G} strokeWidth="1.6"/>
    </svg>
  )}

  {c.label === "Phone" && (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M6.6 10.8a15.05 15.05 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.36 11.36 0 003.6.6 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 6a1 1 0 011-1h2.4a1 1 0 011 1 11.36 11.36 0 00.6 3.6 1 1 0 01-.24 1l-2.16 2.2z" stroke={G} strokeWidth="1.6"/>
    </svg>
  )}

  {c.label === "Email" && (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke={G} strokeWidth="1.6"/>
      <path d="M3 7l9 6 9-6" stroke={G} strokeWidth="1.6"/>
    </svg>
  )}

  {c.label === "Hours" && (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={G} strokeWidth="1.6"/>
      <path d="M12 7v5l3 2" stroke={G} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )}
</div>
</div>

                <div>
                  <div style={{
                    fontSize: ".6rem",
                    letterSpacing: ".18em",
                    color: G,
                    textTransform: "uppercase",
                    marginBottom: "4px"
                  }}>
                    {c.label}
                  </div>

                  <div style={{
                    fontSize: ".88rem",
                    color: "var(--ink-2)",
                    lineHeight: 1.6
                  }}>
                    {c.val}
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.2}>
            <div
              style={{
                background: "var(--white)",
                padding: "40px 36px",
                border: "1.5px solid var(--border)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
              }}
            >
              <h3
                className="serif"
                style={{
                  fontSize: "1.45rem",
                  marginBottom: "24px",
                  color: "var(--ink)",
                }}
              >
                Book a Free Consultation
              </h3>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: "center", padding: "44px 20px" }}
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 52 52"
                      fill="none"
                      style={{ margin: "0 auto 18px", display: "block" }}
                    >
                      <circle
                        cx="26"
                        cy="26"
                        r="24"
                        stroke={G}
                        strokeWidth="1.5"
                      />
                      <path
                        d="M16 26l8 8 12-14"
                        stroke={G}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h4
                      className="serif"
                      style={{ fontSize: "1.5rem", marginBottom: "8px" }}
                    >
                      Request Received!
                    </h4>
                    <p style={{ color: "var(--muted)", fontSize: ".86rem" }}>
                      Our team will call you within 2 working hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleContactSubmit}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <input
                      className="form-input"
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                    />
                    <input
                      className="form-input"
                      placeholder="Mobile Number *"
                      value={formData.mobile}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, mobile: e.target.value }))
                      }
                      required
                    />
                    <input
                      className="form-input"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                    />
                    <select
                      className="form-input"
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          projectType: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select Project Type</option>
                      {[
                        "1 BHK Full Home",
                        "2 BHK Full Home",
                        "3 BHK Full Home",
                        "Villa / Independent House",
                        "Modular Kitchen Only",
                        "Wardrobe Only",
                        "Office / Commercial",
                      ].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                    <textarea
                      className="form-input"
                      placeholder="Tell us about your space, timeline, and requirements…"
                      value={formData.msg}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, msg: e.target.value }))
                      }
                    />
                    <button
                      type="submit"
                      className="btn-gold"
                      style={{
                        width: "100%",
                        padding: "16px",
                        marginTop: "4px",
                      }}
                    >
                      Book Free Consultation →
                    </button>
                    <p
                      style={{
                        fontSize: ".7rem",
                        color: "var(--muted)",
                        textAlign: "center",
                        marginTop: "2px",
                      }}
                    >
                      No commitment required · Response within 2 hours
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "var(--ink)", padding: "64px 48px 28px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2.5fr 1fr 1fr 1fr",
              gap: "52px",
              marginBottom: "48px",
            }}
            className="two-col"
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "18px",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                  <polygon
                    points="14,2 26,9 26,26 2,26 2,9"
                    stroke={G}
                    strokeWidth="1.8"
                    fill="none"
                  />
                  <line
                    x1="14"
                    y1="26"
                    x2="14"
                    y2="16"
                    stroke={G}
                    strokeWidth="1.8"
                  />
                </svg>
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      color: "#fff",
                      fontWeight: 700,
                      letterSpacing: ".08em",
                    }}
                  >
                    MARKVIBE
                  </div>
                  <div
                    style={{
                      fontSize: ".48rem",
                      letterSpacing: ".28em",
                      color: G,
                      textTransform: "uppercase",
                    }}
                  >
                    INTERIORS
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontSize: ".82rem",
                  color: "#6E685E",
                  lineHeight: 1.85,
                  maxWidth: "280px",
                  marginBottom: "20px",
                }}
              >
                Hyderabad's most trusted interior design studio since 2012.
                Fixed pricing. Factory quality. Delivered on time — or we pay
                you.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["Instagram", "Houzz", "Pinterest", "YouTube"].map((s) => (
                  <button
                    key={s}
                    style={{
                      fontSize: ".62rem",
                      color: "#6E685E",
                      background: "#1E1B18",
                      border: "none",
                      padding: "6px 10px",
                      cursor: "pointer",
                      letterSpacing: ".09em",
                      fontFamily: "'DM Sans',sans-serif",
                      transition: "color .2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = G)}
                    onMouseLeave={(e) => (e.target.style.color = "#6E685E")}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {[
              {
                title: "Services",
                links: [
                  "Modular Kitchen",
                  "Wardrobes & Storage",
                  "Living Room Design",
                  "Bedroom Interiors",
                  "False Ceiling & Lighting",
                  "Wallpaper & Paint",
                ],
              },
              {
                title: "Company",
                links: [
                  "About Us",
                  "Our Process",
                  "Portfolio",
                  "Careers",
                  "Blog",
                  "Press",
                ],
              },
              {
                title: "Support",
                links: [
                  "Get a Quote",
                  "Book Consultation",
                  "Service Request",
                  "EMI Calculator",
                  "FAQ",
                  "Privacy Policy",
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <div
                  style={{
                    fontSize: ".58rem",
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: G,
                    marginBottom: "18px",
                  }}
                >
                  {col.title}
                </div>
                {col.links.map((l) => (
                  <button key={l} className="footer-link">
                    {l}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: "1px solid #2A2520",
              paddingTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div style={{ fontSize: ".72rem", color: "#4A4540" }}>
              © 2026 MARKVIBE INTERIORS. All rights reserved.
            </div>
            <div style={{ display: "flex", gap: "18px" }}>
              {["Terms", "Privacy", "Warranty Policy"].map((l) => (
                <button
                  key={l}
                  className="footer-link"
                  style={{ fontSize: ".68rem" }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════
          MODALS
      ══════════════════════════════════════ */}

      {/* ── QUOTE MODAL ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && resetModal()}
          >
            <motion.div
              className="modal-box"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              <button
                onClick={resetModal}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "20px",
                  background: "none",
                  border: "none",
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  color: "var(--muted)",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
              {/* Progress */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0,
                  marginBottom: "36px",
                }}
              >
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    style={{ display: "flex", alignItems: "center", flex: 1 }}
                  >
                    <div
                      style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "50%",
                        flexShrink: 0,
                        background:
                          n <= modalStep ? "var(--ink)" : "var(--off-white)",
                        color: n <= modalStep ? "#fff" : "var(--muted)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: ".7rem",
                        fontWeight: 600,
                        border: `1.5px solid ${n <= modalStep ? "var(--ink)" : "var(--border)"}`,
                        transition: "all .3s",
                      }}
                    >
                      {n < modalStep ? "✓" : n}
                    </div>
                    {n < 3 && (
                      <div
                        style={{
                          flex: 1,
                          height: "1.5px",
                          background: n < modalStep ? G : "var(--border)",
                          transition: "background .3s",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
              {modalStep === 1 && (
                <>
                  <span className="section-label">Step 1 of 3</span>
                  <h3
                    className="serif"
                    style={{
                      fontSize: "1.6rem",
                      color: "var(--ink)",
                      margin: "10px 0 8px",
                    }}
                  >
                    What type of home?
                  </h3>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: ".83rem",
                      marginBottom: "24px",
                    }}
                  >
                    Helps us assign the right designer and estimate your scope.
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                      marginBottom: "24px",
                    }}
                  >
                    {[
                      "1 BHK",
                      "2 BHK",
                      "3 BHK",
                      "3+ BHK",
                      "Villa / Duplex",
                      "Office / Commercial",
                    ].map((b) => (
                      <div
                        key={b}
                        className={`bhk-btn ${selectedBHK === b ? "sel" : ""}`}
                        onClick={() => setSelectedBHK(b)}
                      >
                        {selectedBHK === b ? "✓ " : ""}
                        {b}
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn-primary"
                    style={{
                      width: "100%",
                      padding: "15px",
                      opacity: selectedBHK ? 1 : 0.35,
                    }}
                    disabled={!selectedBHK}
                    onClick={() => setModalStep(2)}
                  >
                    Continue →
                  </button>
                </>
              )}
              {modalStep === 2 && (
                <>
                  <span className="section-label">Step 2 of 3</span>
                  <h3
                    className="serif"
                    style={{
                      fontSize: "1.6rem",
                      color: "var(--ink)",
                      margin: "10px 0 4px",
                    }}
                  >
                    What's your budget?
                  </h3>
                  <p
                    style={{
                      color: G,
                      fontSize: ".8rem",
                      marginBottom: "22px",
                    }}
                  >
                    For your {selectedBHK}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "9px",
                      marginBottom: "20px",
                    }}
                  >
                    {[
                      "Under ₹5 Lakhs",
                      "₹5 – ₹10 Lakhs",
                      "₹10 – ₹20 Lakhs",
                      "₹20 – ₹40 Lakhs",
                      "₹40 Lakhs+",
                      "Not decided yet",
                    ].map((b) => (
                      <div
                        key={b}
                        className={`bhk-btn ${selectedBudget === b ? "sel" : ""}`}
                        style={{ textAlign: "left", padding: "14px 18px" }}
                        onClick={() => {
                          setSelectedBudget(b);
                          setTimeout(() => setModalStep(3), 280);
                        }}
                      >
                        {selectedBudget === b ? "✓  " : ""}
                        {b}
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn-outline"
                    style={{ width: "100%", padding: "11px" }}
                    onClick={() => setModalStep(1)}
                  >
                    ← Back
                  </button>
                </>
              )}
              {modalStep === 3 && (
                <>
                  <span className="section-label">Step 3 of 3</span>
                  <h3
                    className="serif"
                    style={{
                      fontSize: "1.6rem",
                      color: "var(--ink)",
                      margin: "10px 0 6px",
                    }}
                  >
                    Your contact details
                  </h3>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: ".81rem",
                      marginBottom: "20px",
                    }}
                  >
                    We'll call you within 2 hours to schedule your free home
                    visit.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginBottom: "14px",
                    }}
                  >
                    <input
                      id="qname"
                      className="form-input"
                      placeholder="Full Name *"
                    />
                    <input
                      id="qmobile"
                      className="form-input"
                      placeholder="Mobile Number *"
                    />
                    <input
                      id="qemail"
                      className="form-input"
                      placeholder="Email Address"
                    />
                    <input
                      id="qarea"
                      className="form-input"
                      placeholder="Your Area in Hyderabad"
                    />
                  </div>
                  <div
                    style={{
                      background: "var(--gold-pale)",
                      border: "1px solid #E5C87A",
                      padding: "12px 14px",
                      marginBottom: "16px",
                    }}
                  >
                    <p
                      style={{ fontSize: ".76rem", color: G, lineHeight: 1.6 }}
                    >
                      <strong>{selectedBHK}</strong> · Budget:{" "}
                      <strong>{selectedBudget}</strong>
                    </p>
                    <p
                      style={{
                        fontSize: ".72rem",
                        color: "var(--muted)",
                        marginTop: "3px",
                      }}
                    >
                      Senior designer home visit · 60 min · Free · No obligation
                    </p>
                  </div>
                  <button
                    className="btn-gold"
                    style={{ width: "100%", padding: "16px" }}
                    onClick={handleQuoteSubmit}
                  >
                    Book My Free Home Visit →
                  </button>
                  <button
                    className="btn-outline"
                    style={{ width: "100%", padding: "11px", marginTop: "9px" }}
                    onClick={() => setModalStep(2)}
                  >
                    ← Back
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── REVIEW FORM MODAL ── */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) =>
              e.target === e.currentTarget && setShowReviewForm(false)
            }
          >
            <motion.div
              className="modal-box"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              <button
                onClick={() => setShowReviewForm(false)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "20px",
                  background: "none",
                  border: "none",
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  color: "var(--muted)",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
              <AnimatePresence mode="wait">
                {reviewSubmitted ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: "center", padding: "48px 20px" }}
                  >
                    <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
                      🎉
                    </div>
                    <h4
                      className="serif"
                      style={{ fontSize: "1.5rem", marginBottom: "10px" }}
                    >
                      Thank you for your review!
                    </h4>
                    <p
                      style={{
                        color: "var(--muted)",
                        fontSize: ".86rem",
                        lineHeight: 1.6,
                      }}
                    >
                      Your review has been submitted and will appear on the site
                      once our team approves it. We appreciate your feedback!
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form">
                    <span className="section-label">Share Your Experience</span>
                    <h3
                      className="serif"
                      style={{
                        fontSize: "1.6rem",
                        color: "var(--ink)",
                        margin: "10px 0 6px",
                      }}
                    >
                      Write a Review
                    </h3>
                    <p
                      style={{
                        color: "var(--muted)",
                        fontSize: ".82rem",
                        marginBottom: "24px",
                      }}
                    >
                      Your honest review helps other homeowners make the right
                      decision.
                    </p>
                    <form
                      onSubmit={handleReviewSubmit}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <input
                        className="form-input"
                        placeholder="Your Full Name *"
                        value={reviewForm.name}
                        onChange={(e) =>
                          setReviewForm((p) => ({ ...p, name: e.target.value }))
                        }
                        required
                      />
                      <input
                        className="form-input"
                        placeholder="Your Location (e.g. Banjara Hills, Hyderabad)"
                        value={reviewForm.location}
                        onChange={(e) =>
                          setReviewForm((p) => ({
                            ...p,
                            location: e.target.value,
                          }))
                        }
                      />
                      <input
                        className="form-input"
                        placeholder="Project (e.g. 3 BHK · Premium Plan)"
                        value={reviewForm.project}
                        onChange={(e) =>
                          setReviewForm((p) => ({
                            ...p,
                            project: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleReviewImage}
                      />
                      {reviewForm.image && (
                        <img
                          src={reviewForm.image}
                          alt="preview"
                          style={{ width: "100px", marginTop: "10px" }}
                        />
                      )}
                      {/* Star rating */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span
                          style={{ fontSize: ".78rem", color: "var(--muted)" }}
                        >
                          Your Rating:
                        </span>
                        <div style={{ display: "flex", gap: "2px" }}>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button
                              key={n}
                              type="button"
                              className="star-btn"
                              onClick={() =>
                                setReviewForm((p) => ({ ...p, stars: n }))
                              }
                              style={{
                                color: n <= reviewForm.stars ? G : "#E8E2DA",
                              }}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                        <span
                          style={{
                            fontSize: ".78rem",
                            color: G,
                            fontWeight: 600,
                          }}
                        >
                          {reviewForm.stars}/5
                        </span>
                      </div>
                      <textarea
                        className="form-input"
                        placeholder="Tell us about your experience — what did MARKVIBE do well? How does your home look now? *"
                        style={{ minHeight: "120px" }}
                        value={reviewForm.text}
                        onChange={(e) =>
                          setReviewForm((p) => ({ ...p, text: e.target.value }))
                        }
                        required
                      />
                      <button
                        type="submit"
                        className="btn-gold"
                        style={{
                          width: "100%",
                          padding: "15px",
                          marginTop: "4px",
                        }}
                      >
                        Submit Review →
                      </button>
                      <p
                        style={{
                          fontSize: ".68rem",
                          color: "var(--muted)",
                          textAlign: "center",
                        }}
                      >
                        Reviews are reviewed by our team before being published.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ADMIN LOGIN MODAL ── */}
      <AnimatePresence>
        {showAdminLogin && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) =>
              e.target === e.currentTarget && setShowAdminLogin(false)
            }
          >
            <motion.div
              className="modal-box"
              style={{
                maxWidth: "400px",
                background: "#1A1714",
                border: "1px solid #2E2A27",
              }}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18 }}
            >
              <button
                onClick={() => setShowAdminLogin(false)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "20px",
                  background: "none",
                  border: "none",
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  color: "#4A4540",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "24px",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                  <polygon
                    points="14,2 26,9 26,26 2,26 2,9"
                    stroke={G}
                    strokeWidth="1.8"
                    fill="none"
                  />
                </svg>
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      color: "#E8E2DA",
                      fontWeight: 700,
                      letterSpacing: ".08em",
                      fontSize: ".9rem",
                    }}
                  >
                    MARKVIBE
                  </div>
                  <div
                    style={{
                      fontSize: ".48rem",
                      letterSpacing: ".22em",
                      color: G,
                      textTransform: "uppercase",
                    }}
                  >
                    Admin Access
                  </div>
                </div>
              </div>
              <h3
                style={{
                  fontSize: "1.2rem",
                  color: "#E8E2DA",
                  marginBottom: "6px",
                  fontFamily: "'Playfair Display',serif",
                }}
              >
                Admin Login
              </h3>
              <p
                style={{
                  fontSize: ".78rem",
                  color: "#7A746E",
                  marginBottom: "24px",
                }}
              >
                Enter your credentials to access the admin panel.
              </p>
              <form
                onSubmit={handleAdminLogin}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <input
                  className="admin-input"
                  type="email"
                  placeholder="Email Address"
                  value={adminCreds.email}
                  onChange={(e) =>
                    setAdminCreds((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                />
                <input
                  className="admin-input"
                  type="password"
                  placeholder="Password"
                  value={adminCreds.password}
                  onChange={(e) =>
                    setAdminCreds((p) => ({ ...p, password: e.target.value }))
                  }
                  required
                />
                {adminError && (
                  <div
                    style={{
                      fontSize: ".78rem",
                      color: "#E74C3C",
                      background: "rgba(231,76,60,.1)",
                      border: "1px solid rgba(231,76,60,.2)",
                      padding: "9px 12px",
                    }}
                  >
                    {adminError}
                  </div>
                )}
                <button
                  type="submit"
                  style={{
                    background: G,
                    color: "#fff",
                    border: "none",
                    padding: "14px",
                    fontSize: ".78rem",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                    marginTop: "4px",
                  }}
                >
                  Login to Admin Panel
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
