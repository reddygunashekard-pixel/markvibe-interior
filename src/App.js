import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ────────────────────────────────────────────────
   GLOBAL STYLES
──────────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --gold: #B8892A;
      --gold-light: #D4A84B;
      --gold-pale: #FDF6E9;
      --ink: #1A1714;
      --ink-2: #2E2A27;
      --muted: #7A746E;
      --border: #E8E2DA;
      --white: #FFFFFF;
      --off-white: #FAFAF8;
    }
    html { scroll-behavior: smooth; }
    body { background: var(--white); color: var(--ink); font-family: 'DM Sans', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #f5f5f3; }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }
    .serif { font-family: 'Playfair Display', serif; }
    .section-label { font-size: 0.68rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); font-weight: 500; font-family: 'DM Sans', sans-serif; }
    .section-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 600; line-height: 1.15; color: var(--ink); }
    .gold-divider { width: 48px; height: 2px; background: linear-gradient(90deg, var(--gold), var(--gold-light)); margin: 16px 0 28px; }
    .gold-divider.center { margin: 16px auto 28px; }
    .btn-primary { background: var(--ink); color: #fff; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 15px 34px; border: 2px solid var(--ink); cursor: pointer; transition: background 0.22s, color 0.22s, transform 0.18s; display: inline-block; }
    .btn-primary:hover { background: transparent; color: var(--ink); transform: translateY(-2px); }
    .btn-gold { background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%); color: #fff; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 15px 34px; border: none; cursor: pointer; transition: opacity 0.22s, transform 0.18s; display: inline-block; box-shadow: 0 4px 20px rgba(184,137,42,0.3); }
    .btn-gold:hover { opacity: 0.88; transform: translateY(-2px); }
    .btn-outline { background: transparent; color: var(--ink); border: 1.5px solid var(--border); padding: 14px 32px; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: border-color 0.2s, color 0.2s; }
    .btn-outline:hover { border-color: var(--gold); color: var(--gold); }
    .nav-link { font-size: 0.76rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink); font-weight: 500; cursor: pointer; background: none; border: none; font-family: 'DM Sans', sans-serif; padding: 4px 0; position: relative; transition: color 0.2s; }
    .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1.5px; background: var(--gold); transition: width 0.25s ease; }
    .nav-link:hover { color: var(--gold); }
    .nav-link:hover::after { width: 100%; }
    .spec-card { background: var(--white); border: 1px solid var(--border); padding: 36px 28px; transition: all 0.3s; position: relative; overflow: hidden; cursor: pointer; }
    .spec-card::before { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 3px; background: linear-gradient(90deg, var(--gold), var(--gold-light)); transition: width 0.35s ease; }
    .spec-card:hover, .spec-card.active { box-shadow: 0 8px 40px rgba(0,0,0,0.09); transform: translateY(-4px); border-color: transparent; }
    .spec-card:hover::before, .spec-card.active::before { width: 100%; }
    .spec-card.active { background: var(--gold-pale); border-color: var(--gold-light) !important; transform: translateY(-4px); }
    .why-card { background: var(--off-white); padding: 32px 24px; border: 1px solid var(--border); text-align: center; transition: all 0.3s; }
    .why-card:hover { background: var(--white); box-shadow: 0 6px 30px rgba(184,137,42,0.12); border-color: var(--gold-light); }
    .pricing-card { border: 1.5px solid var(--border); padding: 44px 36px; background: var(--white); transition: all 0.3s; position: relative; }
    .pricing-card.featured { border-color: var(--gold); background: var(--ink); box-shadow: 0 12px 48px rgba(0,0,0,0.18); }
    .pricing-card:not(.featured):hover { box-shadow: 0 8px 36px rgba(0,0,0,0.1); border-color: var(--gold-light); }
    .testi-card { background: var(--off-white); border: 1px solid var(--border); padding: 36px 32px; position: relative; }
    .testi-card::before { content: '"'; font-family: 'Playfair Display', serif; font-size: 7rem; color: var(--gold); opacity: 0.12; position: absolute; top: -12px; left: 16px; line-height: 1; pointer-events: none; }
    .comp-table { width: 100%; border-collapse: collapse; }
    .comp-table th { padding: 20px 16px; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600; border-bottom: 2px solid var(--border); }
    .comp-table th.us { background: var(--ink); color: #fff; }
    .comp-table th.them { background: var(--off-white); color: var(--muted); }
    .comp-table td { padding: 16px; font-size: 0.88rem; border-bottom: 1px solid var(--border); vertical-align: middle; }
    .comp-table tr:last-child td { border-bottom: none; }
    .comp-table td.feature { font-weight: 500; color: var(--ink-2); font-size: 0.85rem; }
    .comp-table td.us-col { background: #FFFDF7; text-align: center; }
    .comp-table td.them-col { background: var(--off-white); text-align: center; }
    .comp-table tr:hover td { background: #FDF9F0; }
    .comp-table tr:hover td.them-col { background: #F0EFED; }
    .step-num-btn { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 600; cursor: pointer; transition: all 0.3s; border: 1.5px solid var(--border); background: var(--white); color: var(--muted); font-family: 'DM Sans', sans-serif; }
    .step-num-btn.active { background: var(--ink); color: var(--white); border-color: var(--ink); transform: scale(1.12); }
    .step-num-btn:not(.active):hover { border-color: var(--gold); color: var(--gold); }
    .form-input { width: 100%; border: 1.5px solid var(--border); padding: 14px 16px; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: var(--ink); background: var(--white); outline: none; transition: border-color 0.2s; border-radius: 0; }
    .form-input:focus { border-color: var(--gold); }
    .form-input::placeholder { color: #B0ABA5; }
    textarea.form-input { min-height: 110px; resize: vertical; }
    select.form-input { cursor: pointer; }
    .modal-overlay { position: fixed; inset: 0; background: rgba(26,23,20,0.7); backdrop-filter: blur(6px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .modal-box { background: var(--white); width: 90%; max-width: 540px; padding: 52px 44px; position: relative; box-shadow: 0 24px 80px rgba(0,0,0,0.25); max-height: 90vh; overflow-y: auto; }
    .bhk-btn { border: 1.5px solid var(--border); padding: 18px 12px; text-align: center; cursor: pointer; transition: all 0.2s; background: var(--white); font-family: 'DM Sans', sans-serif; font-size: 0.88rem; color: var(--ink); }
    .bhk-btn:hover, .bhk-btn.sel { border-color: var(--gold); background: var(--gold-pale); color: var(--gold); }
    .sol-card { background: var(--white); border: 1px solid var(--border); padding: 28px 20px; text-align: center; transition: all 0.28s; }
    .sol-card:hover { border-color: var(--gold-light); background: var(--gold-pale); box-shadow: 0 4px 20px rgba(184,137,42,0.12); transform: translateY(-3px); }
    .footer-link { font-size: 0.82rem; color: #6E685E; letter-spacing: 0.04em; transition: color 0.2s; cursor: pointer; background: none; border: none; font-family: 'DM Sans', sans-serif; text-align: left; display: block; padding: 4px 0; }
    .footer-link:hover { color: var(--gold); }
    #scroll-bar { position: fixed; top: 0; left: 0; height: 3px; z-index: 10000; background: linear-gradient(90deg, var(--gold), var(--gold-light)); transition: width 0.1s linear; }
    @media(max-width:900px){.hide-md{display:none!important}.two-col{grid-template-columns:1fr!important}.three-col{grid-template-columns:1fr 1fr!important}.five-col{grid-template-columns:1fr 1fr!important}.six-col{grid-template-columns:repeat(3,1fr)!important}.modal-box{padding:32px 24px!important}}
    @media(max-width:600px){.three-col{grid-template-columns:1fr!important}.six-col{grid-template-columns:1fr 1fr!important}.five-col{grid-template-columns:1fr 1fr!important}}
  `}</style>
);

const G = "#B8892A";
const Reveal = ({ children, delay = 0, style = {}, className = "" }) => (
  <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} style={style} className={className}>
    {children}
  </motion.div>
);

const CheckIcon = ({ size = 20, color = "#27AE60" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ display: "inline-block", flexShrink: 0 }}>
    <circle cx="10" cy="10" r="9" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5" />
    <path d="M6 10.5l3 3 5-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CrossIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: "inline-block", flexShrink: 0 }}>
    <circle cx="10" cy="10" r="9" fill="#E74C3C" fillOpacity="0.1" stroke="#E74C3C" strokeWidth="1.5" />
    <path d="M7 7l6 6M13 7l-6 6" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const PartialIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: "inline-block", flexShrink: 0 }}>
    <circle cx="10" cy="10" r="9" fill={G} fillOpacity="0.1" stroke={G} strokeWidth="1.5" />
    <path d="M6 10h8" stroke={G} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

/* ── DATA ── */
const specialities = [
  {
    icon: <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke={G} strokeWidth="1.6"><rect x="6" y="28" width="36" height="14" rx="1" /><rect x="10" y="32" width="7" height="7" /><rect x="20" y="32" width="7" height="7" /><rect x="30" y="32" width="7" height="7" /><path d="M12 28V18a2 2 0 012-2h10v-6h2v6h10a2 2 0 012 2v10" strokeLinecap="round" /><circle cx="24" cy="12" r="2" fill={G} /></svg>,
    title: "Modular Kitchen Design",
    tagline: "India's Most Trusted Kitchen Specialists",
    desc: "Our modular kitchens are engineered specifically for Indian cooking — built to handle high heat, heavy daily usage, and moisture. Every unit features soft-close hinges, anti-termite boards, and waterproof carcasses that last decades, not years.",
    features: ["Marine-grade BWP plywood carcass (not MDF)", "Hettich / Häfele European hardware", "Soft-close tandem boxes & drawers", "Anti-scratch laminates, acrylic & PU lacquer", "Built for Indian heavy cooking habits", "Modular pull-out systems for every zone"],
    advantage: "All kitchens are manufactured in our ISO-certified factory with 32 quality checkpoints — not built on-site with unpredictable carpenter quality.",
    badge: "Most Booked",
  },
  {
    icon: <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke={G} strokeWidth="1.6"><rect x="8" y="6" width="32" height="36" rx="1" /><line x1="24" y1="6" x2="24" y2="42" /><line x1="8" y1="20" x2="40" y2="20" /><line x1="8" y1="32" x2="40" y2="32" /><circle cx="19" cy="26" r="1.5" fill={G} /><circle cx="29" cy="26" r="1.5" fill={G} /></svg>,
    title: "Wardrobe & Storage",
    tagline: "Maximum Space, Zero Wasted Inch",
    desc: "We design storage around how you actually live — separate zones for daily wear, formal clothing, accessories, shoes, and seasonal items. Every wardrobe is planned by a dedicated storage specialist, not generalized.",
    features: ["Sliding, hinged & walk-in configurations", "Full-height designs up to 12 ft", "Interior LED lighting & vanity mirrors", "Velvet-lined drawers & jewellery trays", "Trouser racks, tie holders, shoe racks included", "Anti-humidity backing boards"],
    advantage: "Our proprietary storage planning software maps 100% of your wardrobe space before production begins — guaranteeing every item has a home.",
    badge: null,
  },
  {
    icon: <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke={G} strokeWidth="1.6"><rect x="6" y="10" width="36" height="28" rx="2" /><rect x="10" y="14" width="28" height="8" rx="1" /><rect x="10" y="28" width="10" height="6" /><rect x="22" y="28" width="6" height="6" /><rect x="30" y="28" width="8" height="6" /><circle cx="24" cy="18" r="2" fill={G} /></svg>,
    title: "Living Room & TV Units",
    tagline: "Where Your Home Makes Its First Impression",
    desc: "We design living rooms that balance visual impact with everyday function. From sculptural TV wall units with integrated storage to custom entertainment centers — your living room becomes the room guests remember.",
    features: ["Wall-mounted & floor-standing designs", "Integrated cable management (no visible wires)", "Backlit panels & LED accent lighting", "Matching crockery & display shelving", "Custom sofa & center tables available", "Fluted, cane & stone panel options"],
    advantage: "Our living room designs are backed by 3D photorealistic renders showing exact material textures, so you see the finished room before we build it.",
    badge: null,
  },
  {
    icon: <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke={G} strokeWidth="1.6"><path d="M8 38L8 16L24 8L40 16L40 38Z" /><rect x="18" y="26" width="12" height="12" /><path d="M14 24h4v-6h8v6h4" /><path d="M8 16L24 8L40 16" strokeLinecap="round" /></svg>,
    title: "Complete Home Interiors",
    tagline: "One Vision. Every Room. Zero Stress.",
    desc: "From front door to master bedroom, we design and execute the entire home as one cohesive vision — with a single project manager, one timeline, and one point of contact from design to final handover.",
    features: ["Single PM handles your entire project", "3D room-by-room walkthrough before execution", "Unified design language across all spaces", "Vastu & space planning included free", "Civil, electrical, plumbing coordination", "100-point snagging inspection at handover"],
    advantage: "Whole-home projects get priority factory slots, a senior designer, and a guaranteed handover date — with a penalty clause if we're late.",
    badge: "Best Value",
  },
  {
    icon: <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke={G} strokeWidth="1.6"><circle cx="24" cy="22" r="10" /><rect x="20" y="32" width="8" height="8" rx="1" /><line x1="24" y1="6" x2="24" y2="4" /><line x1="38" y1="12" x2="40" y2="10" /><line x1="42" y1="22" x2="44" y2="22" /><line x1="8" y1="12" x2="6" y2="10" /><line x1="6" y1="22" x2="4" y2="22" /><circle cx="24" cy="22" r="4" fill={G} fillOpacity="0.2" /></svg>,
    title: "False Ceiling & Lighting",
    tagline: "Where Atmosphere Is Engineered",
    desc: "Lighting transforms a room from ordinary to exceptional. Our ceiling and lighting designers use layered light techniques — ambient, accent, and task — to engineer the mood of every space with precision.",
    features: ["POP, gypsum, wood & coffered ceilings", "Recessed, cove, pendant & track lighting", "Smart lighting (Alexa / Google Home ready)", "Energy-efficient LED systems throughout", "Acoustic ceiling panels for bedrooms", "Dimmable circuits for every zone"],
    advantage: "We use light simulation software to show you exactly how a room will feel at different times of day before we install a single fixture.",
    badge: null,
  },
  {
    icon: <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke={G} strokeWidth="1.6"><rect x="10" y="6" width="28" height="36" rx="1" /><line x1="10" y1="18" x2="38" y2="18" /><line x1="10" y1="30" x2="38" y2="30" /><path d="M18 6v6M30 6v6M18 30v6M30 30v6" /><circle cx="24" cy="24" r="3" fill={G} fillOpacity="0.3" /></svg>,
    title: "Wallpaper & Wall Treatments",
    tagline: "Textures That Change How a Room Feels",
    desc: "Walls are the largest canvas in your home. We stock 2,000+ wallpaper designs and offer fluted panels, stone cladding, limewash, Venetian plaster, and textured paint — installed by experts with a clean-finish guarantee.",
    features: ["2,000+ wallpaper designs in studio", "Imported European & domestic options", "Fluted wood & stone cladding panels", "Limewash & Venetian plaster effects", "Expert installation (no bubbles guarantee)", "Wall art & painting coordination"],
    advantage: "Physical wallpaper samples delivered to your home before you decide — so you see the real texture and colour in your actual lighting conditions.",
    badge: null,
  },
];

const comparisonRows = [
  { feature: "3D Visualisation Before Execution", detail: "Photorealistic renders + VR walkthrough", us: "full", them: "partial" },
  { feature: "Dedicated Project Manager", detail: "One PM from first meeting to handover", us: "full", them: "cross" },
  { feature: "Fixed Price at Booking (No Revisions)", detail: "Signed quote = final price, guaranteed", us: "full", them: "partial" },
  { feature: "45-Day Delivery Guarantee", detail: "Penalty clause in contract for delays", us: "full", them: "cross" },
  { feature: "10-Year Comprehensive Warranty", detail: "Covers materials AND workmanship", us: "full", them: "partial" },
  { feature: "ISO-Certified Factory Manufacturing", detail: "Not site-built carpentry", us: "full", them: "partial" },
  { feature: "In-House Design + Execution Team", detail: "No third-party contractors ever", us: "full", them: "partial" },
  { feature: "Physical Sample Box Delivered to You", detail: "Touch & see materials before deciding", us: "full", them: "cross" },
  { feature: "Vastu Consultation Included", detail: "Complimentary with every project", us: "full", them: "cross" },
  { feature: "Smart Home Integration Support", detail: "Alexa, Google, Lutron compatible", us: "full", them: "cross" },
  { feature: "Light Simulation Software", detail: "See lighting mood before installation", us: "full", them: "cross" },
  { feature: "0% EMI (No Interest Cost)", detail: "Up to 24 months, zero extra charge", us: "full", them: "partial" },
  { feature: "Post-Handover Service (1 Year Free)", detail: "Dedicated support team after delivery", us: "full", them: "cross" },
  { feature: "100-Point Snagging Inspection", detail: "Signed checklist before you take keys", us: "full", them: "cross" },
];

const steps = [
  { num: "01", title: "Free Design Consultation (Home Visit)", desc: "A senior designer visits your home for a 60-minute consultation. We study your floor plan, understand your lifestyle, family habits, and aesthetic preferences. We ask questions others skip — what time do you cook, how many guests do you host, do you work from home. No generic templates.", icon: "🎨", time: "Day 1" },
  { num: "02", title: "3D Design & Material Selection", desc: "Within 7 working days you receive photorealistic 3D renders of every room. Walk through your home virtually before a single nail is hammered. Choose from 5,000+ material combinations. Physical samples delivered to your door — see the real texture in your actual light.", icon: "🖥️", time: "Days 2–7" },
  { num: "03", title: "Fixed Quotation & Booking", desc: "Receive a fully itemised quote — every material, SKU, and labour charge listed. This is your final price. Sign, pay booking amount, and your price is locked. No 'surprise additions' or 'scope creep.' Delivery date is written into the contract with a penalty clause.", icon: "📋", time: "Day 8" },
  { num: "04", title: "Factory Production", desc: "Your modular units enter production at our ISO-certified facility with 32 quality checkpoints. Every panel is labelled to your floor plan. Because we manufacture, not carpenters — your quality is consistent, measurable, and guaranteed.", icon: "🏭", time: "Days 9–35" },
  { num: "05", title: "Site Prep & Logistics", desc: "Our civil team handles all site work — electrical, plumbing, surface preparation — running parallel to factory production. No idle site time. Materials are GPS-tracked from factory to your home with real-time status updates.", icon: "🚛", time: "Days 20–42" },
  { num: "06", title: "Installation & Handover", desc: "Our full-time installation crew (never third-party) installs everything with precision. Final 100-point snagging inspection. Any snag is fixed before you receive the keys. You sign the handover document — and you're home.", icon: "🏠", time: "Days 40–45" },
];

const solutions = [
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

const testimonials = [
  { name: "Priya & Rajesh Sharma", location: "Banjara Hills, Hyderabad", project: "3 BHK Full Home · Premium Plan", text: "We had worked with two other interior firms before MARKVIBE. The difference? These people actually delivered what they rendered. The 3D walkthrough meant zero surprises. They finished 3 days before the deadline, and the snagging inspection caught minor issues that were fixed the same day. Our home looks like a magazine spread and we're still getting calls about it.", stars: 5 },
  { name: "Arun Mehta", location: "Gachibowli, Hyderabad", project: "2 BHK · Modular Kitchen + Wardrobes", text: "I was genuinely sceptical about the 45-day guarantee — I've heard that before. But they pulled it off. The kitchen is extraordinary: soft-close drawers, pull-out corner unit, interior lighting. Transparent pricing meant I budgeted exactly, not approximately. The physical sample box was a brilliant touch — I changed my laminate choice after seeing it in my actual kitchen light.", stars: 5 },
  { name: "Kavitha Reddy", location: "Jubilee Hills, Hyderabad", project: "Villa · Luxury Plan", text: "For a luxury villa, I needed someone who would genuinely understand the vision — not just execute a catalogue. MARKVIBE's team spent three sessions understanding what I wanted. The Venetian plaster walls, the fluted wardrobe panels, the coffered ceiling in the master bedroom — every detail is precisely what I imagined. The 10-year warranty on a luxury finish is something no other firm offered.", stars: 5 },
];

/* ── MAIN ── */
export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedBHK, setSelectedBHK] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [formData, setFormData] = useState({ name: "", mobile: "", email: "", msg: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [navBg, setNavBg] = useState(false);
  const [activeSpec, setActiveSpec] = useState(0);

  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setScrollPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
      setNavBg(window.scrollY > 50);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData({ name: "", mobile: "", email: "", msg: "" }); }, 4000);
  };
  const resetModal = () => { setShowModal(false); setModalStep(1); setSelectedBHK(null); setSelectedBudget(null); };

  return (
    <>
      <GlobalStyle />
      <div id="scroll-bar" style={{ width: `${scrollPct}%` }} />

      {/* ── NAVBAR ── */}
      <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 500, padding: "0 52px", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: navBg ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${navBg ? "var(--border)" : "transparent"}`, transition: "all 0.35s ease", boxShadow: navBg ? "0 2px 20px rgba(0,0,0,0.06)" : "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none"><polygon points="14,2 26,9 26,26 2,26 2,9" stroke={G} strokeWidth="1.8" fill="none" /><line x1="14" y1="26" x2="14" y2="16" stroke={G} strokeWidth="1.8" /><line x1="8" y1="19" x2="20" y2="19" stroke={G} strokeWidth="1.2" opacity="0.5" /></svg>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--ink)", lineHeight: 1 }}>MARKVIBE</div>
            <div style={{ fontSize: "0.52rem", letterSpacing: "0.28em", color: G, textTransform: "uppercase", marginTop: "2px" }}>INTERIORS</div>
          </div>
        </div>
        <div className="hide-md" style={{ display: "flex", gap: "32px" }}>
          {[["about", "About"], ["specialities", "Specialities"], ["compare", "Why Us"], ["process", "Process"], ["pricing", "Pricing"], ["contact", "Contact"]].map(([id, label]) => (
            <button key={id} className="nav-link" onClick={() => go(id)}>{label}</button>
          ))}
        </div>
        <button className="btn-gold" style={{ fontSize: "0.72rem", padding: "12px 26px" }} onClick={() => setShowModal(true)}>Get Free Quote</button>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", position: "relative", display: "flex", overflow: "hidden", background: "#FAFAF8" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "48%", height: "100%", background: "var(--gold-pale)" }} />
        <div style={{ position: "absolute", top: "60px", right: "40px", bottom: "60px", left: "46%", overflow: "hidden" }}>
          <img src="/images/2.jpg" alt="Interior" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, var(--gold-pale) 0%, transparent 25%)" }} />
        </div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.6 }}
          style={{ position: "absolute", bottom: "90px", right: "48px", background: "var(--white)", border: "1px solid var(--border)", padding: "20px 28px", zIndex: 3, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
          <div className="serif" style={{ fontSize: "2rem", color: G }}>98%</div>
          <div style={{ fontSize: "0.68rem", letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>Client Satisfaction</div>
        </motion.div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: "600px", padding: "130px 52px 100px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="section-label">Hyderabad's Premier Interior Studio · Since 2012</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="serif" style={{ fontSize: "clamp(2.4rem, 4.5vw, 4rem)", fontWeight: 700, lineHeight: 1.1, color: "var(--ink)", marginTop: "20px", marginBottom: "24px" }}>
            Interiors That<br /><span style={{ color: G, fontStyle: "italic" }}>Actually Deliver</span><br />What You Were Promised
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.85, marginBottom: "36px" }}>
            Fixed pricing. 3D visualization before a single nail is hammered. 45-day delivery guarantee with a penalty clause. See exactly how we compare.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
            style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => setShowModal(true)}>Get Free Quote</button>
            <button className="btn-outline" onClick={() => go("compare")}>See How We Compare</button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ display: "flex", gap: "32px", marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border)", flexWrap: "wrap" }}>
            {[["1000+", "Projects"], ["600+", "Designers"], ["45 Days", "Guarantee"], ["10 Yr", "Warranty"]].map(([n, l]) => (
              <div key={l}>
                <div className="serif" style={{ fontSize: "1.6rem", color: "var(--ink)", fontWeight: 700 }}>{n}</div>
                <div style={{ fontSize: "0.66rem", letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} onClick={() => go("about")}
          style={{ position: "absolute", bottom: "32px", left: "52px", zIndex: 3, display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <div style={{ width: "1px", height: "36px", background: "var(--border)" }} />
          <span style={{ fontSize: "0.64rem", letterSpacing: "0.18em", color: "var(--muted)", textTransform: "uppercase" }}>Scroll to explore</span>
        </motion.div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section id="about" style={{ background: "var(--ink)", padding: "72px 52px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "60px", alignItems: "center" }} className="two-col">
          <Reveal>
            <span style={{ fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: G, display: "block", marginBottom: "16px" }}>Our Philosophy</span>
            <h2 className="serif" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#fff", fontWeight: 400 }}>
              Honesty in Design.<br /><em style={{ color: G }}>Precision in Execution.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ color: "#A09A94", lineHeight: 1.9, fontSize: "0.95rem", marginBottom: "20px" }}>
              MARKVIBE was founded with one simple frustration: interior design in India was full of broken promises. Beautiful 3D renders that never matched reality. Budgets that doubled halfway through. Contractors who disappeared after taking advance.
            </p>
            <p style={{ color: "#A09A94", lineHeight: 1.9, fontSize: "0.95rem" }}>
              So we built the opposite. <strong style={{ color: "#fff" }}>Fixed prices locked at booking.</strong> <strong style={{ color: "#fff" }}>3D visualizations you can trust</strong> — because our factory produces exactly what our designers render. <strong style={{ color: "#fff" }}>A 45-day delivery guarantee with a penalty clause</strong>, because accountability isn't optional.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── SPECIALITIES ── */}
      <section id="specialities" style={{ padding: "100px 52px", background: "var(--white)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "16px" }}>
            <span className="section-label">What We Excel At</span>
            <h2 className="section-title" style={{ marginTop: "12px" }}>Our Core Specialities</h2>
            <div className="gold-divider center" />
            <p style={{ color: "var(--muted)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.8, fontSize: "0.95rem" }}>
              Each speciality is supported by dedicated designers, proprietary manufacturing, and factory precision — not on-site guesswork.
            </p>
          </Reveal>

          {/* Tab selector */}
          <div style={{ display: "flex", gap: "8px", margin: "40px 0 32px", flexWrap: "wrap", justifyContent: "center" }}>
            {specialities.map((s, i) => (
              <button key={i} onClick={() => setActiveSpec(i)} style={{
                padding: "10px 20px", border: `1.5px solid ${activeSpec === i ? G : "var(--border)"}`,
                background: activeSpec === i ? "var(--gold-pale)" : "var(--white)",
                color: activeSpec === i ? G : "var(--muted)", fontSize: "0.78rem", letterSpacing: "0.06em",
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: activeSpec === i ? 600 : 400,
                transition: "all 0.2s",
              }}>
                {s.title.split(" ").slice(0, 2).join(" ")}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div key={activeSpec} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.38 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", border: "1.5px solid var(--border)", marginBottom: "2px" }} className="two-col">
              <div style={{ padding: "52px 48px", borderRight: "1px solid var(--border)" }}>
                <div style={{ marginBottom: "16px" }}>{specialities[activeSpec].icon}</div>
                {specialities[activeSpec].badge && (
                  <span style={{ display: "inline-block", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "5px 12px", fontWeight: 600, background: "var(--gold-pale)", color: G, border: "1px solid #E5C87A", marginBottom: "16px" }}>
                    ★ {specialities[activeSpec].badge}
                  </span>
                )}
                <h3 className="serif" style={{ fontSize: "2rem", color: "var(--ink)", marginBottom: "8px" }}>{specialities[activeSpec].title}</h3>
                <p style={{ fontSize: "0.8rem", color: G, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px", fontWeight: 500 }}>{specialities[activeSpec].tagline}</p>
                <div style={{ width: "40px", height: "2px", background: G, marginBottom: "20px" }} />
                <p style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: "0.93rem", marginBottom: "32px" }}>{specialities[activeSpec].desc}</p>
                <button className="btn-primary" onClick={() => go("contact")}>Enquire About This →</button>
              </div>
              <div style={{ padding: "52px 48px", background: "var(--off-white)" }}>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "24px" }}>What's Included</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
                  {specialities[activeSpec].features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <CheckIcon size={18} color={G} />
                      <span style={{ fontSize: "0.9rem", color: "var(--ink-2)", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "var(--white)", border: `1px solid ${G}`, borderLeft: `4px solid ${G}`, padding: "20px 20px" }}>
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: G, marginBottom: "8px", fontWeight: 600 }}>MARKVIBE ADVANTAGE</p>
                  <p style={{ fontSize: "0.84rem", color: "var(--muted)", lineHeight: 1.75 }}>{specialities[activeSpec].advantage}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Card grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "var(--border)" }} className="three-col">
            {specialities.map((s, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className={`spec-card ${activeSpec === i ? "active" : ""}`} onClick={() => setActiveSpec(i)}>
                  <div style={{ marginBottom: "14px" }}>{s.icon}</div>
                  <h4 className="serif" style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--ink)" }}>{s.title}</h4>
                  <p style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.6 }}>{s.features[0]} · {s.features[1]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section id="compare" style={{ padding: "100px 52px", background: "var(--off-white)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className="section-label">The Honest Comparison</span>
            <h2 className="section-title" style={{ marginTop: "12px" }}>MARKVIBE vs. Typical Interior Firms</h2>
            <div className="gold-divider center" />
            <p style={{ color: "var(--muted)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.8, fontSize: "0.95rem" }}>
              Before you decide, see exactly how we compare — feature by feature, promise by promise. No marketing language, just facts.
            </p>
          </Reveal>
          <Reveal>
            <div style={{ overflowX: "auto", boxShadow: "0 4px 40px rgba(0,0,0,0.08)", border: "1px solid var(--border)" }}>
              <table className="comp-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", background: "var(--white)", width: "46%", padding: "20px 24px", color: "var(--muted)", fontSize: "0.72rem", letterSpacing: "0.18em" }}>Feature / Promise</th>
                    <th className="us" style={{ width: "27%" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", fontWeight: 700, textTransform: "none", letterSpacing: "0.04em", color: G }}>MARKVIBE</span>
                        <span style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.15em" }}>Interiors</span>
                      </div>
                    </th>
                    <th className="them" style={{ width: "27%" }}>Other Firms</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <motion.tr key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.035, duration: 0.4 }}>
                      <td className="feature" style={{ padding: "16px 24px" }}>
                        <div>{row.feature}</div>
                        <div style={{ fontSize: "0.74rem", color: "var(--muted)", marginTop: "3px", fontWeight: 400 }}>{row.detail}</div>
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
            <div style={{ display: "flex", gap: "28px", marginTop: "18px", justifyContent: "center", flexWrap: "wrap" }}>
              {[["#27AE60", "Fully Provided"], [G, "Partially / Extra Cost"], ["#E74C3C", "Not Provided"]].map(([c, l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: c }} />
                  <span style={{ fontSize: "0.76rem", color: "var(--muted)" }}>{l}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* CTA below table */}
          <Reveal style={{ textAlign: "center", marginTop: "48px" }}>
            <div style={{ background: "var(--white)", border: "1.5px solid var(--border)", padding: "40px 48px", maxWidth: "600px", margin: "0 auto" }}>
              <h3 className="serif" style={{ fontSize: "1.6rem", marginBottom: "12px" }}>See the difference for yourself</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "24px" }}>
                Book a free home visit. Our designer will come to your space, understand your needs, and show you exactly how MARKVIBE works — no obligation, no pressure.
              </p>
              <button className="btn-gold" onClick={() => setShowModal(true)}>Book Free Home Visit →</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ padding: "100px 52px", background: "var(--white)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="section-label">Our 6-Step Process</span>
            <h2 className="section-title" style={{ marginTop: "12px" }}>From Vision to Handover in 45 Days</h2>
            <div className="gold-divider center" />
          </Reveal>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "56px", flexWrap: "wrap", gap: "4px" }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <motion.button className={`step-num-btn ${activeStep === i ? "active" : ""}`} onClick={() => setActiveStep(i)} whileTap={{ scale: 0.95 }}>{s.num}</motion.button>
                {i < steps.length - 1 && <div style={{ width: "40px", height: "1.5px", background: i < activeStep ? G : "var(--border)", transition: "background 0.4s" }} className="hide-md" />}
              </div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeStep} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.38 }}
              style={{ maxWidth: "860px", margin: "0 auto", display: "grid", gridTemplateColumns: "120px 1fr", gap: "40px", alignItems: "start", padding: "52px", border: "1.5px solid var(--border)", background: "var(--off-white)" }} className="two-col">
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.8rem" }}>{steps[activeStep].icon}</div>
                <div className="serif" style={{ fontSize: "3.2rem", color: "var(--border)", fontWeight: 700, lineHeight: 1, marginTop: "6px" }}>{steps[activeStep].num}</div>
                <div style={{ display: "inline-block", marginTop: "12px", padding: "6px 12px", background: "var(--gold-pale)", border: "1px solid #E5C87A", fontSize: "0.65rem", letterSpacing: "0.1em", color: G, textTransform: "uppercase" }}>
                  {steps[activeStep].time}
                </div>
              </div>
              <div>
                <span className="section-label">Step {parseInt(steps[activeStep].num)} of 6</span>
                <h3 className="serif" style={{ fontSize: "1.9rem", color: "var(--ink)", margin: "12px 0 16px" }}>{steps[activeStep].title}</h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.9, fontSize: "0.94rem", marginBottom: "28px" }}>{steps[activeStep].desc}</p>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button className="btn-outline" style={{ padding: "10px 18px", fontSize: "0.72rem", opacity: activeStep === 0 ? 0.35 : 1 }}
                    disabled={activeStep === 0} onClick={() => setActiveStep(p => Math.max(0, p - 1))}>← Previous</button>
                  {activeStep < steps.length - 1 ? (
                    <button className="btn-primary" style={{ padding: "10px 18px", fontSize: "0.72rem" }} onClick={() => setActiveStep(p => p + 1)}>Next Step →</button>
                  ) : (
                    <button className="btn-gold" style={{ padding: "10px 18px", fontSize: "0.72rem" }} onClick={() => go("contact")}>Start My Project →</button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── SOLUTIONS GRID ── */}
      <section style={{ padding: "80px 52px", background: "var(--off-white)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="section-label">Every Room, Every Need</span>
            <h2 className="section-title" style={{ marginTop: "12px" }}>Complete Interior Solutions</h2>
            <div className="gold-divider center" />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1px", background: "var(--border)" }} className="five-col">
            {solutions.map((s, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <div className="sol-card">
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)", marginBottom: "5px" }}>{s.name}</div>
                  <div style={{ fontSize: "0.72rem", color: G, letterSpacing: "0.06em" }}>{s.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE STATS ── */}
      <section style={{ padding: "72px 52px", background: "var(--white)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1px", background: "var(--border)" }} className="six-col">
            {[
              { val: "10 Yr", label: "Warranty", sub: "On all products" },
              { val: "0%", label: "EMI Available", sub: "Up to 24 months" },
              { val: "600+", label: "Expert Designers", sub: "Pan-India team" },
              { val: "₹0", label: "Hidden Costs", sub: "Fixed price always" },
              { val: "45", label: "Day Delivery", sub: "Penalty if delayed" },
              { val: "1000+", label: "Projects Done", sub: "Since 2012" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="why-card">
                  <div className="serif" style={{ fontSize: "2rem", color: G, fontWeight: 700 }}>{item.val}</div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", marginTop: "6px" }}>{item.label}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--muted)", marginTop: "4px" }}>{item.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: "100px 52px", background: "var(--off-white)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className="section-label">Transparent Investment</span>
            <h2 className="section-title" style={{ marginTop: "12px" }}>Pricing Plans</h2>
            <div className="gold-divider center" />
            <p style={{ color: "var(--muted)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.8, fontSize: "0.95rem" }}>
              All prices are fixed at booking and guaranteed in writing. What you're quoted is what you pay — no exceptions, no additions.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0", background: "var(--border)" }} className="three-col">
            {[
              { plan: "Essential", price: "₹750", tag: "/sq.ft", featured: false, desc: "Beautiful, functional interiors within a defined budget. Ideal for 1-2 BHK apartments with clear requirements.", features: ["Standard laminates & finishes", "Basic modular kitchen design", "Hinged wardrobe with standard fittings", "Simple false ceiling with LEDs", "Wall paint & basic wallpaper options", "2-year product warranty"], cta: "Start with Essential" },
              { plan: "Premium", price: "₹1200", tag: "/sq.ft", featured: true, desc: "Our most popular plan — the balance of luxury materials, modern design, and real value. Suits most 2-3 BHK projects.", features: ["Premium laminates, acrylic & lacquer finishes", "Full modular kitchen with tall units & pull-outs", "Sliding wardrobes with interior LED lighting", "Gypsum false ceiling with cove & accent lighting", "Smart lighting & fan integration", "5-year comprehensive warranty"], cta: "Choose Premium" },
              { plan: "Luxury", price: "₹2000+", tag: "/sq.ft", featured: false, desc: "The finest materials, bespoke design, Italian hardware, and concierge-level project management for discerning homes.", features: ["Imported laminates & Italian Häfele hardware", "Custom kitchen with island & stone worktop", "Walk-in wardrobe with full vanity & lighting", "Coffered / beam ceiling with Lutron lighting", "Full smart home (KNX / Lutron system)", "10-year comprehensive warranty"], cta: "Design My Luxury Home" },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`pricing-card ${p.featured ? "featured" : ""}`} style={{ height: "100%" }}>
                  {p.featured && <div style={{ position: "absolute", top: "20px", right: "20px", background: G, color: "#fff", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "6px 12px" }}>Most Popular</div>}
                  <span style={{ fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase", color: p.featured ? G : "var(--muted)", fontFamily: "'DM Sans', sans-serif" }}>{p.plan}</span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", margin: "12px 0 8px" }}>
                    <span className="serif" style={{ fontSize: "3rem", fontWeight: 700, color: p.featured ? G : "var(--ink)" }}>{p.price}</span>
                    <span style={{ fontSize: "0.82rem", color: p.featured ? "rgba(255,255,255,0.5)" : "var(--muted)" }}>{p.tag}</span>
                  </div>
                  <p style={{ fontSize: "0.83rem", color: p.featured ? "rgba(255,255,255,0.6)" : "var(--muted)", lineHeight: 1.7, marginBottom: "28px" }}>{p.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}>
                    {p.features.map((f, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <CheckIcon size={16} color={G} />
                        <span style={{ fontSize: "0.83rem", color: p.featured ? "rgba(255,255,255,0.8)" : "var(--ink-2)" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button className={p.featured ? "btn-gold" : "btn-primary"} style={{ width: "100%", textAlign: "center" }} onClick={() => setShowModal(true)}>{p.cta}</button>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ textAlign: "center", marginTop: "28px" }}>
            <p style={{ fontSize: "0.82rem", color: "var(--muted)" }}>All plans include: Free 3D design · Dedicated project manager · Fixed pricing guarantee · Factory manufacturing · Professional installation · Vastu consultation</p>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "100px 52px", background: "var(--white)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className="section-label">Client Stories</span>
            <h2 className="section-title" style={{ marginTop: "12px" }}>Homes We've Transformed</h2>
            <div className="gold-divider center" />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }} className="three-col">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="testi-card">
                  <div style={{ display: "flex", gap: "3px", marginBottom: "20px" }}>
                    {Array(t.stars).fill(0).map((_, j) => <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill={G}><polygon points="7,1 8.8,5.5 13.5,5.5 9.8,8.5 11.2,13 7,10.2 2.8,13 4.2,8.5 0.5,5.5 5.2,5.5" /></svg>)}
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.85, marginBottom: "28px", fontStyle: "italic" }}>"{t.text}"</p>
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
                    <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--ink)" }}>{t.name}</div>
                    <div style={{ fontSize: "0.72rem", color: G, letterSpacing: "0.08em", marginTop: "4px" }}>{t.location}</div>
                    <div style={{ display: "inline-block", marginTop: "8px", padding: "4px 10px", background: "var(--gold-pale)", border: "1px solid #E5C87A", fontSize: "0.64rem", color: G, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t.project}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 52px", background: "var(--off-white)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "80px", alignItems: "start" }} className="two-col">
          <Reveal>
            <span className="section-label">Start Your Project</span>
            <h2 className="section-title" style={{ marginTop: "12px", marginBottom: "16px" }}>Let's Build<br /><em style={{ color: G }}>Your Dream Home</em></h2>
            <div className="gold-divider" />
            <p style={{ color: "var(--muted)", lineHeight: 1.9, fontSize: "0.94rem", marginBottom: "40px" }}>
              Book your free 60-minute design consultation. Our senior designer will visit your home, study your space, and show you what's possible — completely free, zero obligation.
            </p>
            {[
              { label: "Studio", val: "Jubilee Hills, Hyderabad — 500033" },
              { label: "Phone", val: "+91 98765 43210" },
              { label: "Email", val: "hello@markvibe.in" },
              { label: "Hours", val: "Mon–Sat · 9:00 AM – 7:00 PM" },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", gap: "18px", marginBottom: "18px", alignItems: "flex-start" }}>
                <div style={{ width: "2px", height: "36px", background: G, flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: G, textTransform: "uppercase", marginBottom: "3px" }}>{c.label}</div>
                  <div style={{ fontSize: "0.88rem", color: "var(--ink-2)" }}>{c.val}</div>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ background: "var(--white)", padding: "48px 40px", border: "1.5px solid var(--border)" }}>
              <h3 className="serif" style={{ fontSize: "1.5rem", marginBottom: "28px", color: "var(--ink)" }}>Book a Free Consultation</h3>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "48px 20px" }}>
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ margin: "0 auto 20px", display: "block" }}>
                      <circle cx="26" cy="26" r="24" stroke={G} strokeWidth="1.5" />
                      <path d="M16 26l8 8 12-14" stroke={G} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h4 className="serif" style={{ fontSize: "1.6rem", marginBottom: "10px" }}>Request Received!</h4>
                    <p style={{ color: "var(--muted)", fontSize: "0.88rem" }}>Our team will call you within 2 working hours to confirm your consultation slot.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <input className="form-input" placeholder="Full Name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required />
                    <input className="form-input" placeholder="Mobile Number" value={formData.mobile} onChange={e => setFormData(p => ({ ...p, mobile: e.target.value }))} required />
                    <input className="form-input" type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} required />
                    <select className="form-input">
                      <option value="">Select Project Type</option>
                      {["1 BHK Full Home", "2 BHK Full Home", "3 BHK Full Home", "Villa / Independent House", "Modular Kitchen Only", "Wardrobe Only", "Office / Commercial"].map(o => <option key={o}>{o}</option>)}
                    </select>
                    <textarea className="form-input" placeholder="Tell us about your space, timeline, and any specific requirements…" value={formData.msg} onChange={e => setFormData(p => ({ ...p, msg: e.target.value }))} />
                    <button type="submit" className="btn-gold" style={{ width: "100%", padding: "17px", marginTop: "4px" }}>Book Free Consultation →</button>
                    <p style={{ fontSize: "0.72rem", color: "var(--muted)", textAlign: "center", marginTop: "4px" }}>No commitment required · Response within 2 hours</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "var(--ink)", padding: "72px 52px 32px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr", gap: "60px", marginBottom: "56px" }} className="two-col">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none"><polygon points="14,2 26,9 26,26 2,26 2,9" stroke={G} strokeWidth="1.8" fill="none" /><line x1="14" y1="26" x2="14" y2="16" stroke={G} strokeWidth="1.8" /></svg>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontWeight: 700, letterSpacing: "0.08em" }}>MARKVIBE</div>
                  <div style={{ fontSize: "0.5rem", letterSpacing: "0.28em", color: G, textTransform: "uppercase" }}>INTERIORS</div>
                </div>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#6E685E", lineHeight: 1.85, maxWidth: "300px", marginBottom: "24px" }}>Hyderabad's most trusted interior design studio since 2012. Fixed pricing. Factory quality. Delivered on time — or we pay you.</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {["Instagram", "Houzz", "Pinterest", "YouTube"].map(s => (
                  <button key={s} style={{ fontSize: "0.64rem", color: "#6E685E", background: "#1E1B18", border: "none", padding: "7px 12px", cursor: "pointer", letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = G} onMouseLeave={e => e.target.style.color = "#6E685E"}>{s}</button>
                ))}
              </div>
            </div>
            {[
              { title: "Services", links: ["Modular Kitchen", "Wardrobes & Storage", "Living Room Design", "Bedroom Interiors", "False Ceiling & Lighting", "Wallpaper & Paint"] },
              { title: "Company", links: ["About Us", "Our Process", "Portfolio", "Careers", "Blog", "Press"] },
              { title: "Support", links: ["Get a Quote", "Book Consultation", "Service Request", "EMI Calculator", "FAQ", "Privacy Policy"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: G, marginBottom: "20px" }}>{col.title}</div>
                {col.links.map(l => <button key={l} className="footer-link">{l}</button>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #2A2520", paddingTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ fontSize: "0.74rem", color: "#4A4540" }}>© 2026 MARKVIBE INTERIORS. All rights reserved.</div>
            <div style={{ display: "flex", gap: "20px" }}>
              {["Terms", "Privacy", "Warranty Policy"].map(l => <button key={l} className="footer-link" style={{ fontSize: "0.7rem" }}>{l}</button>)}
            </div>
          </div>
        </div>
      </footer>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => e.target === e.currentTarget && resetModal()}>
            <motion.div className="modal-box" initial={{ opacity: 0, y: 32, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 28 }}>
              <button onClick={resetModal} style={{ position: "absolute", top: "18px", right: "22px", background: "none", border: "none", fontSize: "1.3rem", cursor: "pointer", color: "var(--muted)", lineHeight: 1 }}>×</button>
              {/* Progress */}
              <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "40px" }}>
                {[1, 2, 3].map(n => (
                  <div key={n} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0, background: n <= modalStep ? "var(--ink)" : "var(--off-white)", color: n <= modalStep ? "#fff" : "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 600, border: `1.5px solid ${n <= modalStep ? "var(--ink)" : "var(--border)"}`, transition: "all 0.3s" }}>
                      {n < modalStep ? "✓" : n}
                    </div>
                    {n < 3 && <div style={{ flex: 1, height: "1.5px", background: n < modalStep ? G : "var(--border)", transition: "background 0.3s" }} />}
                  </div>
                ))}
              </div>
              {modalStep === 1 && (
                <>
                  <span className="section-label">Step 1 of 3</span>
                  <h3 className="serif" style={{ fontSize: "1.7rem", color: "var(--ink)", margin: "10px 0 8px" }}>What type of home?</h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "28px" }}>Helps us assign the right designer and estimate your project scope.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "28px" }}>
                    {["1 BHK", "2 BHK", "3 BHK", "3+ BHK", "Villa / Duplex", "Office / Commercial"].map(b => (
                      <div key={b} className={`bhk-btn ${selectedBHK === b ? "sel" : ""}`} onClick={() => setSelectedBHK(b)}>
                        {selectedBHK === b ? "✓ " : ""}{b}
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary" style={{ width: "100%", padding: "16px", opacity: selectedBHK ? 1 : 0.35 }} disabled={!selectedBHK} onClick={() => setModalStep(2)}>Continue →</button>
                </>
              )}
              {modalStep === 2 && (
                <>
                  <span className="section-label">Step 2 of 3</span>
                  <h3 className="serif" style={{ fontSize: "1.7rem", color: "var(--ink)", margin: "10px 0 4px" }}>What's your budget?</h3>
                  <p style={{ color: G, fontSize: "0.82rem", marginBottom: "24px" }}>For your {selectedBHK}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                    {["Under ₹5 Lakhs", "₹5 – ₹10 Lakhs", "₹10 – ₹20 Lakhs", "₹20 – ₹40 Lakhs", "₹40 Lakhs+", "Not decided yet"].map(b => (
                      <div key={b} className={`bhk-btn ${selectedBudget === b ? "sel" : ""}`} style={{ textAlign: "left", padding: "16px 20px" }} onClick={() => { setSelectedBudget(b); setTimeout(() => setModalStep(3), 280); }}>
                        {selectedBudget === b ? "✓  " : ""}{b}
                      </div>
                    ))}
                  </div>
                  <button className="btn-outline" style={{ width: "100%", padding: "12px" }} onClick={() => setModalStep(1)}>← Back</button>
                </>
              )}
              {modalStep === 3 && (
                <>
                  <span className="section-label">Step 3 of 3</span>
                  <h3 className="serif" style={{ fontSize: "1.7rem", color: "var(--ink)", margin: "10px 0 6px" }}>Your contact details</h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.83rem", marginBottom: "24px" }}>We'll call you within 2 hours to schedule a free home visit.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
                    <input className="form-input" placeholder="Full Name" />
                    <input className="form-input" placeholder="Mobile Number" />
                    <input className="form-input" placeholder="Email Address" />
                    <input className="form-input" placeholder="Your Location / Area in Hyderabad" />
                  </div>
                  <div style={{ background: "var(--gold-pale)", border: "1px solid #E5C87A", padding: "14px 16px", marginBottom: "18px" }}>
                    <p style={{ fontSize: "0.78rem", color: G, lineHeight: 1.6 }}><strong>{selectedBHK}</strong> · Budget: <strong>{selectedBudget}</strong></p>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "4px" }}>A senior designer will visit your home · 60 min · Free · No obligation</p>
                  </div>
                  <button className="btn-gold" style={{ width: "100%", padding: "17px" }} onClick={resetModal}>Book My Free Home Visit →</button>
                  <button className="btn-outline" style={{ width: "100%", padding: "12px", marginTop: "10px" }} onClick={() => setModalStep(2)}>← Back</button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}