import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { RSAAlgorithm } from './pages/RSAAlgorithm';
import { KeyGeneration } from './pages/KeyGeneration';
import { Encryption } from './pages/Encryption';
import { Decryption } from './pages/Decryption';
import { RSAProvider } from './contexts/RSAContext';

export type Page = 'home' | 'algorithm' | 'key-generation' | 'encryption' | 'decryption';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'algorithm':
        return <RSAAlgorithm />;
      case 'key-generation':
        return <KeyGeneration onNavigate={setCurrentPage} />;
      case 'encryption':
        return <Encryption onNavigate={setCurrentPage} />;
      case 'decryption':
        return <Decryption />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <RSAProvider>
      <div className="min-h-screen bg-[#0A0F1F] text-white">
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="min-h-screen">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </RSAProvider>
  );
}