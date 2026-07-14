'use client'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/919999999999?text=Hello%20ATF%20Projects%2C%20I%20have%20an%20enquiry."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={26} className="text-white fill-white" />
      {/* Pulse ring */}
      <span className="absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-40" />
    </motion.a>
  )
}
