"use client"

import { useState, useEffect } from "react"

interface CircularProgressChartProps {
  progress: number
}

export function CircularProgressChart({ progress }: CircularProgressChartProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)

  const radius = 80
  const strokeWidth = 8
  const normalizedRadius = radius - strokeWidth * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference

  // Animate progress changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 100)

    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className="relative inline-block">
      {/* Background decorative dots */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 relative">
          <div className="absolute top-4 right-8 w-2 h-2 bg-green-400 rounded-full"></div>
          <div className="absolute top-12 right-4 w-1.5 h-1.5 bg-green-300 rounded-full"></div>
          <div className="absolute bottom-8 left-4 w-2 h-2 bg-green-400 rounded-full"></div>
          <div className="absolute bottom-16 left-8 w-1 h-1 bg-green-300 rounded-full"></div>
          <div className="absolute top-8 left-12 w-1.5 h-1.5 bg-green-300 rounded-full"></div>
          <div className="absolute bottom-4 right-12 w-1 h-1 bg-green-300 rounded-full"></div>
        </div>
      </div>

      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress circle */}
        <circle
          stroke="#22C55E"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 0.8s ease-in-out",
          }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{Math.round(animatedProgress)}%</div>
          <div className="text-sm text-gray-500 mt-1">of 100</div>
        </div>
      </div>
    </div>
  )
}
