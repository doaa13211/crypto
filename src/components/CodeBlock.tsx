import { motion } from 'motion/react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'python' }: CodeBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative rounded-xl overflow-hidden shadow-2xl"
      style={{ backgroundColor: '#1e1e1e' }}
    >
      {/* VS Code Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="ml-2 text-sm text-gray-400">{language}</span>
      </div>
      
      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre className="p-6 text-sm leading-relaxed" style={{ fontFamily: 'Fira Code, Consolas, Monaco, monospace' }}>
          <code className="text-gray-300">{code}</code>
        </pre>
      </div>
    </motion.div>
  );
}
