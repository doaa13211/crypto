"use client"
import { motion } from "framer-motion"
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from "lucide-react"

interface ControlsProps {
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  speed: number
  setSpeed: (speed: number) => void
  onPreviousStep?: () => void
  onNextStep: () => void
  onReplay: () => void
  canGoPrevious?: boolean
  canGoNext?: boolean
}

export default function Controls({
  isPlaying,
  setIsPlaying,
  speed,
  setSpeed,
  onPreviousStep,
  onNextStep,
  onReplay,
  canGoPrevious = true,
  canGoNext = true,
}: ControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl shadow-cyan-500/20"
    >
      <div className="flex flex-col gap-4">
        {/* Button Row */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* Previous Step Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPreviousStep}
            disabled={!canGoPrevious}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              canGoPrevious
                ? "bg-slate-700 hover:bg-slate-600 text-cyan-400"
                : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50"
            }`}
          >
            <ChevronLeft size={20} />
            Previous
          </motion.button>

          {/* Play/Pause Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${
              isPlaying ? "bg-orange-600 hover:bg-orange-700 text-white" : "bg-cyan-600 hover:bg-cyan-700 text-white"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause size={20} />
                Pause
              </>
            ) : (
              <>
                <Play size={20} />
                Play
              </>
            )}
          </motion.button>

          {/* Replay Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReplay}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-slate-700 hover:bg-slate-600 text-cyan-400 transition-all"
          >
            <RotateCcw size={20} />
            Replay
          </motion.button>

          {/* Next Step Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNextStep}
            disabled={!canGoNext}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              canGoNext
                ? "bg-slate-700 hover:bg-slate-600 text-cyan-400"
                : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50"
            }`}
          >
            Next
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-slate-300 whitespace-nowrap">Animation Speed:</span>
          <input
            type="range"
            min="0.25"
            max="2"
            step="0.25"
            value={speed}
            onChange={(e) => setSpeed(Number.parseFloat(e.target.value))}
            className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <span className="text-sm font-semibold text-cyan-400 w-12 text-right">{speed.toFixed(2)}x</span>
        </div>

        {/* Info Text */}
        <p className="text-xs text-slate-400 text-center">
          Use the navigation buttons or click the step tabs to explore each part of the RSA algorithm. Play the
          animations to see how encryption and decryption work step-by-step.
        </p>
      </div>
    </motion.div>
  )
}
