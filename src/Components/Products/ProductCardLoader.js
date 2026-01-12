"use client"
import React from 'react'

const ProductCardShimmer = () => {
  return (
    <div>
          <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
     
      <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-[200px] flex items-center justify-center">
        <div className="w-full h-full shimmer rounded-md"></div>
      </div>


      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 shimmer rounded"></div>
        <div className="h-4 w-1/2 shimmer rounded"></div>
        <div className="h-3 w-1/3 shimmer rounded"></div>
      </div>
    </div>
    </div>
  )
}

export default ProductCardShimmer



