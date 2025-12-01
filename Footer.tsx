import { Lock, Github, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-[#00EAFF]/20 bg-[#0A0F1F]/50 backdrop-blur-md mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#6C24FF] to-[#00FFD5]">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-[#00EAFF] to-[#00FFB3] bg-clip-text text-transparent">
                RSA Visualization
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              An interactive educational platform for understanding RSA cryptography through visual animations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#00EAFF] mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-[#00FFB3] transition-colors cursor-pointer">Home</li>
              <li className="hover:text-[#00FFB3] transition-colors cursor-pointer">RSA Algorithm</li>
              <li className="hover:text-[#00FFB3] transition-colors cursor-pointer">Visualizations</li>
              <li className="hover:text-[#00FFB3] transition-colors cursor-pointer">About Team</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#00EAFF] mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 rounded-lg bg-white/5 border border-[#00EAFF]/30 hover:border-[#00EAFF] hover:shadow-lg hover:shadow-[#00EAFF]/30 transition-all duration-300"
              >
                <Github className="w-5 h-5 text-[#00EAFF]" />
              </a>
              <a
                href="#"
                className="p-3 rounded-lg bg-white/5 border border-[#00FFB3]/30 hover:border-[#00FFB3] hover:shadow-lg hover:shadow-[#00FFB3]/30 transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-[#00FFB3]" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#00EAFF]/10 text-center text-sm text-gray-500">
          <p>© 2025 RSA Cryptography Visualization Project. Supervised by Prof. Wael Abd-Elqader Awad</p>
        </div>
      </div>
    </footer>
  );
}
