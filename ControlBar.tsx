import { ChevronLeft, ChevronRight, RotateCcw, RefreshCw, Play, Pause, Maximize } from 'lucide-react';

interface ControlBarProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onReplay: () => void;
  onRestart: () => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  onFullscreen?: () => void;
  isFullscreen?: boolean;
}

export function ControlBar({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onReplay,
  onRestart,
  isPlaying,
  onPlayPause,
  speed,
  onSpeedChange,
  onFullscreen,
  isFullscreen,
}: ControlBarProps) {
  return (
    <div className={`flex flex-col gap-6 ${isFullscreen ? 'scale-125' : ''}`}>
      {/* Speed Control */}
      <div className="flex items-center justify-center gap-4">
        <span className={`text-gray-400 ${isFullscreen ? 'text-lg' : 'text-sm'}`}>Speed:</span>
        <div className="flex gap-2">
          {[0.5, 1, 1.5, 2].map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-5 py-2.5 rounded-lg border transition-all duration-300 ${
                speed === s
                  ? 'bg-[#00EAFF]/20 border-[#00EAFF] text-[#00EAFF] shadow-lg shadow-[#00EAFF]/30'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-[#00EAFF]/50'
              } ${isFullscreen ? 'text-lg' : ''}`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {/* Fullscreen Button */}
        {onFullscreen && (
          <button
            onClick={onFullscreen}
            className="group p-4 rounded-xl bg-white/5 border border-[#00FFB3]/30 hover:border-[#00FFB3] hover:shadow-lg hover:shadow-[#00FFB3]/30 transition-all duration-300"
            title="Fullscreen"
          >
            <Maximize className={`text-[#00FFB3] ${isFullscreen ? 'w-7 h-7' : 'w-5 h-5'}`} />
          </button>
        )}

        {/* Previous */}
        <button
          onClick={onPrevious}
          disabled={currentStep === 1}
          className={`group flex items-center gap-2 px-6 py-4 rounded-xl bg-white/5 border border-[#00EAFF]/30 hover:border-[#00EAFF] hover:shadow-lg hover:shadow-[#00EAFF]/30 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#00EAFF]/30 disabled:hover:shadow-none ${
            isFullscreen ? 'text-lg' : ''
          }`}
        >
          <ChevronLeft className={`text-[#00EAFF] group-hover:-translate-x-1 transition-transform ${isFullscreen ? 'w-7 h-7' : 'w-5 h-5'}`} />
          <span className="text-white">Previous</span>
        </button>

        {/* Play/Pause */}
        <button
          onClick={onPlayPause}
          className={`group p-5 rounded-xl bg-gradient-to-r from-[#6C24FF] to-[#00FFD5] hover:shadow-2xl hover:shadow-[#00EAFF]/50 transition-all duration-300 ${
            isPlaying ? 'ring-4 ring-[#00EAFF]/50' : ''
          }`}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className={`text-white ${isFullscreen ? 'w-8 h-8' : 'w-6 h-6'}`} />
          ) : (
            <Play className={`text-white ${isFullscreen ? 'w-8 h-8' : 'w-6 h-6'}`} />
          )}
        </button>

        {/* Replay */}
        <button
          onClick={onReplay}
          className="group p-4 rounded-xl bg-white/5 border border-[#00FFB3]/30 hover:border-[#00FFB3] hover:shadow-lg hover:shadow-[#00FFB3]/30 transition-all duration-300"
          title="Replay Step"
        >
          <RotateCcw className={`text-[#00FFB3] group-hover:rotate-180 transition-transform duration-500 ${isFullscreen ? 'w-7 h-7' : 'w-5 h-5'}`} />
        </button>

        {/* Restart */}
        <button
          onClick={onRestart}
          className="group p-4 rounded-xl bg-white/5 border border-[#6C24FF]/30 hover:border-[#6C24FF] hover:shadow-lg hover:shadow-[#6C24FF]/30 transition-all duration-300"
          title="Restart"
        >
          <RefreshCw className={`text-[#6C24FF] group-hover:rotate-180 transition-transform duration-500 ${isFullscreen ? 'w-7 h-7' : 'w-5 h-5'}`} />
        </button>

        {/* Next */}
        <button
          onClick={onNext}
          disabled={currentStep === totalSteps}
          className={`group flex items-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#6C24FF] to-[#00FFD5] hover:shadow-2xl hover:shadow-[#00EAFF]/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none ${
            isFullscreen ? 'text-lg' : ''
          }`}
        >
          <span className="text-white">Next</span>
          <ChevronRight className={`text-white group-hover:translate-x-1 transition-transform ${isFullscreen ? 'w-7 h-7' : 'w-5 h-5'}`} />
        </button>
      </div>
    </div>
  );
}