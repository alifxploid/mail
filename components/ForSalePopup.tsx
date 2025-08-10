'use client'

import { useState, useEffect } from 'react'
import { X, Star, Check, Zap, Shield, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ForSalePopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function ForSalePopup({ isOpen, onClose }: ForSalePopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen && isMounted) {
      setIsVisible(true)
    }
  }, [isOpen, isMounted])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(), 300)
  }

  // Don't render anything during SSR or before mount
  if (!isMounted || !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className={`relative w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-6 h-6" />
            <h2 className="text-xl font-bold">TempMail Pro Template</h2>
          </div>
          <p className="text-blue-100 text-sm">Template Email Sementara Premium</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Price */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl font-bold text-gray-900">Rp 350.000</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Promo!
              </Badge>
            </div>
            <p className="text-gray-600 text-sm">Harga normal: <span className="line-through">Rp 500.000</span></p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-700">Source code lengkap Next.js + TypeScript</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-700">Responsive design untuk semua device</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-700">Email generator dengan keamanan tinggi</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-700">UI/UX modern dengan Tailwind CSS</span>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-700 italic">
              &quot;Template yang sangat bagus dan mudah dikustomisasi. Worth it banget!&quot;
            </p>
            <p className="text-xs text-gray-500 mt-1">- Developer Indonesia</p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
              onClick={() => window.open('https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20TempMail%20Pro%20Template%20seharga%20Rp%20350.000', '_blank')}
            >
              💬 Beli Sekarang via WhatsApp
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => window.open('https://github.com/yourusername/tempmail-template', '_blank')}
            >
              👀 Lihat Demo & Documentation
            </Button>
          </div>

          {/* Bonus */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800 font-medium text-center">
              🎁 BONUS: Dokumentasi lengkap + Support 30 hari!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}