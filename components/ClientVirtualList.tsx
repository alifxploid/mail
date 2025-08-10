"use client"

import { Virtuoso } from "react-virtuoso"
import { useEffect, useState } from "react"

interface ClientVirtualListProps<T> {
  data: T[]
  itemContent: (index: number, item: T) => React.ReactNode
  className?: string
}

export default function ClientVirtualList<T extends { id: string }>({ data, itemContent, className }: ClientVirtualListProps<T>) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Render fallback during SSR and initial client render
  if (!isMounted) {
    return (
      <div className={className}>
        {data.slice(0, 10).map((item, index) => (
          <div key={`fallback-${item.id}-${index}`}>
            {itemContent(index, item)}
          </div>
        ))}
        {data.length > 10 && (
          <div key="loading-more" className="p-4 text-center text-gray-500">
            Loading more emails...
          </div>
        )}
      </div>
    )
  }

  // Render Virtuoso only after client-side hydration
  return (
    <Virtuoso
      data={data}
      itemContent={itemContent}
      className={className}
    />
  )
}