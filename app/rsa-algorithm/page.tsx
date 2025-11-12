"use client"

import type React from "react"

import Image from "next/image"
import { motion } from "framer-motion"
import { Header } from "@/components/header"

export default function RSAAlgorithm() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const Section = ({
    title,
    children,
    bgColor = "bg-slate-800/50",
  }: {
    title: string
    children: React.ReactNode
    bgColor?: string
  }) => (
    <motion.section variants={itemVariants} className={`formula-box rounded-lg p-6 mb-8 border border-slate-700/50`}>
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">{title}</h2>
      <div className="text-foreground/90 space-y-3">{children}</div>
    </motion.section>
  )

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8"
        >
          {/* Title */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 cyber-text-glow">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                RSA (Rivest–Shamir–Adleman)
              </span>
              <br />
              <span className="text-cyan-400">Cryptography</span>
            </h1>
          </motion.div>

          {/* Section 1: Meaning */}
          <Section title="i. What does Rivest–Shamir–Adleman mean?">
            <p>It&apos;s the name of three scientists:</p>
            <ul className="ml-4 space-y-1">
              <li className="flex gap-3">
                <span className="text-cyan-400">•</span>
                <span>Ron Rivest</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">•</span>
                <span>Adi Shamir</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">•</span>
                <span>Leonard Adleman</span>
              </li>
            </ul>
            <p className="mt-4">
              They invented the RSA algorithm in 1977, and its name comes from the first letters of their surnames.
            </p>
          </Section>

          {/* Section 2: What is RSA */}
          <Section title="ii. What is RSA?">
            <p>
              RSA is an encryption algorithm based on the concept of{" "}
              <span className="text-cyan-400 font-semibold">Public-Key Encryption</span>. This means there are two keys:
            </p>
            <ul className="ml-4 space-y-2 mt-3">
              <li className="flex gap-3">
                <span className="text-cyan-400">•</span>
                <span>
                  <span className="text-cyan-300 font-semibold">Public Key (e, n)</span> — can be shared with anyone and
                  is used for encrypting data.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">•</span>
                <span>
                  <span className="text-cyan-300 font-semibold">Private Key (d, n)</span> — kept secret by the owner and
                  used for decrypting data.
                </span>
              </li>
            </ul>
          </Section>

          {/* Section 3: Why created */}
          <Section title="iii. Why was this algorithm created?">
            <p>
              Before RSA, most encryption systems used only one key (Symmetric Key), meaning the same key was used for
              both encryption and decryption. This was risky because if that key was leaked, all messages could be
              easily read.
            </p>
            <p className="mt-3">
              RSA introduced a smart idea — you can send an encrypted message to someone without knowing their secret
              key.
            </p>
          </Section>

          {/* Section 4: Main idea */}
          <Section title="iv. The main idea behind RSA">
            <p className="font-semibold">
              RSA aims to answer a simple question:{" "}
              <em>How can we make encryption easy for everyone, but decryption possible for only one person?</em>
            </p>
            <p className="mt-3">For example:</p>
            <ul className="ml-4 space-y-1 mt-2">
              <li className="flex gap-3">
                <span className="text-cyan-400">•</span>
                <span>Anyone can send you an encrypted message.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">•</span>
                <span>But only you can decrypt it.</span>
              </li>
            </ul>
            <p className="mt-3">
              To make this possible, RSA relies on a mathematical function that is easy in one direction but very hard
              to reverse.
            </p>
          </Section>

          {/* Section 5: Diagram */}
          <motion.section variants={itemVariants} className="text-center mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">v. Diagram showing how the algorithm works</h2>
            <div className="neon-border rounded-lg p-6 backdrop-blur-sm">
              <div className="relative h-64 sm:h-80 w-full">
                <Image src="/rsa_diagram.png" alt="RSA Algorithm Diagram" fill className="object-contain" />
              </div>
            </div>
          </motion.section>

          {/* Section 6: Algorithm Steps Overview */}
          <Section title="vi. RSA Algorithm Steps">
            <p>We can divide the RSA algorithm into three main stages:</p>
            <ol className="ml-4 space-y-1 mt-3">
              <li className="flex gap-3">
                <span className="text-cyan-400">1.</span>
                <span>Key Generation</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">2.</span>
                <span>Message Encryption</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">3.</span>
                <span>Message Decryption</span>
              </li>
            </ol>
          </Section>

          {/* Section 7: Key Generation */}
          <Section title="1. Key Generation">
            <p>
              We start by selecting two very large prime numbers, <span className="text-cyan-300 font-semibold">P</span>{" "}
              and <span className="text-cyan-300 font-semibold">Q</span>.
            </p>
            <p className="mt-3">
              For example, if I say 77, you can easily tell it&apos;s 7 × 11. But if the number is extremely large (like
              a 300-digit number), factoring it into its prime numbers becomes almost impossible. This difficulty is
              known as the <span className="text-cyan-300 font-semibold">Factorization Problem</span>.
            </p>
            <div className="space-y-2 mt-4 bg-slate-900/50 p-4 rounded border border-slate-600">
              <div className="font-mono text-sm">
                Then we calculate: <span className="text-cyan-300 font-semibold">n = p × q</span>
              </div>
              <div className="font-mono text-sm">
                Euler&apos;s Totient Function:{" "}
                <span className="text-cyan-300 font-semibold">φ(n) = (p - 1) × (q - 1)</span>
              </div>
              <div className="font-mono text-sm">
                Choose e such that: <span className="text-cyan-300 font-semibold">1 &lt; e &lt; φ(n)</span> and e is
                coprime with φ(n)
              </div>
              <div className="font-mono text-sm">
                Public Key: <span className="text-cyan-300 font-semibold">(e, n)</span>
              </div>
            </div>
          </Section>

          {/* Section 8: Message Encryption */}
          <Section title="2. Message Encryption">
            <p>
              We have the original message <span className="text-cyan-300 font-semibold">M</span> and the encrypted
              message <span className="text-cyan-300 font-semibold">C</span>.
            </p>
            <p className="mt-3">To encrypt the message, we use this formula:</p>
            <div className="bg-slate-900/50 p-4 rounded border border-slate-600 text-center font-mono text-sm mt-3">
              <span className="text-cyan-300 font-semibold">
                C = M<sup>e</sup> mod n
              </span>
            </div>
            <p className="mt-3">This means anyone who knows (e, n) can encrypt a message.</p>
          </Section>

          {/* Section 9: Message Decryption */}
          <Section title="3. Message Decryption">
            <p>To get back the original message M, we use the decryption formula:</p>
            <div className="bg-slate-900/50 p-4 rounded border border-slate-600 text-center font-mono text-sm mt-3">
              <span className="text-cyan-300 font-semibold">
                M = C<sup>d</sup> mod n
              </span>
            </div>
            <p className="mt-4">
              <span className="font-semibold">Why does this work?</span> Mathematics guarantees that if you raise the
              message to the power of e and then to the power of d (or vice versa), you&apos;ll get the original message
              again.
            </p>
            <div className="bg-slate-900/50 p-4 rounded border border-slate-600 text-center font-mono text-sm mt-3">
              C = M<sup>e</sup> mod n ⇒ M = C<sup>d</sup> mod n
            </div>
            <p className="mt-4">
              If someone doesn&apos;t have <span className="text-cyan-300 font-semibold">d</span>, there&apos;s no easy
              mathematical way to get M from C.
            </p>
            <div className="space-y-2 mt-4 bg-slate-900/50 p-4 rounded border border-slate-600">
              <div className="font-mono text-sm">
                The Private Key is: <span className="text-cyan-300 font-semibold">(n, d)</span>
              </div>
              <div className="font-mono text-sm">
                To calculate d:{" "}
                <span className="text-cyan-300 font-semibold">
                  d = e<sup>-1</sup> mod φ(n)
                </span>
              </div>
            </div>
          </Section>

          {/* Section 10: Security */}
          <Section title="vii. Why is RSA Secure?">
            <p>
              We can find <span className="text-cyan-300 font-semibold">d</span> only because we know φ(n). But if we
              don&apos;t know φ(n), then to calculate it we&apos;d need to know{" "}
              <span className="text-cyan-300 font-semibold">p</span> and{" "}
              <span className="text-cyan-300 font-semibold">q</span>.
            </p>
            <p className="mt-3">
              Since <span className="text-cyan-300 font-semibold">n</span> is a very large number (possibly hundreds of
              digits long), factoring it to get <span className="text-cyan-300 font-semibold">p</span> and{" "}
              <span className="text-cyan-300 font-semibold">q</span> takes an enormous amount of time, even with
              powerful computers.
            </p>
            <div className="mt-4 p-4 rounded border-l-4 border-cyan-500 bg-cyan-500/10">
              <p className="font-semibold text-cyan-300">
                The security of RSA depends on the difficulty of factoring <span className="text-cyan-400">n</span> into
                its prime factors (p and q).
              </p>
            </div>
          </Section>

          {/* Section 11: Synchronization */}
          <Section title="viii. How do the sender and receiver stay synchronized?">
            <ul className="ml-4 space-y-2">
              <li className="flex gap-3">
                <span className="text-cyan-400">•</span>
                <span>The sender only needs the public key (e, n) to encrypt messages.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">•</span>
                <span>
                  The receiver generates the full set of values (p, q, n, φ(n), e, d), keeps d secret, and shares only
                  (e, n) publicly.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">•</span>
                <span>So the two sides don&apos;t share d — it always remains private to the receiver.</span>
              </li>
            </ul>
          </Section>

          {/* Section 12: Key Exchange Process */}
          <Section title="ix. How does (e, n) reach the sender securely?">
            <ol className="ml-4 space-y-2">
              <li className="flex gap-3">
                <span className="text-cyan-400">1.</span>
                <span>
                  The receiver performs key generation: Chooses p and q → computes n = p × q and φ(n) → selects e →
                  computes d.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">2.</span>
                <span>The receiver keeps d in a safe place.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">3.</span>
                <span>The receiver publishes the public key (e, n).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">4.</span>
                <span>The sender gets (e, n).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">5.</span>
                <span>The sender encrypts the message using (e, n), then sends the ciphertext.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">6.</span>
                <span>The receiver uses d and n to decrypt and recover the original message.</span>
              </li>
            </ol>
          </Section>

          {/* Conclusion */}
          <motion.div
            variants={itemVariants}
            className="cyber-glow rounded-lg p-8 text-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 mb-8"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-3">Understanding RSA</h2>
            <p className="text-foreground/90 text-lg">
              RSA elegantly solves the problem of secure communication by using mathematical properties that are
              computationally easy in one direction but practically impossible to reverse without the private key.
            </p>
          </motion.div>

          {/* PDF Download Section */}
          <motion.section
            variants={itemVariants}
            className="formula-box rounded-lg p-8 mb-8 border border-slate-700/50"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Download Explanations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="/rsa_explanation_en.pdf"
                download="rsa_explanation_en.pdf"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg p-4 hover:border-cyan-500/80 hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                <span className="text-2xl">📄</span>
                <div>
                  <p className="font-semibold text-cyan-300">English PDF</p>
                  <p className="text-sm text-foreground/70">rsa_explanation_en.pdf</p>
                </div>
              </a>
              <a
                href="/rsa_explanation_ar.pdf"
                download="rsa_explanation_ar.pdf"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg p-4 hover:border-cyan-500/80 hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                <span className="text-2xl">📄</span>
                <div>
                  <p className="font-semibold text-cyan-300">Arabic PDF</p>
                  <p className="text-sm text-foreground/70">rsa_explanation_ar.pdf</p>
                </div>
              </a>
            </div>
          </motion.section>

          {/* Video Section */}
          <motion.section
            variants={itemVariants}
            className="formula-box rounded-lg p-8 mb-8 border border-slate-700/50"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Video Explanation</h2>
            <div className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-600">
              <div className="relative w-full bg-black aspect-video flex items-center justify-center">
                <video controls className="w-full h-full" poster="/rsa-algorithm-video.jpg">
                  <source src="/rsa_vedio.mp4" type="video/mp4" />
                  <p className="text-center text-foreground/70 p-4">
                    Your browser does not support the video tag. Please use a modern browser to watch the video.
                  </p>
                </video>
              </div>
            </div>
            <p className="text-sm text-foreground/70 mt-4 text-center">
              Video coming soon - Comprehensive explanation of the RSA algorithm with visual demonstrations
            </p>
          </motion.section>
        </motion.div>
      </main>
    </>
  )
}
