import { motion } from 'motion/react';
import { Lock, Key, Shield, Download, Play, ArrowRight, CheckCircle, BookOpen, Lightbulb, Users, AlertCircle, ExternalLink, Video } from 'lucide-react';
import { ParticleBackground } from '../components/ParticleBackground';
import { CodeBlock } from '../components/CodeBlock';

export function RSAAlgorithm() {
  const steps = [
    { number: 1, title: 'Choose Primes', description: 'Select two large prime numbers p and q' },
    { number: 2, title: 'Calculate n', description: 'Compute n = p × q (modulus)' },
    { number: 3, title: 'Calculate φ(n)', description: 'φ(n) = (p - 1)(q - 1)' },
    { number: 4, title: 'Choose e', description: 'Pick e coprime with φ(n)' },
    { number: 5, title: 'Calculate d', description: 'Find d where d ≡ e⁻¹ (mod φ(n))' },
    { number: 6, title: 'Keys Ready', description: 'Public: (e, n), Private: (d, n)' },
  ];

  const sections = [
    {
      icon: BookOpen,
      title: 'What does Rivest–Shamir–Adleman mean?',
      content: 'RSA is named after its three inventors: Ron Rivest, Adi Shamir, and Leonard Adleman, who first publicly described the algorithm in 1977. Their groundbreaking work laid the foundation for modern public-key cryptography.',
      color: '#00EAFF',
    },
    {
      icon: Lock,
      title: 'What is RSA?',
      content: 'RSA is an asymmetric cryptographic algorithm used to encrypt and decrypt data. It uses two different keys: a public key for encryption and a private key for decryption. This revolutionary approach solved the key distribution problem.',
      color: '#00FFB3',
    },
    {
      icon: Lightbulb,
      title: 'Why RSA was created',
      content: 'Before RSA, secure communication required both parties to share a secret key. RSA introduced public-key cryptography, allowing secure communication without prior key exchange. This was revolutionary for internet security.',
      color: '#6C24FF',
    },
    {
      icon: Shield,
      title: 'The Big Idea: One-Way Function',
      content: 'RSA relies on the fact that multiplying large primes is easy, but factoring their product is extremely difficult. This mathematical asymmetry ensures that while encryption is fast, breaking the encryption without the key is computationally infeasible.',
      color: '#00EAFF',
    },
  ];

  return (
    <div className="relative min-h-screen pt-16">
      <ParticleBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#6C24FF]/20 to-[#00FFD5]/20 border border-[#00EAFF]/30 mb-8">
            <BookOpen className="w-5 h-5 text-[#00EAFF]" />
            <span className="text-[#00EAFF]">Educational Content</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl mb-6">
            <span className="bg-gradient-to-r from-[#00EAFF] via-[#00FFB3] to-[#6C24FF] bg-clip-text text-transparent">
              Understanding RSA
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive guide to the most widely used public-key cryptosystem
          </p>
        </motion.div>

        {/* Info Sections */}
        <div className="space-y-8 mb-20">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#00EAFF]/50 transition-all duration-300"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                style={{ background: `radial-gradient(circle at center, ${section.color}20, transparent)` }}
              />
              
              <div className="relative z-10 flex flex-col md:flex-row gap-6">
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ borderColor: `${section.color}30` }}
                >
                  <section.icon className="w-8 h-8" style={{ color: section.color }} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl mb-3 text-white">{section.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Generation Steps Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 bg-gradient-to-r from-[#00EAFF] to-[#00FFB3] bg-clip-text text-transparent">
              Key Generation Steps
            </h2>
            <p className="text-gray-400">The process of creating RSA key pairs</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00EAFF] to-[#00FFB3]" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className="flex-1 lg:w-5/12">
                    <div className="group relative p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-[#00EAFF]/30 hover:border-[#00EAFF] transition-all duration-300 hover:shadow-lg hover:shadow-[#00EAFF]/30">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#6C24FF] to-[#00FFD5] flex items-center justify-center">
                          <span className="text-white">{step.number}</span>
                        </div>
                        <div>
                          <h3 className="text-xl text-white mb-2">{step.title}</h3>
                          <p className="text-gray-400">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Circle */}
                  <div className="hidden lg:flex flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#6C24FF] to-[#00FFD5] items-center justify-center border-4 border-[#0A0F1F] z-10">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 lg:w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Formulas Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 bg-gradient-to-r from-[#00EAFF] to-[#00FFB3] bg-clip-text text-transparent">
              RSA Formulas
            </h2>
            <p className="text-gray-400">The mathematical foundation of encryption and decryption</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Encryption */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative p-10 rounded-2xl bg-gradient-to-br from-[#00EAFF]/10 to-[#00FFB3]/10 border border-[#00EAFF]/30"
            >
              <div className="absolute top-0 left-0 w-24 h-24 bg-[#00EAFF]/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-8 h-8 text-[#00EAFF]" />
                  <h3 className="text-2xl text-white">Encryption</h3>
                </div>
                <div className="p-6 rounded-xl bg-[#0A0F1F]/50 border border-[#00EAFF]/20 mb-4">
                  <p className="text-3xl text-center text-[#00EAFF] font-mono">
                    C = M<sup>e</sup> mod n
                  </p>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p><span className="text-[#00EAFF]">C</span> = Ciphertext (encrypted message)</p>
                  <p><span className="text-[#00EAFF]">M</span> = Message (plaintext)</p>
                  <p><span className="text-[#00EAFF]">e</span> = Public exponent</p>
                  <p><span className="text-[#00EAFF]">n</span> = Modulus (p × q)</p>
                </div>
              </div>
            </motion.div>

            {/* Decryption */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative p-10 rounded-2xl bg-gradient-to-br from-[#6C24FF]/10 to-[#00FFD5]/10 border border-[#00FFB3]/30"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00FFB3]/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Key className="w-8 h-8 text-[#00FFB3]" />
                  <h3 className="text-2xl text-white">Decryption</h3>
                </div>
                <div className="p-6 rounded-xl bg-[#0A0F1F]/50 border border-[#00FFB3]/20 mb-4">
                  <p className="text-3xl text-center text-[#00FFB3] font-mono">
                    M = C<sup>d</sup> mod n
                  </p>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p><span className="text-[#00FFB3]">M</span> = Message (recovered plaintext)</p>
                  <p><span className="text-[#00FFB3]">C</span> = Ciphertext</p>
                  <p><span className="text-[#00FFB3]">d</span> = Private exponent</p>
                  <p><span className="text-[#00FFB3]">n</span> = Modulus (p × q)</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Python Implementation Code Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl mb-4 bg-gradient-to-r from-[#00EAFF] to-[#00FFB3] bg-clip-text text-transparent">
              Python Implementation
            </h2>
            <p className="text-gray-400">Complete RSA algorithm implementation in Python</p>
          </div>
          
          <CodeBlock 
            language="python"
            code={`# Python Program for implementation of RSA Algorithm

def power(base, expo, m):
    res = 1
    base = base % m
    while expo > 0:
        if expo & 1:
            res = (res * base) % m
        base = (base * base) % m
        expo = expo // 2
    return res

# Function to find modular inverse of e modulo phi(n)
# Here we are calculating phi(n) using Hit and Trial Method
# but we can optimize it using Extended Euclidean Algorithm
def modInverse(e, phi):
    for d in range(2, phi):
        if (e * d) % phi == 1:
            return d
    return -1

# RSA Key Generation
def generateKeys():
    p = 7919
    q = 1009
    
    n = p * q
    phi = (p - 1) * (q - 1)

    # Choose e, where 1 < e < phi(n) and gcd(e, phi(n)) == 1
    e = 0
    for e in range(2, phi):
        if gcd(e, phi) == 1:
            break

    # Compute d such that e * d ≡ 1 (mod phi(n))
    d = modInverse(e, phi)

    return e, d, n

# Function to calculate gcd
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

# Encrypt message using public key (e, n)
def encrypt(m, e, n):
    return power(m, e, n)

# Decrypt message using private key (d, n)
def decrypt(c, d, n):
    return power(c, d, n)

# Main execution
if __name__ == "__main__":
    
    # Key Generation
    e, d, n = generateKeys()
  
    print(f"Public Key (e, n): ({e}, {n})")
    print(f"Private Key (d, n): ({d}, {n})")

    # Message
    M = 123
    print(f"Original Message: {M}")

    # Encrypt the message
    C = encrypt(M, e, n)
    print(f"Encrypted Message: {C}")

    # Decrypt the message
    decrypted = decrypt(C, d, n)
    print(f"Decrypted Message: {decrypted}")`}
          />
        </motion.div>

        {/* Security & Key Exchange */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Why RSA is Secure */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl bg-gradient-to-br from-[#6C24FF]/10 to-[#00FFD5]/10 border border-[#6C24FF]/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-[#6C24FF]" />
              <h3 className="text-2xl text-white">Why RSA is Secure</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#00FFB3] flex-shrink-0 mt-1" />
                <span>Based on the difficulty of factoring large numbers</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#00FFB3] flex-shrink-0 mt-1" />
                <span>Private key cannot be derived from public key</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#00FFB3] flex-shrink-0 mt-1" />
                <span>Uses large prime numbers (2048+ bits recommended)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#00FFB3] flex-shrink-0 mt-1" />
                <span>Asymmetric encryption eliminates key distribution problem</span>
              </li>
            </ul>
          </motion.div>

          {/* Key Exchange */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl bg-gradient-to-br from-[#00EAFF]/10 to-[#00FFB3]/10 border border-[#00EAFF]/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-[#00EAFF]" />
              <h3 className="text-2xl text-white">How Keys are Exchanged</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#00EAFF]/20 flex items-center justify-center text-[#00EAFF]">
                  1
                </div>
                <p className="text-gray-300 mt-1">Receiver generates key pair (public & private)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#00FFB3]/20 flex items-center justify-center text-[#00FFB3]">
                  2
                </div>
                <p className="text-gray-300 mt-1">Receiver shares public key openly</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#6C24FF]/20 flex items-center justify-center text-[#6C24FF]">
                  3
                </div>
                <p className="text-gray-300 mt-1">Sender encrypts message with receiver's public key</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#00EAFF]/20 flex items-center justify-center text-[#00EAFF]">
                  4
                </div>
                <p className="text-gray-300 mt-1">Only receiver can decrypt with their private key</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Video & Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="p-12 rounded-3xl bg-gradient-to-br from-[#6C24FF]/10 to-[#00FFD5]/10 border border-[#00EAFF]/30">
            <h2 className="text-3xl mb-8 bg-gradient-to-r from-[#00EAFF] to-[#00FFB3] bg-clip-text text-transparent">
              Video & Materials
            </h2>
            
            <div className="space-y-8 max-w-4xl mx-auto">
              {/* Video Player */}
              <div className="relative rounded-2xl overflow-hidden bg-black/50 border border-[#00EAFF]/30 shadow-2xl shadow-[#00EAFF]/20">
                <video 
                  controls 
                  className="w-full aspect-video"
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%230A0F1F' width='800' height='450'/%3E%3Ctext fill='%2300EAFF' font-size='24' font-family='sans-serif' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3ERSA Explanation Video%3C/text%3E%3C/svg%3E"
                >
                  <source src="/rsa_explanation.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm border border-[#00EAFF]/30">
                    <Video className="w-4 h-4 text-[#00EAFF]" />
                    <span className="text-sm text-[#00EAFF]">RSA Algorithm Explanation</span>
                  </div>
                </div>
              </div>

              {/* PDF Downloads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <a
                  href="/rsa_explanation_en.pdf"
                  download="rsa_explanation_en.pdf"
                  className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-[#00EAFF]/30 hover:border-[#00EAFF] hover:shadow-lg hover:shadow-[#00EAFF]/30 transition-all duration-300 hover:scale-105"
                >
                  <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform text-[#00EAFF]" />
                  <span className="text-white">Download PDF (English)</span>
                </a>
                
                <a
                  href="/rsa_explanation_ar.pdf"
                  download="rsa_explanation_ar.pdf"
                  className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-[#00FFB3]/30 hover:border-[#00FFB3] hover:shadow-lg hover:shadow-[#00FFB3]/30 transition-all duration-300 hover:scale-105"
                >
                  <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform text-[#00FFB3]" />
                  <span className="text-white">Download PDF (Arabic)</span>
                </a>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-[#00EAFF]/10 border border-[#00EAFF]/20 inline-flex items-start gap-3 max-w-2xl mx-auto">
              <AlertCircle className="w-5 h-5 text-[#00EAFF] flex-shrink-0 mt-0.5" />
              <p className="text-gray-300 text-left text-sm">
                <span className="text-[#00EAFF]">Note:</span> For production use, RSA key sizes of 2048 bits or larger are recommended. 
                The examples in this educational tool use smaller numbers for clarity.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Learning Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="p-12 rounded-3xl bg-gradient-to-br from-[#00EAFF]/10 to-[#00FFB3]/10 border border-[#00FFB3]/30">
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-[#00FFB3] to-[#6C24FF] bg-clip-text text-transparent">
              Additional Learning Resources
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Books Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-[#00EAFF]" />
                  <h3 className="text-xl text-[#00EAFF]">Books</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00EAFF]/50 transition-all">
                    <p className="text-white mb-1">Understanding Cryptography</p>
                    <p className="text-sm text-gray-400">Chapter 7: The RSA Cryptosystem</p>
                    <p className="text-xs text-[#00EAFF] mt-1">Page 173</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00EAFF]/50 transition-all">
                    <p className="text-white mb-1">Cryptography and Network Security</p>
                    <p className="text-sm text-gray-400">THE RSA ALGORITHM</p>
                    <p className="text-xs text-[#00EAFF] mt-1">Page 294</p>
                  </div>
                </div>
              </div>

              {/* Articles Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-[#00FFB3]" />
                  <h3 className="text-xl text-[#00FFB3]">Articles</h3>
                </div>
                <div className="space-y-3">
                  <a
                    href="https://www.geeksforgeeks.org/computer-networks/rsa-algorithm-cryptography/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00FFB3]/50 transition-all hover:scale-105"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ExternalLink className="w-4 h-4 text-[#00FFB3]" />
                      <p className="text-white group-hover:text-[#00FFB3] transition-colors">GeeksforGeeks</p>
                    </div>
                    <p className="text-xs text-gray-400">RSA Algorithm Cryptography</p>
                  </a>
                  <a
                    href="https://www.tutorialspoint.com/cryptography/cryptography_rsa_algorithm.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00FFB3]/50 transition-all hover:scale-105"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ExternalLink className="w-4 h-4 text-[#00FFB3]" />
                      <p className="text-white group-hover:text-[#00FFB3] transition-colors">TutorialsPoint</p>
                    </div>
                    <p className="text-xs text-gray-400">Cryptography RSA Algorithm</p>
                  </a>
                </div>
              </div>

              {/* Videos Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Play className="w-6 h-6 text-[#6C24FF]" />
                  <h3 className="text-xl text-[#6C24FF]">Videos</h3>
                </div>
                <div className="space-y-3">
                  <a
                    href="https://youtu.be/hm8s6FAc4pg?si=Yrz6Uj2FGo6DNA-T"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#6C24FF]/50 transition-all hover:scale-105"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Video className="w-4 h-4 text-[#6C24FF]" />
                      <p className="text-white group-hover:text-[#6C24FF] transition-colors">YouTube Tutorial 1</p>
                    </div>
                    <p className="text-xs text-gray-400">RSA Algorithm Explained</p>
                  </a>
                  <a
                    href="https://youtu.be/J4_R_bysWAI?si=jo5UxcSGdk8yC_QD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#6C24FF]/50 transition-all hover:scale-105"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Video className="w-4 h-4 text-[#6C24FF]" />
                      <p className="text-white group-hover:text-[#6C24FF] transition-colors">YouTube Tutorial 2</p>
                    </div>
                    <p className="text-xs text-gray-400">RSA Cryptography Deep Dive</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}