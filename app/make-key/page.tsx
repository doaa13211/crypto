"use client"

import { Header } from "@/components/header"
import KeyGeneration from "@/components/rsa/key-generation"
import { useState } from "react"
import { motion } from "framer-motion"

export default function MakeKeyPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [keys, setKeys] = useState(null)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <motion.div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Title */}
          <motion.div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold cyber-text-glow mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                Generate RSA Keys
              </span>
            </h1>
            <p className="text-lg text-slate-300">Learn how RSA key generation works step by step</p>
          </motion.div>

          {/* Controls */}
          <div className="neon-border rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  isPlaying
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isPlaying ? "⏸ Pause" : "▶ Play"}
              </motion.button>

              <div className="flex items-center gap-3">
                <label className="text-blue-400 font-semibold">Speed:</label>
                <input
                  type="range"
                  min="0.25"
                  max="2"
                  step="0.25"
                  value={speed}
                  onChange={(e) => setSpeed(Number.parseFloat(e.target.value))}
                  className="w-32 accent-purple-500"
                />
                <span className="text-blue-300 font-mono">{speed.toFixed(2)}x</span>
              </div>
            </div>
          </div>

          {/* Key Generation Component */}
          <KeyGeneration isPlaying={isPlaying} speed={speed} onKeysGenerated={setKeys} keys={keys} />
        </motion.div>
      </main>
    </>
  )
}
