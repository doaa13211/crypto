"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { generateRSAKeys } from "@/lib/rsa-utils"

interface KeyGenerationProps {
  isPlaying: boolean
  speed: number
  onKeysGenerated: (keys: any) => void
  keys: any
}

export default function KeyGeneration({ isPlaying, speed, onKeysGenerated, keys }: KeyGenerationProps) {
  const [step, setStep] = useState(0)
  const [p, setP] = useState<number | null>(null)
  const [q, setQ] = useState<number | null>(null)
  const [pInput, setPInput] = useState("61")
  const [qInput, setQInput] = useState("53")
  const [inputsLocked, setInputsLocked] = useState(false)
  const [n, setN] = useState<number | null>(null)
  const [phi, setPhi] = useState<number | null>(null)
  const [e, setE] = useState<number | null>(null)
  const [d, setD] = useState<number | null>(null)
  const [stepExplanation, setStepExplanation] = useState(
    "Step 1: Choose Prime Numbers\n\nEnter two different prime numbers (p and q). These numbers are kept SECRET and form the foundation of RSA security.\n\nExample: p = 61, q = 53 (both are prime numbers)\n\nLarger primes = stronger encryption. After entering your primes, click the Play button to start the key generation animation.",
  )
  const [pError, setPError] = useState("")
  const [qError, setQError] = useState("")

  const validatePrime = (num: number): boolean => {
    if (num < 2) return false
    if (num === 2) return true
    if (num % 2 === 0) return false
    for (let i = 3; i * i <= num; i += 2) {
      if (num % i === 0) return false
    }
    return true
  }

  const handlePChange = (value: string) => {
    setPInput(value)
    if (value && !validatePrime(Number(value))) {
      setPError("Must be a prime number (e.g., 2, 3, 5, 7, 11, 13, ...)")
    } else {
      setPError("")
    }
  }

  const handleQChange = (value: string) => {
    setQInput(value)
    if (value && !validatePrime(Number(value))) {
      setQError("Must be a prime number (e.g., 2, 3, 5, 7, 11, 13, ...)")
    } else if (value === pInput) {
      setQError("p and q must be different numbers")
    } else {
      setQError("")
    }
  }

  const generateKeys = () => {
    const pNum = Number(pInput)
    const qNum = Number(qInput)

    if (!validatePrime(pNum)) {
      setPError("p must be a prime number")
      return
    }
    if (!validatePrime(qNum)) {
      setQError("q must be a prime number")
      return
    }
    if (pNum === qNum) {
      setQError("p and q must be different")
      return
    }

    setInputsLocked(true)
    const keysData = generateRSAKeys(pNum, qNum)
    setP(keysData.p)
    setQ(keysData.q)
    setN(keysData.n)
    setPhi(keysData.phi)
    setE(keysData.e)
    setD(keysData.d)
    onKeysGenerated(keysData)
  }

  useEffect(() => {
    if (!isPlaying || inputsLocked === false) return

    const duration = 1000 / speed

    const steps = [
      {
        delay: 0,
        action: () => {
          setStep(1)
          setStepExplanation(
            `STEP 1: Select Two Prime Numbers\n\nWe've chosen p = ${Number(pInput)} and q = ${Number(qInput)}\n\nThese two prime numbers are the SECRET foundation of RSA.`,
          )
        },
      },
      {
        delay: duration * 1.5,
        action: () => {
          setStepExplanation(
            `STEP 2: Calculate Modulus n\n\nFormula: n = p × q\n\nn = ${Number(pInput)} × ${Number(qInput)} = ${Number(pInput) * Number(qInput)}`,
          )
        },
      },
      {
        delay: duration * 3,
        action: () => {
          const pNum = Number(pInput)
          const qNum = Number(qInput)
          const phi = (pNum - 1) * (qNum - 1)
          setStepExplanation(
            `STEP 3: Calculate Euler's Totient φ(n)\n\nFormula: φ(n) = (p - 1) × (q - 1)\n\nφ(n) = (${pNum} - 1) × (${qNum} - 1) = ${phi}`,
          )
        },
      },
      {
        delay: duration * 5,
        action: () => {
          setStepExplanation(`STEP 4: Choose Public Exponent e\n\ne must satisfy: 1 < e < φ(n) and gcd(e, φ(n)) = 1`)
        },
      },
      {
        delay: duration * 7,
        action: () => {
          const keysData = generateRSAKeys(Number(pInput), Number(qInput))
          setStepExplanation(
            `STEP 5: Calculate Private Exponent d\n\nFormula: d = e^(-1) mod φ(n)\n\nd = ${keysData.d}`,
          )
        },
      },
      {
        delay: duration * 9,
        action: () => {
          const keysData = generateRSAKeys(Number(pInput), Number(qInput))
          setStep(2)
          setStepExplanation(
            `✓ KEY GENERATION COMPLETE!\n\nPublic Key: (e=${keysData.e}, n=${keysData.n})\nPrivate Key: (d=${keysData.d}, n=${keysData.n})`,
          )
        },
      },
    ]

    const timeouts = steps.map((s) => setTimeout(s.action, s.delay))

    return () => timeouts.forEach(clearTimeout)
  }, [isPlaying, speed, inputsLocked, pInput, qInput])

  const handleReset = () => {
    setStep(0)
    setP(null)
    setQ(null)
    setN(null)
    setPhi(null)
    setE(null)
    setD(null)
    setInputsLocked(false)
    setPInput("61")
    setQInput("53")
    setPError("")
    setQError("")
    setStepExplanation(
      "Step 1: Choose Prime Numbers\n\nEnter two different prime numbers (p and q). These numbers are kept SECRET and form the foundation of RSA security.",
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="neon-border rounded-lg p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Step 1: RSA Key Generation
        </h2>
        <p className="text-slate-300">Choose two prime numbers and generate public & private keys</p>
      </div>

      {!inputsLocked && (
        <div className="neon-border rounded-lg p-6 space-y-4">
          <p className="text-slate-300">Enter your own prime numbers or use the defaults. Then click Play to start!</p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-blue-400 mb-2">Prime Number p (2-10000):</label>
              <input
                type="number"
                value={pInput}
                onChange={(e) => handlePChange(e.target.value)}
                min="2"
                max="10000"
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              {pError && <p className="text-red-400 text-sm mt-1">{pError}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-400 mb-2">Prime Number q (2-10000):</label>
              <input
                type="number"
                value={qInput}
                onChange={(e) => handleQChange(e.target.value)}
                min="2"
                max="10000"
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              {qError && <p className="text-red-400 text-sm mt-1">{qError}</p>}
            </div>
          </div>

          <p className="text-slate-400 text-sm">Prime numbers: 2, 3, 5, 7, 11, 13, 17, 19, 23, ..., 61, 53, 97, ...</p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateKeys}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all"
          >
            Lock Primes & Play Animation
          </motion.button>
        </div>
      )}

      {/* Step Explanation */}
      <div className="formula-box rounded-lg p-6 whitespace-pre-wrap text-slate-300 font-mono text-sm">
        {stepExplanation}
      </div>

      {/* Keys Display */}
      {n && phi && e && d && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="neon-border rounded-lg p-6"
        >
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Generated Keys
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="formula-box rounded-lg p-4">
              <p className="text-sm text-slate-400 mb-2">Public Key (e, n)</p>
              <p className="text-lg font-bold text-blue-400">e = {e}</p>
              <p className="text-lg font-bold text-blue-400">n = {n}</p>
            </div>
            <div className="formula-box rounded-lg p-4">
              <p className="text-sm text-slate-400 mb-2">Private Key (d, n)</p>
              <p className="text-lg font-bold text-purple-400">d = {d}</p>
              <p className="text-lg font-bold text-purple-400">n = {n}</p>
            </div>
          </div>
          {inputsLocked && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="w-full mt-4 bg-slate-700 hover:bg-slate-600 text-blue-400 font-semibold py-2 rounded-lg transition-all"
            >
              Change Prime Numbers
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
