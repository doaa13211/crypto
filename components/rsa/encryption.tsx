"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { modPow } from "@/lib/rsa-utils"

interface EncryptionProps {
  isPlaying: boolean
  speed: number
  keys: any
  message: string
  setMessage: (msg: string) => void
  encrypted: string
  setEncrypted: (enc: string) => void
}

interface MessageStep {
  char: string
  ascii: number
  encrypted: number
}

export function Encryption({ isPlaying, speed, keys, message, setMessage, encrypted, setEncrypted }: EncryptionProps) {
  const [messageSteps, setMessageSteps] = useState<MessageStep[]>([])
  const [currentCharIndex, setCurrentCharIndex] = useState(-1)
  const [animationPhase, setAnimationPhase] = useState(0)

  const encryptAndShowSteps = (msg: string, e: number, n: number) => {
    if (!msg) {
      setMessageSteps([])
      setEncrypted("")
      return
    }

    const steps: MessageStep[] = msg.split("").map((char) => ({
      char,
      ascii: char.charCodeAt(0),
      encrypted: modPow(char.charCodeAt(0), e, n),
    }))

    setMessageSteps(steps)
    setEncrypted(steps.map((s) => s.encrypted).join(","))
  }

  useEffect(() => {
    if (!isPlaying || !keys || !message) {
      setCurrentCharIndex(-1)
      setAnimationPhase(0)
      return
    }

    const duration = 1000 / speed

    const timeouts = message.split("").map((_, i) => {
      return setTimeout(
        () => {
          setCurrentCharIndex(i)
          setAnimationPhase(Math.floor((i % 3) + 1))
        },
        duration * (i + 1),
      )
    })

    return () => timeouts.forEach(clearTimeout)
  }, [isPlaying, speed, keys, message])

  useEffect(() => {
    if (keys && message) {
      encryptAndShowSteps(message, keys.e, keys.n)
    }
  }, [keys, message])

  if (!keys) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neon-border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Encryption Process</h2>
        <p className="text-slate-300">Please generate keys first in the Key Generation step.</p>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="neon-border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Step 2: Encryption Process</h2>
        <p className="text-slate-300">Transform plaintext into ciphertext using the public key (e, n)</p>
      </div>

      <div className="neon-border rounded-lg p-6">
        <label className="block text-sm font-semibold text-cyan-400 mb-2">Enter Message (Plaintext)</label>
        <textarea
          value={message}
          onChange={(e) => {
            const truncated = e.target.value.substring(0, 256)
            setMessage(truncated)
            setCurrentCharIndex(-1)
          }}
          placeholder="Type a message to encrypt (up to 256 characters)..."
          maxLength={256}
          rows={3}
          className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 font-mono text-sm"
        />
        <div className="flex justify-between text-sm text-slate-400 mt-2">
          <span>Character count: {message.length} / 256</span>
          <span className={256 - message.length < 50 ? "text-yellow-400" : ""}>{256 - message.length} remaining</span>
        </div>
      </div>

      {message && (
        <>
          <div className="formula-box rounded-lg p-6">
            <p className="text-sm text-slate-400 mb-3">RSA Encryption Formula</p>
            <p className="text-xl text-cyan-400 font-mono">C ≡ M^e (mod n)</p>
          </div>

          <div className="neon-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">Encryption Animation:</h3>
            <div className="space-y-3">
              {messageSteps.map((step, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 flex-wrap"
                  animate={{
                    opacity: currentCharIndex >= i ? 1 : 0.5,
                  }}
                >
                  <div
                    className={`px-4 py-2 rounded-lg bg-slate-800 text-cyan-400 font-bold text-lg border-2 border-cyan-500/30 ${
                      currentCharIndex === i ? "ring-2 ring-cyan-500 scale-110" : ""
                    }`}
                  >
                    "{step.char}"
                  </div>
                  <span className="text-slate-400">→</span>
                  {(currentCharIndex > i || currentCharIndex === i) && (
                    <>
                      <span className="text-slate-400">ASCII: {step.ascii}</span>
                      <span className="text-slate-400">→</span>
                    </>
                  )}
                  {(currentCharIndex > i || currentCharIndex === i) && (
                    <>
                      <span className="text-slate-400">
                        {step.ascii}^{keys.e} mod {keys.n}
                      </span>
                      <span className="text-slate-400">→</span>
                    </>
                  )}
                  {(currentCharIndex > i || (currentCharIndex === i && animationPhase >= 3)) && (
                    <span className="px-4 py-2 rounded-lg bg-slate-800 text-green-400 font-bold border-2 border-green-500/30">
                      {step.encrypted}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {encrypted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="neon-border rounded-lg p-6"
            >
              <p className="text-slate-300 mb-4">
                Your message has been successfully encrypted using the public key. Each character has been transformed
                into a unique cipher number.
              </p>
              <p className="text-sm text-slate-400 mb-2">Ciphertext (encrypted message):</p>
              <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm text-cyan-400 break-all">{encrypted}</div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  )
}

export default Encryption
