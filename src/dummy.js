import React, { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [active, setActive] = useState(0);

  // MODAL STATES
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedBHK, setSelectedBHK] = useState("");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    location: "",
  });

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  // OTP FUNCTIONS
  const handleSendOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    setStep(3);
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setStep(4);
    } else {
      alert("Invalid OTP ❌");
    }
  };

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
      <nav className="fixed top-0 w-full backdrop-blur-md bg-black/40 text-white flex justify-between px-8 py-4 z-50">
        <h1 className="font-bold text-xl">MARKVIBE INTERIORS</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-500 px-5 py-2 rounded text-black font-semibold"
        >
          Get Quote
        </button>
      </nav>

      {/* HERO */}
      <section
        className="h-screen flex items-center justify-center text-white text-center"
        style={{
          backgroundImage: "url('/images/2.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-black/60 p-10 rounded-xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4"
          >
            Transform Your Space with Style
          </motion.h1>

          <button
            onClick={() =>
              document.getElementById("contact").scrollIntoView({
                behavior: "smooth",
              })
            }
            className="mt-6 bg-yellow-500 px-6 py-3 rounded text-black"
          >
            Get Free Quote
          </button>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 text-center bg-white">
        <h2 className="text-3xl font-bold mb-10">
          From Design to Move-In
        </h2>

        <div className="flex justify-center mb-10">
          {steps.map((_, i) => (
            <div key={i} className="flex items-center">
              <div
                onClick={() => setActive(i)}
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
                ${active === i ? "bg-red-500 text-white" : "bg-gray-300"}`}
              >
                {i + 1}
              </div>

              {i !== steps.length - 1 && (
                <div className="w-10 h-[2px] bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>

        <div className="relative flex justify-center items-center gap-10">

          {/* LEFT */}
          <button
            onClick={() =>
              setActive(prev => prev === 0 ? steps.length - 1 : prev - 1)
            }
            className="absolute left-10 text-3xl"
          >
            {"<"}
          </button>

          <motion.div key={active}>
            <h3 className="text-xl font-bold">
              {steps[active].title}
            </h3>
            <p className="text-gray-600 whitespace-pre-line">
              {steps[active].desc}
            </p>
          </motion.div>

          <img src={steps[active].img} className="h-48 rounded" />

          {/* RIGHT */}
          <button
            onClick={() =>
              setActive(prev => prev === steps.length - 1 ? 0 : prev + 1)
            }
            className="absolute right-10 text-3xl"
          >
            {">"}
          </button>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <h3 className="text-lg font-bold mb-4 text-center">
                  Select BHK
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {["1 BHK", "2 BHK", "3 BHK", "3+ BHK"].map(item => (
                    <button
                      key={item}
                      onClick={() => setSelectedBHK(item)}
                      className={`border p-2 rounded
                      ${selectedBHK === item ? "bg-red-500 text-white" : ""}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <button
                  disabled={!selectedBHK}
                  onClick={() => setStep(2)}
                  className="mt-4 w-full bg-black text-white py-2 rounded"
                >
                  Next
                </button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <input
                  placeholder="Name"
                  className="w-full border p-2 mb-3"
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <input
                  placeholder="Mobile"
                  className="w-full border p-2 mb-3"
                  onChange={e => setForm({ ...form, mobile: e.target.value })}
                />
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-yellow-500 py-2 rounded"
                >
                  Send OTP
                </button>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <p className="text-center mb-2">OTP: {generatedOtp}</p>
                <input
                  className="w-full border p-2"
                  onChange={e => setOtp(e.target.value)}
                />
                <button
                  onClick={handleVerifyOtp}
                  className="mt-3 w-full bg-black text-white py-2"
                >
                  Verify
                </button>
              </>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="text-center">
                <h3 className="text-green-600 font-bold">
                  Success ✅
                </h3>
                <p>We will contact you soon</p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default App;