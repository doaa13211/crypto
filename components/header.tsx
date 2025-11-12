"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="cyber-glow rounded-lg p-1">
            <Image src="/college_logo.png" alt="College Logo" width={50} height={50} className="h-12 w-auto" />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 sm:gap-8">
          <Link
            href="/"
            className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors hover:cyber-text-glow"
          >
            Home
          </Link>
          <Link
            href="/rsa-algorithm"
            className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors hover:cyber-text-glow"
          >
            RSA Algorithm
          </Link>
          <Link
            href="/make-key"
            className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors hover:cyber-text-glow"
          >
            Make Key
          </Link>
          <Link
            href="/encrypt"
            className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors hover:cyber-text-glow"
          >
            Encrypt
          </Link>
          <Link
            href="/decrypt"
            className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors hover:cyber-text-glow"
          >
            Decrypt
          </Link>
        </nav>
      </div>
    </motion.header>
  )
}
