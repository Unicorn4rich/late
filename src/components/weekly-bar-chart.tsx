"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"
import { RiVipDiamondFill } from "react-icons/ri"

interface DayData {
  day: string
  value: number
  hasIcon?: boolean
  duration?: string
}

interface WeeklyBarChartProps {
  data: DayData[]
}

const defaultData: DayData[] = [
  { day: "Mon", value: 60, duration: "45 min" },
  { day: "Tue", value: 40, duration: "25 min" },
  { day: "Wed", value: 85, duration: "60 min" },
  { day: "Thu", value: 65, duration: "30 min" },
  { day: "Fri", value: 80, duration: "50 min" },
  { day: "Sat", value: 50, duration: "35 min" },
  { day: "Sun", value: 40, duration: "20 min" }
]

export function WeeklyBarChart({ data = defaultData }: WeeklyBarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)
  
  // Find the highest value to show diamond icon
  const maxValue = Math.max(...data.map(item => item.value))
  const maxIndex = data.findIndex(item => item.value === maxValue)

  const handleBarClick = (index: number) => {
    setClickedIndex(clickedIndex === index ? null : index)
  }

  const getBarColor = (value: number) => {
    if (value >= 80) {
      return "#58CC02" // Green-500 for high values
    } else if (value >= 60) {
      return "#58CC02" // Green-400
    } else if (value >= 40) {
      return "#58CC0238" // Green-300
    } else {
      return "#58CC0238" // Green-200 for low values
    }
  }

  return (
    <div className="relative">
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 40, right: 30, left: 20, bottom: 5 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fill: "#6B7280" }}
              className="text-black"
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fill: "#6B7280" }}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
            />

            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]} 
              barSize={12}
              onMouseEnter={(data, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.value, index)}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleBarClick(index)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Diamond icon for highest value - positioned 5px above bar */}
        {maxIndex !== -1 && (
          <div 
            className="absolute text-blue-500"
            style={{
              left: `${15 + (maxIndex * (100 / data.length)) + 3}%`,
              top: `${25 + (100 - data[maxIndex].value) * 2.4 - 5}px`,
              transform: 'translateX(-120%)'
            }}
          >
            <RiVipDiamondFill className="w-6 h-6 text-blue-500 fill-blue-500" />
          </div>
        )}

        {/* Hover tooltip - positioned just above the bar */}
        {hoveredIndex !== null && (
          <div 
            className="absolute bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium shadow-lg pointer-events-none"
            style={{
              left: `${15 + (hoveredIndex * (100 / data.length)) + 3}%`,
              top: `${40 + (100 - data[hoveredIndex].value) * 2.4 - 8}px`,
              transform: 'translateX(-50%)'
            }}
          >
            {data[hoveredIndex].duration || "30 min"}
          </div>
        )}

        {/* Click tooltip */}
        {clickedIndex !== null && (
          <div 
            className="absolute bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium shadow-lg"
            style={{
              left: `${15 + (clickedIndex * (100 / data.length)) + 3}%`,
              top: `${40 + (100 - data[clickedIndex].value) * 2.4 - 8}px`,
              transform: 'translateX(-50%)'
            }}
          >
            {data[clickedIndex].duration || "30 min"}
          </div>
        )}
      </div>
    </div>
  )
}
