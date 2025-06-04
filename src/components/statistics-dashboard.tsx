"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { CircularProgressChart } from "@/components/circular-progress-chart"
import { WeeklyBarChart } from "./weekly-bar-chart"
import { RiVipDiamondFill } from "react-icons/ri"


interface DayData {
  day: string
  value: number
  hasIcon: boolean
}

const weeklyData: DayData[] = [
  { day: "Mon", value: 60, hasIcon: false },
  { day: "Tue", value: 40, hasIcon: false },
  { day: "Wed", value: 85, hasIcon: true },
  { day: "Thu", value: 60, hasIcon: false },
  { day: "Fri", value: 80, hasIcon: false },
  { day: "Sat", value: 50, hasIcon: false },
  { day: "Sun", value: 40, hasIcon: false },
]

export default function StatisticsDashboard() {
  const [todayProgress, setTodayProgress] = useState(67)
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly")

  // Simulate real-time progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (todayProgress < 100) {
        setTodayProgress((prev) => Math.min(prev + Math.random() * 1, 100))
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [todayProgress])

  const handlePeriodChange = () => {
    const periods = ["Monthly", "Weekly", "Daily", "Yearly"]
    const currentIndex = periods.indexOf(selectedPeriod)
    const nextPeriod = periods[(currentIndex + 1) % periods.length]
    setSelectedPeriod(nextPeriod)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Side - Bar Chart */}
            <div className="space-y-4 sm:space-y-6">
             <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
               <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">Statistics</h2>
    <div className="flex gap-2">
      <Button
        variant="secondary"
        className="bg-[#CBEFB199] text-green-700 hover:bg-green-100 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium"
      >
        Hours spent
      </Button>
      <Button
        variant="secondary"
        className="bg-[#CBEFB199] text-green-700 hover:bg-blue-100 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium"
      >
        Daily Goal
      </Button>
    </div>
  </div>

              <WeeklyBarChart data={weeklyData} />

            </div>



            {/* Right Side - Progress Chart */}
            <div className="space-y-6 border rounded-[20px] p-[10px]">    

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg px-4 py-2 transition-all duration-200"
                  onClick={handlePeriodChange}
                >
                  {selectedPeriod}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="text-center space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Todays
                    <br />
                    Progress
                  </h3>

                  <CircularProgressChart progress={todayProgress} />
                </div>

                <div className="space-y-4">
                  <p className="text-black font-bold text-base leading-relaxed">
                    Finish todays program
                    <br />
                    and get
                  </p>

                  <div className="flex items-center justify-center gap-2">
                    <RiVipDiamondFill className="w-6 h-6 text-blue-500 fill-blue-500" />
                    <span className="text-2xl font-bold text-gray-900">10</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
