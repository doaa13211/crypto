"use client"
import { motion } from "framer-motion"

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-cyan-500/20 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-bold text-center cyber-text-glow mb-2"
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            RSA Algorithm Visualization
          </span>
        </motion.h1>
        <p className="text-center text-slate-400 text-lg">
          Interactive cryptography education tool — understand how RSA encryption protects data
        </p>
      </div>
    </motion.div>
  )
}
