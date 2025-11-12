"use client"

import { Header } from "@/components/header"
import { Decryption } from "@/components/rsa/decryption"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function DecryptPage() {
  const [keys, setKeys] = useState(null)
  const [encrypted, setEncrypted] = useState("")
  const [message, setMessage] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Message Decryption
              </span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">Decrypt your ciphertext using your private key.</p>
          </div>

          {!keys && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="neon-border rounded-lg p-6 mb-8 text-center"
            >
              <p className="text-slate-300 mb-4">You need your private key to decrypt messages.</p>
              <Link href="/make-key">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all"
                >
                  Generate Keys
                </motion.button>
              </Link>
            </motion.div>
          )}

          <div className="mb-6">
            <details className="neon-border rounded-lg p-4">
              <summary className="cursor-pointer text-blue-400 font-semibold">Paste Keys (Required)</summary>
              <div className="mt-4 space-y-4">
                <textarea
                  placeholder='Paste your keys as JSON: {"e": 17, "n": 3233, "d": 2753}'
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value)
                      setKeys(parsed)
                    } catch {}
                  }}
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-mono text-sm"
                  rows={3}
                />
              </div>
            </details>
          </div>

          {keys && (
            <Decryption isPlaying={isPlaying} speed={speed} keys={keys} encrypted={encrypted} message={message} />
          )}
        </div>
      </main>
    </>
  )
}
