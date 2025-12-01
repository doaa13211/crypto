import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StepIndicator } from '../components/StepIndicator';
import { NarrationBox } from '../components/NarrationBox';
import { ControlBar } from '../components/ControlBar';
import { ParticleBackground } from '../components/ParticleBackground';
import { Lock, Key, User, ArrowRight } from 'lucide-react';
import { useRSA } from '../contexts/RSAContext';
import { Page } from '../App';

interface KeyGenerationProps {
  onNavigate: (page: Page) => void;
}

export function KeyGeneration({ onNavigate }: KeyGenerationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [animationKey, setAnimationKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setKeys } = useRSA();

  const totalSteps = 7;

  // Example values
  const p = 61;
  const q = 53;
  const n = p * q; // 3233
  const phi = (p - 1) * (q - 1); // 3120
  const e = 17;
  const d = 2753;

  const steps = [
    {
      title: 'The Story Begins',
      narration: 'Meet Omar! He wants to receive secret messages from his friend Ahmed. To do this securely, Omar needs to create a special pair of keys using RSA encryption.',
    },
    {
      title: 'Step 1: Choosing Prime Numbers (p & q)',
      narration: 'Omar starts by selecting two large prime numbers. A prime number is only divisible by 1 and itself. He chooses p = 61 and q = 53. These numbers must be kept SECRET!',
    },
    {
      title: 'Step 2: Computing the Modulus (n = p × q)',
      narration: 'Omar multiplies the two primes: n = 61 × 53 = 3233. This number "n" will be part of BOTH the public and private keys. It\'s safe to share publicly.',
    },
    {
      title: 'Step 3: Computing φ(n)',
      narration: 'φ(n) is Euler\'s Totient Function. It counts how many numbers less than n don\'t share factors with n. Formula: φ(n) = (p-1) × (q-1) = 60 × 52 = 3120. This must stay SECRET!',
    },
    {
      title: 'Step 4: Choosing Public Exponent (e)',
      narration: 'Omar picks a number "e" that is: 1) Between 1 and φ(n), 2) Shares no common factors with φ(n). He chooses e = 17. This will be part of the PUBLIC key.',
    },
    {
      title: 'Step 5: Computing Private Exponent (d)',
      narration: 'Omar calculates "d" - the modular multiplicative inverse of e. This means: (e × d) mod φ(n) = 1. He gets d = 2753. This is the SECRET part of the private key!',
    },
    {
      title: 'Keys Generated! 🎉',
      narration: 'Omar now has two keys: PUBLIC KEY (e, n) = (17, 3233) - He shares this with everyone! PRIVATE KEY (d, n) = (2753, 3233) - Only Omar knows this! Ahmed can now send encrypted messages!',
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < totalSteps) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= totalSteps) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
        setAnimationKey(prev => prev + 1);
      }, 4000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, speed, totalSteps]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setAnimationKey(animationKey + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setAnimationKey(animationKey + 1);
    }
  };

  const handleReplay = () => {
    setAnimationKey(animationKey + 1);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setAnimationKey(animationKey + 1);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      try {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          containerRef.current.requestFullscreen();
        }
      } catch (error) {
        console.log('Fullscreen not supported or blocked');
      }
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen pt-16 bg-[#0A0F1F]">
      <ParticleBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl mb-4">
            <span className="bg-gradient-to-r from-[#00EAFF] via-[#00FFB3] to-[#6C24FF] bg-clip-text text-transparent">
              RSA Key Generation Story
            </span>
          </h1>
          <p className="text-gray-400">Follow Omar as he creates his encryption keys!</p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex justify-end mb-8">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {/* Animation Canvas with Fixed Height */}
        <div className="relative h-[700px] rounded-3xl bg-gradient-to-br from-[#0A0F1F] to-[#0F1729] border border-[#00EAFF]/30 overflow-hidden flex flex-col mb-8">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,234,255,0.1),transparent_50%)]" />
          
          {/* Animation Area */}
          <div className="flex-1 p-8 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentStep}-${animationKey}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 h-full flex items-center justify-center"
              >
                {/* Step 1: Story Introduction */}
                {currentStep === 1 && (
                  <div className="flex flex-col items-center gap-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, type: "spring" }}
                      className="relative"
                    >
                      <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#00EAFF]/20 to-[#00FFB3]/20 border-4 border-[#00EAFF] flex items-center justify-center backdrop-blur-sm">
                        <User className="w-20 h-20 text-[#00EAFF]" />
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-4 border-[#00EAFF] blur-xl"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-center"
                    >
                      <h2 className="text-4xl mb-4 bg-gradient-to-r from-[#00EAFF] to-[#00FFB3] bg-clip-text text-transparent">
                        Omar
                      </h2>
                      <p className="text-2xl text-gray-300">Wants to receive secret messages</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 }}
                      className="flex items-center gap-4"
                    >
                      <Lock className="w-12 h-12 text-[#6C24FF]" />
                      <span className="text-xl text-gray-400">He needs to generate RSA keys...</span>
                    </motion.div>
                  </div>
                )}

                {/* Step 2: Choose p and q */}
                {currentStep === 2 && (
                  <div className="flex flex-col items-center gap-12">
                    <h2 className="text-2xl text-[#00EAFF] mb-4">Choosing Two Secret Prime Numbers</h2>
                    <div className="flex gap-16 items-center">
                      <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                      >
                        <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-[#00EAFF]/20 to-[#00FFB3]/20 border-2 border-[#00EAFF] flex items-center justify-center backdrop-blur-sm">
                          <div className="text-center">
                            <div className="text-5xl text-[#00EAFF] mb-2">{p}</div>
                            <div className="text-lg text-gray-400">p (prime)</div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-3xl border-2 border-[#00EAFF] blur-xl"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="relative"
                      >
                        <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-[#00FFB3]/20 to-[#6C24FF]/20 border-2 border-[#00FFB3] flex items-center justify-center backdrop-blur-sm">
                          <div className="text-center">
                            <div className="text-5xl text-[#00FFB3] mb-2">{q}</div>
                            <div className="text-lg text-gray-400">q (prime)</div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          className="absolute inset-0 rounded-3xl border-2 border-[#00FFB3] blur-xl"
                        />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30"
                    >
                      <p className="text-red-400 flex items-center gap-2">
                        <Lock className="w-5 h-5" />
                        These must remain SECRET!
                      </p>
                    </motion.div>
                  </div>
                )}

                {/* Step 3: Compute n */}
                {currentStep === 3 && (
                  <div className="flex flex-col items-center gap-12">
                    <h2 className="text-2xl text-[#00EAFF] mb-4">Computing the Modulus (n)</h2>
                    <div className="flex items-center gap-8">
                      <motion.div
                        initial={{ x: -200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#00EAFF]/20 to-[#00FFB3]/20 border-2 border-[#00EAFF] flex items-center justify-center"
                      >
                        <div className="text-4xl text-[#00EAFF]">{p}</div>
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="text-4xl text-white"
                      >
                        ×
                      </motion.div>

                      <motion.div
                        initial={{ x: 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#00FFB3]/20 to-[#6C24FF]/20 border-2 border-[#00FFB3] flex items-center justify-center"
                      >
                        <div className="text-4xl text-[#00FFB3]">{q}</div>
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.3 }}
                        className="text-4xl text-white"
                      >
                        =
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                        className="relative"
                      >
                        <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-[#6C24FF]/20 to-[#00FFD5]/20 border-2 border-[#6C24FF] flex items-center justify-center backdrop-blur-sm">
                          <div className="text-center">
                            <div className="text-5xl text-[#6C24FF] mb-2">{n}</div>
                            <div className="text-lg text-gray-400">n (modulus)</div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 rounded-3xl border-t-2 border-r-2 border-[#6C24FF] blur-sm"
                        />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 }}
                      className="px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/30"
                    >
                      <p className="text-green-400">✓ Safe to share publicly!</p>
                    </motion.div>
                  </div>
                )}

                {/* Step 4: Compute φ(n) */}
                {currentStep === 4 && (
                  <div className="flex flex-col items-center gap-12">
                    <h2 className="text-2xl text-[#00EAFF] mb-4">Computing Euler's Totient φ(n)</h2>
                    <div className="space-y-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center justify-center gap-4 text-3xl"
                      >
                        <span className="text-[#00EAFF]">φ(n) = (p - 1) × (q - 1)</span>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex items-center justify-center gap-4 text-2xl text-gray-400"
                      >
                        <span>φ({n}) = ({p} - 1) × ({q} - 1)</span>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex items-center justify-center gap-4 text-2xl text-gray-400"
                      >
                        <span>φ({n}) = {p - 1} × {q - 1}</span>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                        className="flex justify-center"
                      >
                        <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-[#00FFB3]/20 to-[#6C24FF]/20 border-4 border-[#00FFB3] flex items-center justify-center backdrop-blur-sm relative">
                          <div className="text-center">
                            <div className="text-6xl text-[#00FFB3] mb-2">{phi}</div>
                            <div className="text-xl text-gray-400">φ(n)</div>
                          </div>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-3xl border-t-4 border-r-4 border-[#00FFB3]"
                          />
                        </div>
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 }}
                      className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30"
                    >
                      <p className="text-red-400 flex items-center gap-2">
                        <Lock className="w-5 h-5" />
                        Keep φ(n) SECRET!
                      </p>
                    </motion.div>
                  </div>
                )}

                {/* Step 5: Choose e */}
                {currentStep === 5 && (
                  <div className="flex flex-col items-center gap-12">
                    <h2 className="text-2xl text-[#00EAFF] mb-4">Choosing Public Exponent (e)</h2>
                    <div className="space-y-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-xl text-gray-400 max-w-2xl"
                      >
                        <p className="mb-4">Requirements for e:</p>
                        <ul className="space-y-2 text-left">
                          <motion.li
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-2"
                          >
                            <span className="text-[#00FFB3]">✓</span> 1 &lt; e &lt; φ(n)
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex items-center gap-2"
                          >
                            <span className="text-[#00FFB3]">✓</span> e and φ(n) share no common factors
                          </motion.li>
                        </ul>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="relative"
                      >
                        <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-[#6C24FF]/20 to-[#00FFD5]/20 border-4 border-[#6C24FF] flex items-center justify-center backdrop-blur-sm">
                          <div className="text-center">
                            <div className="text-6xl text-[#6C24FF] mb-2">{e}</div>
                            <div className="text-xl text-gray-400">e</div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.8, 0.3]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-3xl border-4 border-[#6C24FF] blur-xl"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#6C24FF]/10 to-[#00FFD5]/10 border border-[#6C24FF]/30"
                      >
                        <p className="text-[#00EAFF] text-lg">
                          e = {e} will be part of the PUBLIC KEY
                        </p>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Step 6: Compute d */}
                {currentStep === 6 && (
                  <div className="flex flex-col items-center gap-12">
                    <h2 className="text-2xl text-[#00EAFF] mb-4">Computing Private Exponent (d)</h2>
                    <div className="space-y-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-xl text-gray-400"
                      >
                        <p className="mb-2">Find d such that:</p>
                        <p className="text-2xl text-[#00EAFF]">(e × d) mod φ(n) = 1</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl text-gray-400"
                      >
                        <p>({e} × d) mod {phi} = 1</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, delay: 1, type: "spring" }}
                        className="relative"
                      >
                        <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-[#FF006B]/20 to-[#6C24FF]/20 border-4 border-[#FF006B] flex items-center justify-center backdrop-blur-sm">
                          <div className="text-center">
                            <div className="text-5xl text-[#FF006B] mb-2">{d}</div>
                            <div className="text-xl text-gray-400">d (private)</div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 rounded-3xl"
                          style={{
                            background: 'conic-gradient(from 0deg, transparent 0deg, #FF006B 90deg, transparent 180deg)',
                            filter: 'blur(20px)',
                          }}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 }}
                        className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30"
                      >
                        <p className="text-red-400 flex items-center gap-2">
                          <Lock className="w-5 h-5" />
                          d must NEVER be shared!
                        </p>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Step 7: Keys Complete */}
                {currentStep === 7 && (
                  <div className="flex flex-col items-center gap-12">
                    <motion.h2
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-3xl bg-gradient-to-r from-[#00EAFF] to-[#00FFB3] bg-clip-text text-transparent"
                    >
                      🎉 Keys Successfully Generated! 🎉
                    </motion.h2>

                    <div className="flex gap-12 items-start">
                      {/* Public Key */}
                      <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                      >
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#00EAFF]/20 to-[#00FFB3]/20 border-4 border-[#00EAFF] backdrop-blur-sm">
                          <div className="flex items-center gap-3 mb-6">
                            <Key className="w-8 h-8 text-[#00EAFF]" />
                            <h3 className="text-2xl text-[#00EAFF]">Public Key</h3>
                          </div>
                          <div className="space-y-4 text-center">
                            <div className="text-5xl text-white">(e, n)</div>
                            <div className="text-3xl text-[#00FFB3]">
                              ({e}, {n})
                            </div>
                            <div className="mt-6 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
                              <p className="text-green-400 text-sm">✓ Share with everyone!</p>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-3xl border-4 border-[#00EAFF] blur-2xl opacity-50"
                        />
                      </motion.div>

                      {/* Private Key */}
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="relative"
                      >
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FF006B]/20 to-[#6C24FF]/20 border-4 border-[#FF006B] backdrop-blur-sm">
                          <div className="flex items-center gap-3 mb-6">
                            <Lock className="w-8 h-8 text-[#FF006B]" />
                            <h3 className="text-2xl text-[#FF006B]">Private Key</h3>
                          </div>
                          <div className="space-y-4 text-center">
                            <div className="text-5xl text-white">(d, n)</div>
                            <div className="text-3xl text-[#FF006B]">
                              ({d}, {n})
                            </div>
                            <div className="mt-6 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30">
                              <p className="text-red-400 text-sm">🔒 Keep SECRET!</p>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          className="absolute inset-0 rounded-3xl border-4 border-[#FF006B] blur-2xl opacity-50"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="flex items-center gap-6 text-xl"
                    >
                      <div className="flex items-center gap-3">
                        <User className="w-12 h-12 text-[#6C24FF]" />
                        <span className="text-gray-300">Ahmed</span>
                      </div>
                      <ArrowRight className="w-8 h-8 text-[#00EAFF]" />
                      <Lock className="w-10 h-10 text-[#00FFB3]" />
                      <ArrowRight className="w-8 h-8 text-[#00EAFF]" />
                      <div className="flex items-center gap-3">
                        <User className="w-12 h-12 text-[#00EAFF]" />
                        <span className="text-gray-300">Omar</span>
                      </div>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="text-gray-400 text-lg"
                    >
                      Ahmed can now encrypt messages using Omar's public key!
                    </motion.p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Narration Box - Inside the canvas at the bottom */}
          <div className="relative z-20 px-8 pb-6">
            <NarrationBox text={steps[currentStep - 1].narration} isFullscreen={false} />
          </div>
        </div>

        {/* Continue Button - Only shown on final step */}
        {currentStep === totalSteps && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center my-8"
          >
            <button
              onClick={() => {
                setKeys({ p, q, n, phi, e, d });
                onNavigate('encryption');
              }}
              className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#00EAFF] to-[#00FFB3] hover:shadow-2xl hover:shadow-[#00EAFF]/50 transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-white text-lg">Continue to Encryption</span>
              <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        )}

        {/* Control Bar */}
        <ControlBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onReplay={handleReplay}
          onRestart={handleRestart}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          speed={speed}
          onSpeedChange={setSpeed}
        />
      </div>
    </div>
  );
}