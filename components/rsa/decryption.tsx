"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { modPow } from "@/lib/rsa-utils"

interface DecryptionProps {
  isPlaying: boolean
  speed: number
  keys: any
  encrypted: string
  message: string
}

interface DecryptionStep {
  cipherValue: number
  decrypted: number
  char: string
}

export function Decryption({ isPlaying, speed, keys, encrypted, message }: DecryptionProps) {
  const [decryptionSteps, setDecryptionSteps] = useState<DecryptionStep[]>([])
  const [decrypted, setDecrypted] = useState("")
  const [currentStep, setCurrentStep] = useState(-1)
  const [animationPhase, setAnimationPhase] = useState(0)

  const decryptAndShowSteps = (encryptedStr: string, d: number, n: number) => {
    if (!encryptedStr) {
      setDecryptionSteps([])
      setDecrypted("")
      return
    }

    const cipherValues = encryptedStr.split(",").map(Number)
    const steps: DecryptionStep[] = cipherValues.map((c) => {
      const m = modPow(c, d, n)
      return {
        cipherValue: c,
        decrypted: m,
        char: String.fromCharCode(m),
      }
    })

    setDecryptionSteps(steps)
    setDecrypted(steps.map((s) => s.char).join(""))
  }

  useEffect(() => {
    if (!isPlaying || !keys || !encrypted) {
      setCurrentStep(-1)
      setAnimationPhase(0)
      return
    }

    const cipherValues = encrypted.split(",").map(Number)
    const duration = 1000 / speed

    const timeouts = cipherValues.map((_, i) => {
      return setTimeout(
        () => {
          setCurrentStep(i)
          setAnimationPhase(Math.floor((i % 3) + 1))
        },
        duration * (i + 1),
      )
    })

    return () => timeouts.forEach(clearTimeout)
  }, [isPlaying, speed, keys, encrypted])

  useEffect(() => {
    if (keys && encrypted) {
      decryptAndShowSteps(encrypted, keys.d, keys.n)
    }
  }, [keys, encrypted])

  if (!keys || !encrypted) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neon-border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Decryption Process</h2>
        <p className="text-slate-300">Please encrypt a message first in the Encryption step.</p>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="neon-border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Step 3: Decryption Process</h2>
        <p className="text-slate-300">Transform ciphertext back to plaintext using the private key (d, n)</p>
      </div>

      <div className="neon-border rounded-lg p-6">
        <p className="text-slate-300 mb-4">
          This is the secure encrypted message that will now be decrypted using the private key.
        </p>
        <p className="text-sm text-slate-400 mb-2">Current ciphertext:</p>
        <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm text-cyan-400 break-all">{encrypted}</div>
      </div>

      <div className="formula-box rounded-lg p-6">
        <p className="text-sm text-slate-400 mb-3">RSA Decryption Formula</p>
        <p className="text-xl text-cyan-400 font-mono">M ≡ C^d (mod n)</p>
      </div>

      {decryptionSteps.length > 0 && (
        <div className="neon-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">Decryption Animation:</h3>
          <div className="space-y-3">
            {decryptionSteps.map((step, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 flex-wrap"
                animate={{
                  opacity: currentStep >= i ? 1 : 0.5,
                }}
              >
                <div
                  className={`px-4 py-2 rounded-lg bg-slate-800 text-cyan-400 font-bold font-mono text-lg border-2 border-cyan-500/30 ${
                    currentStep === i ? "ring-2 ring-cyan-500 scale-110" : ""
                  }`}
                >
                  {step.cipherValue}
                </div>
                <span className="text-slate-400">→</span>
                {(currentStep > i || currentStep === i) && (
                  <>
                    <span className="text-slate-400">
                      {step.cipherValue}^{keys.d} mod {keys.n}
                    </span>
                    <span className="text-slate-400">→</span>
                  </>
                )}
                {(currentStep > i || currentStep === i) && (
                  <>
                    <span className="text-slate-400">ASCII: {step.decrypted}</span>
                    <span className="text-slate-400">→</span>
                  </>
                )}
                {(currentStep > i || (currentStep === i && animationPhase >= 3)) && (
                  <span className="px-4 py-2 rounded-lg bg-slate-800 text-green-400 font-bold border-2 border-green-500/30">
                    "{step.char}"
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {decrypted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="neon-border rounded-lg p-6"
        >
          <p className="text-slate-300 mb-4">
            Your message has been successfully decrypted using the private key. Each cipher value has been transformed
            back to its original character.
          </p>
          <p className="text-sm text-slate-400 mb-2">Decrypted Message (Plaintext):</p>
          <div className="bg-slate-800 rounded-lg p-4 font-mono text-lg text-green-400 break-all">{decrypted}</div>

          {decrypted === message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
            >
              <p className="text-green-400 font-semibold">✓ Perfect Match!</p>
              <p className="text-green-400/80 text-sm">Decrypted message perfectly matches the original message.</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

export default Decryption
