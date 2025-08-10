"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import ClientVirtualList from "@/components/ClientVirtualList"
import { Search, Filter, MoreHorizontal, Star, Archive, Trash2, Mail, MailOpen, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Email {
  id: string
  sender: string
  subject: string
  preview: string
  timestamp: string
  isRead: boolean
  isStarred: boolean
  isImportant: boolean
  category: "primary" | "social" | "promotions" | "updates"
}

// Deterministic data to prevent SSR hydration mismatch
const mockEmails: Email[] = Array.from({ length: 100 }, (_, i) => {
  // Use index-based deterministic values instead of Math.random()
  const timeHours = (i % 24) + 1
  const isRead = (i % 10) > 3 // ~70% read rate
  const isStarred = (i % 10) === 0 // ~10% starred
  const isImportant = (i % 20) === 0 // ~5% important
  const categoryIndex = i % 4
  
  return {
    id: `email-${i}`,
    sender: `sender${i}@example.com`,
    subject: `Email Subject ${i + 1}`,
    preview: `This is a preview of email ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    timestamp: `${timeHours}h ago`,
    isRead,
    isStarred,
    isImportant,
    category: ["primary", "social", "promotions", "updates"][categoryIndex] as Email["category"]
  }
})

const categories = [
  { id: "all", label: "All", icon: Mail, count: 100 },
  { id: "unread", label: "Unread", icon: MailOpen, count: 293 },
  { id: "starred", label: "Starred", icon: Star, count: 118 },
  { id: "important", label: "Important", icon: Flag, count: 220 }
]

function EmailItem({ email, isSelected, onSelect, onNavigate }: { 
  email: Email
  isSelected: boolean
  onSelect: (id: string) => void
  onNavigate: (id: string) => void
}) {
  const handleEmailClick = () => {
    onNavigate(email.id)
  }

  const handleSelectClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    onSelect(email.id)
  }

  return (
    <div className="px-3 sm:px-4 lg:px-2 py-2 lg:py-1">
      <div
        className={cn(
          "group relative flex items-start gap-2 sm:gap-3 lg:gap-2 p-3 sm:p-4 lg:p-2 cursor-pointer transition-all duration-200",
          "bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300",
          isSelected && "border-blue-500 bg-blue-50/30 shadow-md",
          !email.isRead && "border-l-4 border-l-blue-500"
        )}
        onClick={handleEmailClick}
      >
      {/* Selection Checkbox */}
      <div className="flex-shrink-0 mt-1">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelectClick}
          className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
      </div>

      {/* Priority Indicator */}
      <div className="flex-shrink-0 mt-1">
        {email.isImportant && (
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full" />
        )}
        {!email.isImportant && (
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-transparent" />
        )}
      </div>

      {/* Email Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1 lg:mb-0.5">
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-1 min-w-0 flex-1">
            <span className={cn(
              "text-sm sm:text-base truncate",
              email.isRead ? "text-gray-600" : "text-gray-900 font-medium"
            )}>
              {email.sender}
            </span>
            {email.isStarred && (
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-2.5 lg:h-2.5 text-yellow-500 fill-current flex-shrink-0" />
            )}
          </div>
          <span className="text-sm text-gray-500 flex-shrink-0 ml-2 lg:ml-1">
            {email.timestamp}
          </span>
        </div>
        
        <h3 className={cn(
          "text-sm sm:text-base mb-1 lg:mb-0.5 truncate",
          email.isRead ? "text-gray-700" : "text-gray-900 font-medium"
        )}>
          {email.subject}
        </h3>
        
        <p className="text-sm text-gray-500 truncate leading-relaxed">
          {email.preview}
        </p>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="sm" className="h-5 w-5 sm:h-6 sm:w-6 p-0">
          <MoreHorizontal className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
        </Button>
      </div>
      </div>
    </div>
  )
}

export default function InboxPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const filteredEmails = useMemo(() => {
    return mockEmails.filter(email => {
      const matchesSearch = email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           email.sender.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === "all" ||
                             (selectedCategory === "unread" && !email.isRead) ||
                             (selectedCategory === "starred" && email.isStarred) ||
                             (selectedCategory === "important" && email.isImportant)
      
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const handleEmailSelect = (emailId: string) => {
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    )
  }

  const handleEmailNavigate = (emailId: string) => {
    router.push(`/inbox/${emailId}`)
  }

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Inbox</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {filteredEmails.length} emails
              </p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                <Filter className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              <Button size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                <span className="hidden sm:inline">Compose</span>
                <span className="sm:hidden">+</span>
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3 sm:mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            <Input
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 sm:pl-10 text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-1">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = selectedCategory === category.id
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 justify-center sm:justify-start",
                    isActive 
                      ? "bg-blue-50 text-blue-700 border border-blue-200" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">{category.label}</span>
                  <Badge 
                    variant={isActive ? "default" : "secondary"} 
                    className={cn(
                      "text-xs",
                      isActive ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {category.count}
                  </Badge>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {isMounted && selectedEmails.length > 0 && (
        <div className="border-b border-gray-200 bg-gray-50 px-3 sm:px-6 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-gray-600">
              {selectedEmails.length} selected
            </span>
            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                <Archive className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden sm:inline">Archive</span>
              </Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Email List */}
      <div className="flex-1 overflow-hidden">
        <ClientVirtualList
          data={filteredEmails}
          itemContent={(index, email) => (
            <EmailItem
              email={email}
              isSelected={selectedEmails.includes(email.id)}
              onSelect={handleEmailSelect}
              onNavigate={handleEmailNavigate}
            />
          )}
          className="h-full w-full"
        />
      </div>
    </div>
  )
}