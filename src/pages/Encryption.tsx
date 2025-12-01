import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StepIndicator } from '../components/StepIndicator';
import { NarrationBox } from '../components/NarrationBox';
import { ControlBar } from '../components/ControlBar';
import { ParticleBackground } from '../components/ParticleBackground';
import { Lock, Zap, User, ArrowRight, Mail, Key } from 'lucide-react';
import { useRSA } from '../contexts/RSAContext';
import { Page } from '../App';

interface EncryptionProps {
  onNavigate: (page: Page) => void;
}

export function Encryption({ onNavigate }: EncryptionProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [animationKey, setAnimationKey] = useState(0);
  const [customMessage, setCustomMessage] = useState("HI");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const { e, n, setEncryptedMessage } = useRSA();

  const totalSteps = 5;
  
  // Function to convert text to encrypted values
  const encryptChar = (char: string) => {
    const ascii = char.charCodeAt(0);
    // Simple modular exponentiation (for demo purposes with small values)
    let result = 1;
    for (let i = 0; i < e; i++) {
      result = (result * ascii) % n;
    }
    return result;
  };

  // Convert message to character data
  const chars = customMessage.split('').map(char => ({
    char: char,
    ascii: char.charCodeAt(0),
    encrypted: encryptChar(char)
  }));

  const steps = [
    {
      title: 'The Story: Ahmed Wants to Send a Secret Message',
      narration: `Ahmed wants to send a secret message "${customMessage}" to his friend Omar. Omar has already shared his PUBLIC KEY (e=${e}, n=${n}) with Ahmed. Now Ahmed will use this public key to encrypt his message!`,
    },
    {
      title: 'Step 1: The Original Message',
      narration: `Ahmed's message is "${customMessage}". This is called PLAINTEXT - the original readable message that needs to be encrypted before sending.`,
    },
    {
      title: 'Step 2: Converting to Numbers (ASCII)',
      narration: `Computers understand numbers, not letters! Each character is converted to its ASCII value. For example: 'H' = 72, 'I' = 73. These numbers become our message blocks (M).`,
    },
    {
      title: 'Step 3: Applying Encryption Formula',
      narration: `Ahmed applies the RSA encryption formula: C = M^e mod n. Using Omar's public key (e=${e}, n=${n}), each ASCII value is raised to power ${e} and then divided by ${n}, keeping only the remainder. This mathematical magic scrambles the message!`,
    },
    {
      title: 'Step 4: Encrypted Message Ready!',
      narration: `Success! The message "${customMessage}" is now encrypted into numbers that look random: [${chars.map(c => c.encrypted).join(', ')}]. This is called CIPHERTEXT. Ahmed can safely send this to Omar. Only Omar's PRIVATE KEY can decrypt it!`,
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
              RSA Encryption Story
            </span>
          </h1>
          <p className="text-gray-400">Watch Ahmed encrypt a message for Omar!</p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex justify-end mb-8">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {/* Custom Message Input */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-gradient-to-br from-[#6C24FF]/10 to-[#00FFD5]/10 border border-[#00EAFF]/30">
            <label className="block text-[#00EAFF] mb-3">
              Enter Ahmed's message to Omar (max 20 characters):
            </label>
            <input
              type="text"
              value={customMessage}
              onChange={(e) => {
                const value = e.target.value.slice(0, 20);
                setCustomMessage(value);
                setCurrentStep(1);
                setAnimationKey(animationKey + 1);
              }}
              maxLength={20}
              className="w-full px-4 py-3 rounded-xl bg-[#0A0F1F]/50 border border-[#00EAFF]/30 text-white placeholder-gray-500 focus:border-[#00EAFF] focus:outline-none focus:ring-2 focus:ring-[#00EAFF]/50 transition-all"
              placeholder="Enter text..."
            />
            <div className="mt-2 text-right text-sm text-gray-400">
              {customMessage.length} / 20 characters
            </div>
          </div>
        </motion.div>

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
                    <motion.h2
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl text-[#00EAFF]"
                    >
                      Ahmed Wants to Send a Secret Message
                    </motion.h2>

                    <div className="flex items-center gap-12">
                      {/* Ahmed */}
                      <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                      >
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#6C24FF]/20 to-[#00FFD5]/20 border-4 border-[#6C24FF] flex items-center justify-center backdrop-blur-sm mb-4">
                          <User className="w-16 h-16 text-[#6C24FF]" />
                        </div>
                        <h3 className="text-2xl text-[#6C24FF]">Ahmed</h3>
                        <p className="text-gray-400">(Sender)</p>
                      </motion.div>

                      {/* Message */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="relative"
                      >
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#00FFB3]/20 to-[#00EAFF]/20 border-2 border-[#00FFB3]">
                          <Mail className="w-12 h-12 text-[#00FFB3] mb-2" />
                          <p className="text-3xl text-white">"{customMessage}"</p>
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-2xl border-2 border-[#00FFB3] blur-xl"
                        />
                      </motion.div>

                      {/* Arrow */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      >
                        <ArrowRight className="w-12 h-12 text-[#00EAFF]" />
                      </motion.div>

                      {/* Omar */}
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-center"
                      >
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00EAFF]/20 to-[#00FFB3]/20 border-4 border-[#00EAFF] flex items-center justify-center backdrop-blur-sm mb-4">
                          <User className="w-16 h-16 text-[#00EAFF]" />
                        </div>
                        <h3 className="text-2xl text-[#00EAFF]">Omar</h3>
                        <p className="text-gray-400">(Receiver)</p>
                      </motion.div>
                    </div>

                    {/* Omar's Public Key */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="p-6 rounded-2xl bg-gradient-to-br from-[#00EAFF]/10 to-[#00FFB3]/10 border border-[#00EAFF]/30"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Key className="w-6 h-6 text-[#00EAFF]" />
                        <span className="text-[#00EAFF]">Omar's Public Key:</span>
                      </div>
                      <p className="text-2xl text-white">(e, n) = ({e}, {n})</p>
                    </motion.div>
                  </div>
                )}

                {/* Step 2: Plaintext */}
                {currentStep === 2 && (
                  <div className="flex flex-col items-center gap-12">
                    <h2 className="text-2xl text-[#00FFB3] mb-4">The Original Message (Plaintext)</h2>

                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      className="relative"
                    >
                      <div className="p-12 rounded-3xl bg-gradient-to-br from-[#00FFB3]/20 to-[#00EAFF]/20 border-4 border-[#00FFB3] backdrop-blur-sm">
                        <p className="text-6xl text-[#00FFB3] mb-4">"{customMessage}"</p>
                        <p className="text-xl text-gray-400">Original Message</p>
                      </div>
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-3xl border-4 border-[#00FFB3] blur-2xl"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex gap-6"
                    >
                      {customMessage.split('').map((char, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 + idx * 0.2 }}
                          className="w-20 h-20 rounded-xl bg-white/5 border border-[#00FFB3]/30 flex items-center justify-center"
                        >
                          <span className="text-4xl text-[#00FFB3]">{char}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="px-6 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30"
                    >
                      <p className="text-yellow-400">⚠️ Currently readable - not secure!</p>
                    </motion.div>
                  </div>
                )}

                {/* Step 3: ASCII Conversion */}
                {currentStep === 3 && (
                  <div className="flex flex-col items-center gap-12">
                    <h2 className="text-2xl text-[#00EAFF] mb-4">Converting to ASCII Numbers</h2>
                    
                    <div className="flex gap-12">
                      {chars.map((char, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: -50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: idx * 0.3 }}
                          className="relative flex flex-col items-center gap-6"
                        >
                          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00FFB3]/20 to-[#00EAFF]/20 border-2 border-[#00FFB3] flex items-center justify-center">
                            <div className="text-5xl text-[#00FFB3]">{char.char}</div>
                          </div>

                          <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 + idx * 0.3 }}
                            className="w-0.5 h-12 bg-gradient-to-b from-[#00FFB3] to-[#00EAFF]"
                          />

                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1 + idx * 0.3 }}
                            className="relative"
                          >
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00EAFF]/20 to-[#6C24FF]/20 border-2 border-[#00EAFF] flex items-center justify-center backdrop-blur-sm">
                              <div className="text-center">
                                <div className="text-3xl text-[#00EAFF]">{char.ascii}</div>
                                <div className="text-xs text-gray-400 mt-1">ASCII</div>
                              </div>
                            </div>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 rounded-2xl border-t-2 border-r-2 border-[#00EAFF]"
                            />
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 }}
                      className="text-center text-gray-400"
                    >
                      <p className="text-xl">Message Blocks (M): [{chars.map(c => c.ascii).join(', ')}]</p>
                    </motion.div>
                  </div>
                )}

                {/* Step 4: Encryption Process */}
                {currentStep === 4 && (
                  <div className="flex flex-col items-center gap-12">
                    <h2 className="text-2xl text-[#6C24FF] mb-4">Applying Encryption Formula</h2>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-8 rounded-2xl bg-gradient-to-br from-[#6C24FF]/20 to-[#00FFD5]/20 border-2 border-[#6C24FF]"
                    >
                      <p className="text-3xl text-center text-[#6C24FF] mb-4">
                        C = M<sup>e</sup> mod n
                      </p>
                      <p className="text-xl text-gray-400 text-center">
                        C = M<sup>{e}</sup> mod {n}
                      </p>
                    </motion.div>

                    <div className="flex gap-8">
                      {chars.map((char, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.4 }}
                          className="flex flex-col items-center gap-4"
                        >
                          <motion.div
                            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00EAFF]/20 to-[#6C24FF]/20 border-2 border-[#00EAFF] flex items-center justify-center"
                          >
                            <div className="text-2xl text-[#00EAFF]">{char.ascii}</div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1, rotate: 360 }}
                            transition={{ delay: 0.5 + idx * 0.4, duration: 1 }}
                            className="relative"
                          >
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6C24FF]/30 to-[#00FFD5]/30 border-4 border-[#6C24FF] flex items-center justify-center backdrop-blur-sm">
                              <Zap className="w-12 h-12 text-[#6C24FF]" />
                            </div>
                            <motion.div
                              animate={{ rotate: -360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 rounded-full border-t-4 border-[#6C24FF]"
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5 + idx * 0.4 }}
                            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#FF006B]/20 to-[#6C24FF]/20 border-2 border-[#FF006B] flex items-center justify-center"
                          >
                            <div className="text-xl text-[#FF006B]">{char.encrypted}</div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.5 }}
                      className="px-6 py-3 rounded-xl bg-[#6C24FF]/10 border border-[#6C24FF]/30"
                    >
                      <p className="text-[#6C24FF]">🔐 Encryption in progress...</p>
                    </motion.div>
                  </div>
                )}

                {/* Step 5: Ciphertext */}
                {currentStep === 5 && (
                  <div className="flex flex-col items-center gap-12">
                    <h2 className="text-2xl text-[#FF006B] mb-4">Encrypted Message (Ciphertext)</h2>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="flex items-center gap-3 mb-8"
                    >
                      <Lock className="w-8 h-8 text-[#FF006B]" />
                      <span className="text-2xl text-[#FF006B]">Encrypted & Secure!</span>
                    </motion.div>

                    <div className="flex gap-8">
                      {chars.map((char, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0, rotate: 180 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ 
                            duration: 0.8, 
                            delay: idx * 0.3,
                            type: "spring",
                            stiffness: 100
                          }}
                          className="relative"
                        >
                          <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-[#FF006B]/20 to-[#6C24FF]/20 border-4 border-[#FF006B] flex items-center justify-center backdrop-blur-sm">
                            <div className="text-center">
                              <div className="text-4xl text-[#FF006B] mb-2">{char.encrypted}</div>
                              <div className="text-xs text-gray-400">Block {idx + 1}</div>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-3xl"
                            style={{
                              background: 'conic-gradient(from 0deg, transparent 0deg, #FF006B 90deg, transparent 180deg)',
                              filter: 'blur(15px)',
                              opacity: 0.5,
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="mt-8"
                    >
                      <div className="px-12 py-6 rounded-2xl bg-gradient-to-r from-[#FF006B]/10 to-[#6C24FF]/10 border border-[#FF006B]/30">
                        <div className="text-center">
                          <div className="text-gray-400 mb-2">Ciphertext Array</div>
                          <div className="text-3xl text-[#FF006B]">
                            [{chars.map(c => c.encrypted).join(', ')}]
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#00FFB3]/10 border border-[#00FFB3]/30">
                        <div className="w-3 h-3 rounded-full bg-[#00FFB3] animate-pulse" />
                        <span className="text-[#00FFB3]">Message encrypted successfully!</span>
                      </div>

                      <div className="flex items-center gap-8 text-lg">
                        <div className="flex items-center gap-2">
                          <User className="w-8 h-8 text-[#6C24FF]" />
                          <span className="text-gray-300">Ahmed</span>
                        </div>
                        <ArrowRight className="w-6 h-6 text-[#FF006B]" />
                        <div className="px-4 py-2 rounded-lg bg-[#FF006B]/20 border border-[#FF006B]">
                          <Lock className="w-6 h-6 text-[#FF006B]" />
                        </div>
                        <ArrowRight className="w-6 h-6 text-[#FF006B]" />
                        <div className="flex items-center gap-2">
                          <User className="w-8 h-8 text-[#00EAFF]" />
                          <span className="text-gray-300">Omar</span>
                        </div>
                      </div>

                      <p className="text-gray-400 mt-2">Only Omar's private key can decrypt this!</p>
                    </motion.div>
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
                const ciphertext = chars.map(c => c.encrypted);
                setEncryptedMessage(customMessage, ciphertext);
                onNavigate('decryption');
              }}
              className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF006B] to-[#6C24FF] hover:shadow-2xl hover:shadow-[#FF006B]/50 transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-white text-lg">Continue to Decryption</span>
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