"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Animation configs
const containerVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
    },
  },
};

export default function Home() {
  const [result, setResult] = useState("");

  useEffect(() => {
    // Safe to use window or Date.now() here
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("access_key", "d32cb796-88cd-4e45-b5c1-f129688b64c8");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setResult("✅ Submitted Successfully");
        (event.target as HTMLFormElement).reset();
      } else {
        setResult(data.message || "Submission failed.");
      }
    } catch {
      setResult("⚠️ Network error, try again.");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-gray-900 via-purple-900 to-black"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="grid md:grid-cols-2 gap-12 max-w-6xl w-full items-center"
        variants={containerVariants}
      >
        {/* Left Side */}
        <motion.div variants={itemVariants} className="space-y-6 text-center md:text-left">
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 drop-shadow"
          >
            Petrobarr
          </motion.h1>

          {/* Blinking "This domain on Sale" */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="inline-block mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-white font-bold text-lg shadow-lg border-2 border-yellow-300"
          >
            This domain on Sale
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 leading-relaxed"
          >
            Empowering Oil & Gas, Petrochemical, Chemical, and Power industries
            with premium process equipment, NDT services, and seamless solutions.
          </motion.p>

          {/* Features */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 text-base font-semibold"
          >
            {[
              { icon: "🚀", text: "Fast Transfer" },
              { icon: "🔒", text: "SSL Protection" },
              { icon: "📑", text: "Easy Ownership" },
              { icon: "📧", text: "Pro Email" },
            ].map((item) => (
              <motion.div
                key={item.text}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-white/10 rounded-xl px-4 py-3 shadow-sm border border-purple-400 text-gray-100"
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Form */}
        <motion.div
          variants={itemVariants}
          className="bg-white/90 backdrop-blur-xl border border-purple-200 rounded-3xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-purple-700 mb-2">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Interested in this domain? Fill out the form and we’ll respond shortly.
          </p>

          <motion.form
            onSubmit={onSubmit}
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {["name", "email", "phone", "amount"].map((field) => {
              if (field === "amount") {
                return (
                  <motion.div key={field} className="relative group" variants={itemVariants}>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2 z-10 pointer-events-none">
                      <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-purple-100 text-purple-600 font-bold text-lg shadow-sm">
                        $
                      </div>
                    </div>
                    <motion.input
                      type="number"
                      name={field}
                      placeholder="Amount"
                      className="w-full p-3 pl-14 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400 outline-none bg-white/95 placeholder-purple-400 text-gray-800 transition-all"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                );
              }

              return (
                <motion.input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={
                    field === "name"
                      ? "Your Name"
                      : field === "email"
                        ? "Your Email"
                        : field === "phone"
                          ? "Mobile Number"
                          : "Enter amount in USD"
                  }
                  required={field === "name" || field === "email"}
                  className="w-full p-3 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400 outline-none bg-white/95 placeholder-purple-400 text-gray-800 transition-all"
                  variants={itemVariants}
                  whileFocus={{ scale: 1.02 }}
                />
              );
            })}

            <motion.textarea
              name="message"
              placeholder="Message"
              rows={4}
              className="w-full p-3 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400 outline-none bg-white/95 placeholder-purple-400 text-gray-800"
              variants={itemVariants}
              whileFocus={{ scale: 1.02 }}
            />

            <motion.button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 shadow-lg hover:opacity-90 transition"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              Send
            </motion.button>
          </motion.form>

          {result && (
            <motion.p
              className="mt-4 text-center text-purple-700 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {result}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
