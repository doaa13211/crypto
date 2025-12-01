import { motion } from 'motion/react';

interface NarrationBoxProps {
  text: string;
  isFullscreen?: boolean;
}

export function NarrationBox({ text, isFullscreen }: NarrationBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full mx-auto px-8 py-6 rounded-2xl bg-[#0A0F1F]/90 backdrop-blur-md border border-[#00EAFF]/30 shadow-2xl shadow-[#00EAFF]/20 ${
        isFullscreen ? 'max-w-6xl' : 'max-w-4xl'
      }`}
    >
      <p className={`text-center text-white leading-relaxed ${
        isFullscreen ? 'text-2xl' : 'text-lg'
      }`}>
        {text}
      </p>
    </motion.div>
  );
}