import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StepIndicator } from '../components/StepIndicator';
import { NarrationBox } from '../components/NarrationBox';
import { ControlBar } from '../components/ControlBar';
import { ParticleBackground } from '../components/ParticleBackground';
import { Unlock, Sparkles, CheckCircle, Lock, User, ArrowRight, Mail, Key } from 'lucide-react';
import { useRSA } from '../contexts/RSAContext';

export function Decryption() {
  const [currentStep, setCurrentStep] = useState(1);
  const [animationKey, setAnimationKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const { d, n, message, ciphertext } = useRSA();

  const totalSteps = 5;
  
  // Function to decrypt a value
  const decryptValue = (encrypted: number) => {
    // Simple modular exponentiation (for demo purposes)
    let result = 1;
    for (let i = 0; i < d; i++) {
      result = (result * encrypted) % n;
    }
    return result;
  };

  // Create character data from ciphertext
  const chars = ciphertext.map((encrypted, idx) => {
    const decrypted = decryptValue(encrypted);
    return {
      char: message[idx] || '?',
      ascii: decrypted,
      encrypted: encrypted
    };
  });

  const steps = [
    {
      title: 'The Story Continues: Omar Receives the Message',
      narration: `Omar receives the encrypted message [${chars.map(c => c.encrypted).join(', ')}] from Ahmed. It looks like random numbers! Only Omar's PRIVATE KEY (d=${d}, n=${n}) can decrypt it. Let's see how Omar recovers the original message!`,
    },
    {
      title: 'Step 1: Encrypted Message Arrives',
      narration: `The ciphertext [${chars.map(c => c.encrypted).join(', ')}] arrives safely. This is unreadable to everyone - even if intercepted! Only Omar can decrypt it because only he has the private key.`,
    },
    {
      title: 'Step 2: Applying Decryption Formula',
      narration: `Omar applies the RSA decryption formula: M = C^d mod n. Using his PRIVATE KEY (d=${d}, n=${n}), each encrypted number is raised to power ${d} and divided by ${n}, keeping the remainder. This magical formula reverses the encryption!`,
    },
    {
      title: 'Step 3: ASCII Values Recovered',
      narration: `The decryption reveals ASCII numbers [${chars.map(c => c.ascii).join(', ')}]. These are the original number representations of the message. Now Omar just needs to convert them back to letters!`,
    },
    {
      title: 'Step 4: Original Message Revealed!',
      narration: `Success! Omar has recovered Ahmed's original message: "${message}". The RSA encryption worked perfectly - the message traveled securely and only Omar could read it with his private key! 🎉`,
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
              RSA Decryption Story
            </span>
          </h1>
          <p className="text-gray-400">Watch Omar decrypt Ahmed's secret message!</p>
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
                    <motion.h2
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl text-[#00EAFF]"
                    >
                      Omar Receives an Encrypted Message
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

                      {/* Encrypted Message */}
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                      >
                        <ArrowRight className="w-12 h-12 text-[#FF006B]" />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="relative"
                      >
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FF006B]/20 to-[#6C24FF]/20 border-2 border-[#FF006B]">
                          <Lock className="w-12 h-12 text-[#FF006B] mb-2" />
                          <p className="text-2xl text-[#FF006B]">[{chars.map(c => c.encrypted).join(', ')}]</p>
                          <p className="text-sm text-gray-400 mt-2">Encrypted</p>
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-2xl border-2 border-[#FF006B] blur-xl"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1, duration: 1 }}
                      >
                        <ArrowRight className="w-12 h-12 text-[#FF006B]" />
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

                    {/* Omar's Private Key */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                      className="p-6 rounded-2xl bg-gradient-to-br from-[#FF006B]/10 to-[#6C24FF]/10 border border-[#FF006B]/30"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Key className="w-6 h-6 text-[#FF006B]" />
                        <span className="text-[#FF006B]">Omar's Private Key (SECRET):</span>
                      </div>
                      <p className="text-2xl text-white">(d, n) = ({d}, {n})</p>
                    </motion.div>
                  </div>
                )}

                {/* Step 2: Ciphertext Input */}
                {currentStep === 2 && (
                  <div className="flex flex-col items-center gap-12">
                    <h2 className="text-2xl text-[#FF006B] mb-4">The Encrypted Message (Ciphertext)</h2>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="flex items-center gap-3 mb-8"
                    >
                      <Lock className="w-8 h-8 text-[#FF006B]" />
                      <span className="text-2xl text-[#FF006B]">Encrypted Message</span>
                    </motion.div>

                    <div className="flex gap-8">
                      {chars.map((char, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
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
                            animate={{ 
                              boxShadow: [
                                '0 0 20px rgba(255, 0, 107, 0.3)',
                                '0 0 40px rgba(255, 0, 107, 0.6)',
                                '0 0 20px rgba(255, 0, 107, 0.3)',
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                            className="absolute inset-0 rounded-3xl"
                          />
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="px-6 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30"
                    >
                      <p className="text-yellow-400">❓ Looks like random numbers - unreadable!</p>
                    </motion.div>
                  </div>
                )}

                {/* Step 3: Apply Decryption */}
                {currentStep === 3 && (
                  <div className="flex flex-col items-center gap-12">
                    <h2 className="text-2xl text-[#6C24FF] mb-4">Applying Decryption Formula</h2>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-8 rounded-2xl bg-gradient-to-br from-[#6C24FF]/20 to-[#00FFD5]/20 border-2 border-[#6C24FF]"
                    >
                      <p className="text-3xl text-center text-[#6C24FF] mb-4">
                        M = C<sup>d</sup> mod n
                      </p>
                      <p className="text-xl text-gray-400 text-center">
                        M = C<sup>{d}</sup> mod {n}
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
                          {/* Encrypted */}
                          <motion.div
                            className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#FF006B]/20 to-[#6C24FF]/20 border-2 border-[#FF006B] flex items-center justify-center"
                          >
                            <div className="text-2xl text-[#FF006B]">{char.encrypted}</div>
                          </motion.div>

                          {/* Unlock Icon */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1, rotate: -360 }}
                            transition={{ delay: 0.5 + idx * 0.4, duration: 1 }}
                            className="relative"
                          >
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6C24FF]/30 to-[#00FFD5]/30 border-4 border-[#6C24FF] flex items-center justify-center backdrop-blur-sm">
                              <Unlock className="w-12 h-12 text-[#6C24FF]" />
                            </div>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 rounded-full border-t-4 border-[#6C24FF]"
                            />
                          </motion.div>

                          {/* Decrypted ASCII */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5 + idx * 0.4 }}
                            className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#00EAFF]/20 to-[#6C24FF]/20 border-2 border-[#00EAFF] flex items-center justify-center"
                          >
                            <div className="text-xl text-[#00EAFF]">{char.ascii}</div>
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
                      <p className="text-[#6C24FF]">🔓 Decryption in progress...</p>
                    </motion.div>
                  </div>
                )}

                {/* Step 4: ASCII Recovered */}
                {currentStep === 4 && (
                  <div className="flex flex-col items-center gap-12">
                    <h2 className="text-2xl text-[#00EAFF] mb-4">ASCII Values Recovered!</h2>

                    <div className="flex gap-12">
                      {chars.map((char, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: idx * 0.3 }}
                          className="relative flex flex-col items-center gap-6"
                        >
                          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#00EAFF]/20 to-[#6C24FF]/20 border-2 border-[#00EAFF] flex items-center justify-center backdrop-blur-sm">
                            <div className="text-center">
                              <div className="text-5xl text-[#00EAFF] mb-2">{char.ascii}</div>
                              <div className="text-xl text-gray-400">ASCII</div>
                            </div>
                          </div>

                          <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 + idx * 0.3 }}
                            className="w-0.5 h-12 bg-gradient-to-b from-[#00EAFF] to-[#00FFB3]"
                          />

                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1 + idx * 0.3 }}
                            className="relative"
                          >
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00FFB3]/20 to-[#00EAFF]/20 border-2 border-[#00FFB3] flex items-center justify-center">
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.3 + idx * 0.3 }}
                                className="text-5xl text-[#00FFB3]"
                              >
                                {char.char}
                              </motion.div>
                            </div>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 rounded-2xl border-t-2 border-r-2 border-[#00FFB3]"
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
                      <p className="text-xl">Converting ASCII to text...</p>
                    </motion.div>
                  </div>
                )}

                {/* Step 5: Message Recovered */}
                {currentStep === 5 && (
                  <div className="flex flex-col items-center gap-12">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <h2 className="text-3xl bg-gradient-to-r from-[#00EAFF] to-[#00FFB3] bg-clip-text text-transparent flex items-center gap-3">
                        <CheckCircle className="w-10 h-10 text-[#00FFB3]" />
                        Message Successfully Decrypted!
                      </h2>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 1, delay: 0.3, type: "spring" }}
                      className="relative"
                    >
                      <div className="p-16 rounded-3xl bg-gradient-to-br from-[#00FFB3]/20 to-[#00EAFF]/20 border-4 border-[#00FFB3] backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-6">
                          <Mail className="w-12 h-12 text-[#00FFB3]" />
                          <span className="text-2xl text-gray-300">Original Message:</span>
                        </div>
                        <p className="text-7xl text-[#00FFB3]">"{message}"</p>
                      </div>
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-3xl border-4 border-[#00FFB3] blur-3xl"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex flex-col items-center gap-6"
                    >
                      <div className="flex items-center gap-8 text-xl">
                        <div className="flex items-center gap-2">
                          <User className="w-10 h-10 text-[#6C24FF]" />
                          <span className="text-gray-300">Ahmed</span>
                        </div>
                        <ArrowRight className="w-8 h-8 text-[#00FFB3]" />
                        <div className="px-4 py-2 rounded-lg bg-[#00FFB3]/20 border border-[#00FFB3]">
                          <CheckCircle className="w-8 h-8 text-[#00FFB3]" />
                        </div>
                        <ArrowRight className="w-8 h-8 text-[#00FFB3]" />
                        <div className="flex items-center gap-2">
                          <User className="w-10 h-10 text-[#00EAFF]" />
                          <span className="text-gray-300">Omar</span>
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 }}
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00FFB3]/10 to-[#00EAFF]/10 border border-[#00FFB3]/30"
                      >
                        <p className="text-[#00FFB3] text-lg flex items-center gap-2">
                          <Sparkles className="w-6 h-6" />
                          RSA Encryption & Decryption Complete! 🎉
                        </p>
                      </motion.div>

                      <p className="text-gray-400 text-center max-w-2xl">
                        The message was sent securely through the internet. Even if intercepted,<br/>
                        only Omar could decrypt it with his private key!
                      </p>
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