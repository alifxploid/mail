'use client'

import { useState, useEffect } from 'react'

export function useForSalePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    
    // Check if popup has been shown in this session
    const popupShown = sessionStorage.getItem('forSalePopupShown')
    
    if (!popupShown && !hasShown) {
      // Show popup after 2 seconds delay
      const timer = setTimeout(() => {
        setIsOpen(true)
        setHasShown(true)
        sessionStorage.setItem('forSalePopupShown', 'true')
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isMounted, hasShown])

  const closePopup = () => {
    setIsOpen(false)
  }

  const openPopup = () => {
    setIsOpen(true)
  }

  return {
    isOpen,
    closePopup,
    openPopup
  }
}