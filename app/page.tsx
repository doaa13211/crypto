"use client"

import { Header } from "@/components/header"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Home() {
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

  const teamMembers = [
    "Eman El-sharabasi Mohammad El-sherbini",
    "Mariam Farahat Ragheb Ahmed",
    "Samia Hisham Abdo Rizk Salama",
    "Yara Elsaeed Elshabrawy Elsayed",
    "Duáa Mohammed Hamdy Ragab Ali Shata",
    "Toaa Ali Elsaid Bar",
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8"
        >
          {/* Page Title */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold cyber-text-glow mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Home
              </span>
            </h1>
          </motion.div>

          {/* Project Idea Section */}
          <motion.section
            variants={itemVariants}
            className="formula-box rounded-lg p-8 mb-12 border border-blue-500/30"
          >
            <h2 className="text-2xl font-bold text-blue-300 mb-4">Project Idea</h2>
            <p className="text-lg text-slate-200 leading-relaxed">
              A website that demonstrates and visualizes the RSA algorithm with clear explanations. This project aims to
              provide an interactive learning experience for understanding one of the most important cryptographic
              algorithms in modern security.
            </p>
          </motion.section>

          {/* Team Members Section */}
          <motion.section
            variants={itemVariants}
            className="formula-box rounded-lg p-8 mb-12 border border-blue-500/30"
          >
            <h2 className="text-2xl font-bold text-blue-300 mb-6">Team Members</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/40 rounded-lg p-4 text-center hover:border-purple-400/60 transition-all"
                >
                  <p className="text-slate-200 font-medium">{member}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Supervisor Section */}
          <motion.section
            variants={itemVariants}
            className="formula-box rounded-lg p-8 mb-12 border border-blue-500/30"
          >
            <h2 className="text-2xl font-bold text-blue-300 mb-4">Supervisor</h2>
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/40 rounded-lg p-6 text-center">
              <p className="text-xl font-semibold text-blue-200">Prof. Wael Abd-Elqader Awad</p>
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center">
            <Link
              href="/rsa-algorithm"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Learn About RSA Algorithm
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </>
  )
}
