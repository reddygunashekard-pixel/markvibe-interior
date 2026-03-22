import React, { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [active, setActive] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const steps = [
    {
      title: "Meet Your Designer",
      desc: "Share your ideas, lifestyle needs, and floor plan with our expert designer.\nGet personalized guidance and initial design concepts tailored to your space.",
      img: "/images/meet.jpeg",
    },
    {
      title: "Book Your Order",
      desc: "Confirm your project by making a small booking amount.\nThis helps us kickstart your design journey and allocate a dedicated team.",
      img: "/images/quote.jpeg",
    },
    {
      title: "Finalize Design",
      desc: "Select materials, finishes, colors, and finalize your 3D designs.\nWe ensure everything matches your vision before moving to execution.",
      img: "/images/3d2.jpeg",
    },
    {
      title: "Production",
      desc: "Your designs move into factory production with precision manufacturing.\nWe ensure high-quality materials and strict quality checks.",
      img: "/images/meet2.jpeg",
    },
    {
      title: "Dispatch",
      desc: "All materials and products are safely packed and dispatched.\nWe coordinate logistics to ensure timely delivery to your location.",
      img: "/images/container.jpeg",
    },
    {
      title: "Installation",
      desc: "Our professional team installs everything at your site seamlessly.\nFinal quality checks are done before handing over your dream home.",
      img: "/images/sttol.jpeg",
    },
  ];

  return (
    <div className="font-sans bg-gray-50 text-gray-800">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full backdrop-blur-md bg-black/40 text-white flex justify-between px-8 py-4 z-50 border-b border-white/10">
        <h1 className="font-bold text-xl tracking-wide">
          MARKVIBE INTERIORS
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-500/90 hover:bg-yellow-400 transition px-5 py-2 rounded-lg text-black font-semibold shadow-lg hover:scale-105"
        >
          Get Quote
        </button>
      </nav>

      {/* HERO */}
      <section
        className="h-screen flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/images/2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/60 p-10 rounded-xl backdrop-blur-sm">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-4"
          >
            Transform Your Space with Style
          </motion.h1>

          <p className="mb-6 text-lg">
            Premium interiors starting at ₹750/sq.ft
          </p>

          <button
            onClick={() =>
              document.getElementById("contact").scrollIntoView({
                behavior: "smooth",
              })
            }
            className="mt-6 bg-yellow-500 px-6 py-3 rounded-lg text-black font-semibold hover:bg-yellow-400 transition"
          >
            Get Free Quote
          </button>
        </div>
      </section>

  {/* ABOUT */}
      <section className="py-24 bg-white text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >

          {/* TITLE */}
          <h2 className="text-4xl font-bold mb-6">
            About{" "}
            <span className="text-yellow-500">
              MARKVIBE INTERIORS
            </span>
          </h2>

          {/* SUB HEADING */}
          <p className="text-gray-500 mb-10 text-lg">
            Designing spaces that feel like home, not just look like one.
          </p>

          {/* CONTENT */}
          <p className="text-gray-600 leading-8 text-[16px]">
            At{" "}
            <span className="font-semibold text-black">
              MARKVIBE INTERIORS
            </span>, we believe your space should feel like <span className="italic">you</span>.
            It’s not just about good-looking designs — it’s about creating a place
            where you feel comfortable, proud, and truly at home.

            <br /><br />

            Whether you’re designing your dream home, upgrading your apartment, or
            setting up a workspace, our team works closely with you to understand
            what you need and what you love. Every design we create is tailored
            to match your lifestyle, taste, and budget.

            <br /><br />

            We take care of everything from start to finish — planning, designing,
            selecting materials, and execution — so you don’t have to worry about
            the details. Our goal is to make the entire process smooth, transparent,
            and stress-free.

            <br /><br />

            With quality materials, honest pricing, and a strong focus on timely delivery,
            we make sure you get a space that not only looks great but also lasts long.

            <br /><br />

            At the end of the day, we’re here to turn your ideas into a space you’ll love
            walking into every single day.
          </p>

          {/* HIGHLIGHTS */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-medium">
            <span className="bg-gray-100 px-4 py-2 rounded-full">
              ✔ Customized Designs
            </span>
            <span className="bg-gray-100 px-4 py-2 rounded-full">
              ✔ On-Time Delivery
            </span>
            <span className="bg-gray-100 px-4 py-2 rounded-full">
              ✔ Premium Materials
            </span>
            <span className="bg-gray-100 px-4 py-2 rounded-full">
              ✔ Transparent Pricing
            </span>
          </div>

        </motion.div>
      </section>

      {/* PRICING */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white text-center">
        <h2 className="text-3xl font-bold mb-12">
          Our Pricing Plans
        </h2>

        <div className="grid md:grid-cols-3 gap-10 px-6 md:px-20">

          {/* BASIC */}
          <motion.div
            whileHover={{ y: -10, scale: 1.03 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition border"
          >
            <div className="flex justify-center mb-4">
              {/* ICON */}
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                <path d="M4 10h16v10H4z" stroke="black" strokeWidth="2" />
                <path d="M2 6h20" stroke="black" strokeWidth="2" />
              </svg>
            </div>

            <h3 className="text-xl font-bold mb-2">Basic</h3>
            <p className="text-3xl font-bold text-gray-800 mb-4">
              ₹750 <span className="text-sm">/ sq.ft</span>
            </p>

            <ul className="text-gray-500 text-sm space-y-2 mb-6">
              <li>✔ Standard Materials</li>
              <li>✔ Basic Designs</li>
              <li>✔ Budget Friendly</li>
            </ul>


          </motion.div>

          {/* PREMIUM (HIGHLIGHT) */}
          <motion.div
            whileHover={{ y: -10, scale: 1.05 }}
            className="bg-black text-white p-8 rounded-2xl shadow-xl border-2 border-yellow-400 relative"
          >
            <span className="absolute top-0 right-0 bg-yellow-400 text-black text-xs px-3 py-1 rounded-bl-lg">
              Most Popular
            </span>

            <div className="flex justify-center mb-4">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l4 8H8l4-8z" stroke="white" strokeWidth="2" />
                <rect x="4" y="10" width="16" height="10" stroke="white" strokeWidth="2" />
              </svg>
            </div>

            <h3 className="text-xl font-bold mb-2">Premium</h3>
            <p className="text-3xl font-bold mb-4 text-yellow-400">
              ₹1200 <span className="text-sm text-white">/ sq.ft</span>
            </p>

            <ul className="text-gray-300 text-sm space-y-2 mb-6">
              <li>✔ Premium Materials</li>
              <li>✔ Modern Designs</li>
              <li>✔ Faster Delivery</li>
            </ul>


          </motion.div>

          {/* LUXURY */}
          <motion.div
            whileHover={{ y: -10, scale: 1.03 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition border"
          >
            <div className="flex justify-center mb-4">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" stroke="black" strokeWidth="2" />
                <path d="M8 12l2 2 4-4" stroke="black" strokeWidth="2" />
              </svg>
            </div>

            <h3 className="text-xl font-bold mb-2">Luxury</h3>
            <p className="text-3xl font-bold text-gray-800 mb-4">
              ₹2000+ <span className="text-sm">/ sq.ft</span>
            </p>

            <ul className="text-gray-500 text-sm space-y-2 mb-6">
              <li>✔ High-End Materials</li>
              <li>✔ Custom Luxury Designs</li>
              <li>✔ Priority Execution</li>
            </ul>


          </motion.div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-12">
          Why Choose MARKVIBE INTERIORS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 px-10">
          {[
            { icon: "guarantee", text: "10 Year Warranty" },
            { icon: "calculator", text: "Easy EMI Options" },
            { icon: "user", text: "Expert Designers" },
            { icon: "rupee", text: "No Hidden Cost" },
            { icon: "teamwork", text: "600+ Designers" },
            { icon: "home", text: "1000+ Projects" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <img
                src={`https://img.icons8.com/ios-filled/100/000000/${item.icon}.png`}
                className="w-14 mb-3"
              />
              <p className="font-semibold">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DESIGN SESSION */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-12">
          What is a Design Session?
        </h2>

        <div className="grid md:grid-cols-4 gap-10 px-10">
          {[
            { img: "/images/meet.jpeg", title: "Meet Your Designer" },
            { img: "/images/meet2.jpeg", title: "Discuss Requirements" },
            { img: "/images/3d.jpeg", title: "Get 3D Designs" },
            { img: "/images/quote.jpeg", title: "Get Instant Quote" },
          ].map((step, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }}>
              <img
                src={step.img}
                className="mx-auto h-40 mb-4 rounded-lg shadow-md"
              />
              <p className="font-semibold">{step.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}

      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-12">
          From Design to Move-In
        </h2>

        {/* STEPS */}
        <div className="flex justify-center mb-10">
          {steps.map((_, i) => (
            <div key={i} className="flex items-center">
              <div
                onClick={() => setActive(i)}
                className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer font-bold transition
          ${active === i ? "bg-red-500 text-white scale-110" : "bg-gray-300 text-gray-700"}`}
              >
                {i + 1}
              </div>

              {i !== steps.length - 1 && (
                <div className="w-10 h-[2px] bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div className="relative flex items-center justify-center max-w-5xl mx-auto gap-10 px-6">

          {/* LEFT ARROW */}
          <button
            onClick={() =>
              setActive((prev) =>
                prev === 0 ? steps.length - 1 : prev - 1
              )
            }
            className="absolute left-0 text-3xl bg-gray-100 hover:bg-gray-200 p-3 rounded-full shadow transition"
          >
            {"<"}
          </button>

          {/* TEXT */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-left max-w-md"
          >
            <h3 className="text-2xl font-bold mb-3">
              {steps[active].title}
            </h3>

            <p className="text-gray-600 whitespace-pre-line leading-7">
              {steps[active].desc}
            </p>
          </motion.div>

          {/* IMAGE */}
          <motion.img
            key={steps[active].img}
            src={steps[active].img}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="h-56 rounded-xl shadow-md object-cover"
          />

          {/* RIGHT ARROW */}
          <button
            onClick={() =>
              setActive((prev) =>
                prev === steps.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-0 text-3xl bg-gray-100 hover:bg-gray-200 p-3 rounded-full shadow transition"
          >
            {">"}
          </button>

        </div>
      </section>

      {/* END TO END */}
      {/* END TO END INTERIOR SOLUTIONS */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white text-center">
        <h2 className="text-3xl font-bold mb-12">
          End-to-End Interior Solutions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 px-10">

          {[
            {
              name: "Modular Kitchen",
              icon: (
                <svg viewBox="0 0 64 64" className="w-12 h-12">
                  <rect x="5" y="30" width="54" height="20" stroke="#666" strokeWidth="2" />
                  <rect x="10" y="35" width="10" height="10" stroke="#666" strokeWidth="2" />
                  <rect x="25" y="35" width="10" height="10" stroke="#666" strokeWidth="2" />
                  <rect x="40" y="35" width="10" height="10" stroke="#666" strokeWidth="2" />
                  <line x1="32" y1="10" x2="32" y2="30" stroke="#e11d48" strokeWidth="2" />
                </svg>
              ),
            },
            {
              name: "Storage & Wardrobe",
              icon: (
                <svg viewBox="0 0 64 64" className="w-12 h-12">
                  <rect x="10" y="10" width="44" height="44" stroke="#666" strokeWidth="2" />
                  <line x1="32" y1="10" x2="32" y2="54" stroke="#666" strokeWidth="2" />
                  <circle cx="28" cy="32" r="2" fill="#e11d48" />
                </svg>
              ),
            },
            {
              name: "Crockery Units",
              icon: (
                <svg viewBox="0 0 64 64" className="w-12 h-12">
                  <rect x="10" y="10" width="44" height="20" stroke="#666" strokeWidth="2" />
                  <rect x="10" y="30" width="44" height="24" stroke="#666" strokeWidth="2" />
                  <circle cx="32" cy="42" r="2" fill="#e11d48" />
                </svg>
              ),
            },
            {
              name: "Space Saving Furniture",
              icon: (
                <svg viewBox="0 0 64 64" className="w-12 h-12">
                  <rect x="15" y="30" width="34" height="10" stroke="#666" strokeWidth="2" />
                  <line x1="20" y1="30" x2="20" y2="45" stroke="#666" strokeWidth="2" />
                  <line x1="44" y1="30" x2="44" y2="45" stroke="#666" strokeWidth="2" />
                  <rect x="25" y="25" width="14" height="5" fill="#e11d48" />
                </svg>
              ),
            },
            {
              name: "TV Units",
              icon: (
                <svg viewBox="0 0 64 64" className="w-12 h-12">
                  <rect x="10" y="15" width="44" height="25" stroke="#666" strokeWidth="2" />
                  <rect x="20" y="45" width="24" height="5" fill="#666" />
                  <circle cx="32" cy="28" r="2" fill="#e11d48" />
                </svg>
              ),
            },
            {
              name: "Study Tables",
              icon: (
                <svg viewBox="0 0 64 64" className="w-12 h-12">
                  <rect x="15" y="30" width="30" height="10" stroke="#666" strokeWidth="2" />
                  <line x1="20" y1="40" x2="20" y2="50" stroke="#666" strokeWidth="2" />
                  <line x1="40" y1="40" x2="40" y2="50" stroke="#666" strokeWidth="2" />
                  <circle cx="30" cy="35" r="2" fill="#e11d48" />
                </svg>
              ),
            },
            {
              name: "False Ceiling",
              icon: (
                <svg viewBox="0 0 64 64" className="w-12 h-12">
                  <rect x="10" y="20" width="44" height="10" stroke="#666" strokeWidth="2" />
                  <line x1="32" y1="20" x2="32" y2="30" stroke="#e11d48" strokeWidth="2" />
                </svg>
              ),
            },
            {
              name: "Lights",
              icon: (
                <svg viewBox="0 0 64 64" className="w-12 h-12">
                  <circle cx="32" cy="25" r="10" stroke="#666" strokeWidth="2" />
                  <rect x="28" y="35" width="8" height="8" fill="#e11d48" />
                </svg>
              ),
            },
            {
              name: "Wallpaper",
              icon: (
                <svg viewBox="0 0 64 64" className="w-12 h-12">
                  <rect x="15" y="10" width="30" height="44" stroke="#666" strokeWidth="2" />
                  <circle cx="30" cy="30" r="2" fill="#e11d48" />
                </svg>
              ),
            },
            {
              name: "Wall Paint",
              icon: (
                <svg viewBox="0 0 64 64" className="w-12 h-12">
                  <rect x="20" y="20" width="20" height="20" stroke="#666" strokeWidth="2" />
                  <path d="M30 20 L30 10" stroke="#e11d48" strokeWidth="2" />
                </svg>
              ),
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>

              <p className="font-semibold text-gray-700 group-hover:text-red-500 transition">
                {item.name}
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">
          Get Your Free Consultation
        </h2>

        <form className="max-w-xl mx-auto space-y-4">
          <input className="w-full border p-3 rounded" placeholder="Name" />
          <input className="w-full border p-3 rounded" placeholder="Mobile" />
          <input className="w-full border p-3 rounded" placeholder="Email" />
          <textarea className="w-full border p-3 rounded" placeholder="Message" />

          <button className="bg-black text-white px-6 py-3 rounded w-full">
            Submit
          </button>
        </form>
      </section>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-2xl relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-xl"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4 text-center">
              Get Quote
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {["1 BHK", "2 BHK", "3 BHK", "3+ BHK"].map((item, i) => (
                <button
                  key={i}
                  className="border border-red-400 px-4 py-2 rounded hover:bg-red-50"
                >
                  {item}
                </button>
              ))}
            </div>

            <button className="mt-6 w-full bg-black text-white py-3 rounded">
              Next
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-black text-white text-center p-6">
        © 2026 MARKVIBE INTERIORS
      </footer>

    </div>
  );
}

export default App;