import { motion } from 'motion/react';
import { Lock, Users, GraduationCap, Shield, Zap, Eye } from 'lucide-react';
import { ParticleBackground } from '../components/ParticleBackground';
import { CyberGrid } from '../components/CyberGrid';
import { Page } from '../App';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const teamMembers = [
    'Eman El-sharabasi Mohammad El-sherbini',
    'Mariam Farahat Ragheb Ahmed',
    'Samia Hisham Abdo Rizk Salama',
    'Yara Elsaeed Elshabrawy Elsayed',
    'Duáa Mohammed Hamdy Ragab Ali Shata',
    'Toaa Ali Elsaid Bar',
  ];

  const features = [
    {
      icon: Eye,
      title: 'Interactive Visualization',
      description: 'Watch RSA algorithms come to life with animated step-by-step demonstrations',
      color: '#00EAFF',
    },
    {
      icon: Shield,
      title: 'Secure by Design',
      description: 'Learn the mathematical foundations that make RSA one of the most secure encryption methods',
      color: '#00FFB3',
    },
    {
      icon: Zap,
      title: 'Real-Time Learning',
      description: 'Experiment with encryption and decryption in an interactive environment',
      color: '#6C24FF',
    },
  ];

  return (
    <div className="relative min-h-screen pt-16">
      <ParticleBackground />
      <CyberGrid />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#6C24FF]/20 to-[#00FFD5]/20 border border-[#00EAFF]/30 mb-8">
              <Lock className="w-5 h-5 text-[#00EAFF]" />
              <span className="text-[#00EAFF]">Cryptography Education Platform</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 relative"
          >
            <span className="block text-5xl sm:text-6xl lg:text-7xl bg-gradient-to-r from-[#00EAFF] via-[#00FFB3] to-[#6C24FF] bg-clip-text text-transparent animate-pulse">
              RSA Cryptography
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl mt-4 text-white">
              Visualization Project
            </span>
            <div className="absolute -inset-4 bg-gradient-to-r from-[#00EAFF]/20 to-[#00FFB3]/20 blur-3xl -z-10" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Interactive animations that explain RSA step-by-step. Explore the mathematics behind modern encryption through beautiful visualizations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={() => onNavigate('algorithm')}
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-[#6C24FF] to-[#00FFD5] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#00EAFF]/50 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Learn About RSA Algorithm
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00EAFF] to-[#00FFB3] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>

          {/* Floating RSA Lock Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex p-12 rounded-3xl bg-gradient-to-br from-[#6C24FF]/10 to-[#00FFD5]/10 backdrop-blur-sm border border-[#00EAFF]/30"
            >
              <Lock className="w-32 h-32 text-[#00EAFF]" strokeWidth={1.5} />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00EAFF]/20 to-[#00FFB3]/20 blur-2xl -z-10 animate-pulse" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4 bg-gradient-to-r from-[#00EAFF] to-[#00FFB3] bg-clip-text text-transparent">
              Why This Project?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Understanding cryptography is crucial in our digital age. This interactive platform makes learning RSA encryption accessible and engaging through visual storytelling.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#00EAFF]/50 transition-all duration-300"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                  style={{ background: `radial-gradient(circle at center, ${feature.color}20, transparent)` }}
                />
                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    style={{ borderColor: `${feature.color}30` }}
                  >
                    <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-xl mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Idea Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl bg-gradient-to-br from-[#6C24FF]/10 to-[#00FFD5]/10 backdrop-blur-sm border border-[#00EAFF]/30"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#00EAFF]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#00FFB3]/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-[#00EAFF]" />
                <h2 className="text-3xl bg-gradient-to-r from-[#00EAFF] to-[#00FFB3] bg-clip-text text-transparent">
                  Project Idea
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                This project aims to demystify the RSA encryption algorithm through interactive visualizations and animations. 
                By breaking down complex mathematical concepts into digestible visual steps, we make cryptography accessible 
                to students and enthusiasts alike. Each visualization is carefully crafted to show the flow of data, 
                mathematical transformations, and the elegant simplicity behind one of the world's most important security protocols.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-[#00EAFF]" />
              <h2 className="text-4xl bg-gradient-to-r from-[#00EAFF] to-[#00FFB3] bg-clip-text text-transparent">
                Team Members
              </h2>
            </div>
            <p className="text-gray-400">Dedicated students bringing cryptography to life</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#00EAFF]/50 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#00EAFF]/0 to-[#00FFB3]/0 group-hover:from-[#00EAFF]/10 group-hover:to-[#00FFB3]/10 transition-all duration-300" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6C24FF] to-[#00FFD5] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white">
                      {member.split(' ')[0][0]}{member.split(' ')[1]?.[0]}
                    </span>
                  </div>
                  <p className="text-white">{member}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supervisor Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl bg-gradient-to-br from-[#6C24FF]/20 to-[#00FFD5]/20 backdrop-blur-sm border border-[#00EAFF]/50"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00EAFF]/10 to-[#00FFB3]/10 blur-2xl" />
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-3 mb-6">
                <GraduationCap className="w-10 h-10 text-[#00EAFF]" />
                <h2 className="text-3xl bg-gradient-to-r from-[#00EAFF] to-[#00FFB3] bg-clip-text text-transparent">
                  Project Supervisor
                </h2>
              </div>
              <p className="text-2xl text-white mb-2">Prof. Wael Abd-Elqader Awad</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-6 bg-gradient-to-r from-[#00EAFF] to-[#00FFB3] bg-clip-text text-transparent">
              Ready to Explore RSA?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Dive into the fascinating world of cryptography with our interactive visualizations
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => onNavigate('algorithm')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#6C24FF] to-[#00FFD5] hover:shadow-2xl hover:shadow-[#00EAFF]/50 transition-all duration-300 hover:scale-105"
              >
                Learn the Algorithm
              </button>
              <button
                onClick={() => onNavigate('encryption')}
                className="px-8 py-4 rounded-xl bg-white/5 border border-[#00EAFF]/30 hover:border-[#00EAFF] hover:shadow-lg hover:shadow-[#00EAFF]/30 transition-all duration-300"
              >
                Start Visualization
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}