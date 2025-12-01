import { Menu, X, Lock } from 'lucide-react';
import { useState } from 'react';
import { Page } from '../App';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as Page, label: 'Home' },
    { id: 'algorithm' as Page, label: 'RSA Algorithm' },
    { id: 'key-generation' as Page, label: 'Key Generation' },
    { id: 'encryption' as Page, label: 'Encryption' },
    { id: 'decryption' as Page, label: 'Decryption' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0A0F1F]/80 border-b border-[#00EAFF]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#6C24FF] to-[#00FFD5] group-hover:shadow-lg group-hover:shadow-[#00EAFF]/50 transition-all duration-300">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-[#00EAFF] to-[#00FFB3] bg-clip-text text-transparent">
              RSA Visualization
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-[#6C24FF] to-[#00FFD5] text-white shadow-lg shadow-[#6C24FF]/30'
                    : 'text-gray-300 hover:text-[#00EAFF] hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#00EAFF] hover:bg-white/5 transition-all"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[#00EAFF]/20 bg-[#0A0F1F]/95 backdrop-blur-lg">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-[#6C24FF] to-[#00FFD5] text-white'
                    : 'text-gray-300 hover:text-[#00EAFF] hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
