/**
 * Check if a number is prime (for educational purposes with small numbers)
 */
export function isPrime(num: number): boolean {
  if (num <= 1) return false
  if (num <= 3) return true
  if (num % 2 === 0 || num % 3 === 0) return false
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false
  }
  return true
}

/**
 * Greatest Common Divisor using Euclidean algorithm
 */
export function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}

/**
 * Extended Euclidean Algorithm to find modular multiplicative inverse
 * Returns d such that (e * d) mod phi = 1
 */
export function modularInverse(e: number, phi: number): number {
  let [old_r, r] = [e, phi]
  let [old_s, s] = [1, 0]
  while (r !== 0) {
    const quotient = Math.floor(old_r / r)
    ;[old_r, r] = [r, old_r - quotient * r]
    ;[old_s, s] = [s, old_s - quotient * s]
  }
  return old_s < 0 ? old_s + phi : old_s
}

/**
 * Modular exponentiation: (base^exp) mod modulus
 * Uses binary exponentiation for efficiency
 */
export function modPow(base: number, exp: number, modulus: number): number {
  if (modulus === 1) return 0
  let result = 1
  base = base % modulus
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % modulus
    }
    exp = Math.floor(exp / 2)
    base = (base * base) % modulus
  }
  return result
}

/**
 * Encrypt a single character using RSA
 * c = (m^e) mod n
 */
export function encryptChar(char: string, e: number, n: number): number {
  const m = char.charCodeAt(0)
  return modPow(m, e, n)
}

/**
 * Decrypt a single cipher value using RSA
 * m = (c^d) mod n
 */
export function decryptChar(cipherValue: number, d: number, n: number): string {
  const m = modPow(cipherValue, d, n)
  return String.fromCharCode(m)
}

/**
 * Encrypt entire message
 */
export function encryptMessage(message: string, e: number, n: number): number[] {
  return message.split("").map((char) => encryptChar(char, e, n))
}

/**
 * Decrypt entire message
 */
export function decryptMessage(cipherValues: number[], d: number, n: number): string {
  return cipherValues.map((c) => decryptChar(c, d, n)).join("")
}

/**
 * Generate RSA key pair for educational purposes
 */
export function generateRSAKeys(p: number, q: number) {
  const n = p * q
  const phi = (p - 1) * (q - 1)
  // Find e such that 1 < e < phi and gcd(e, phi) = 1
  let e = 2
  while (e < phi && gcd(e, phi) !== 1) {
    e++
  }
  // Calculate d as modular multiplicative inverse of e mod phi
  const d = modularInverse(e, phi)
  return { p, q, n, phi, e, d }
}
