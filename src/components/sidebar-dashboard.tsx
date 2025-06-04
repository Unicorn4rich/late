"use client"

import { SetStateAction, useState } from "react"
import { Search, Bell, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { SiFireship } from "react-icons/si";
import { IoIosDesktop } from "react-icons/io";

interface TodoItem {
  id: string
  text: string
  completed: boolean
  isSubItem?: boolean
}

interface Task {
  name: string
  progress: number
  color: string
}

const weekDays = ["M", "T", "W", "T", "F", "S", "S"]

const tasks: Task[] = [{ name: "Web Design", progress: 55, color: "bg-green-500" }]

const todoItems: TodoItem[] = [
  { id: "1", text: "Developing Restaurant Apps", completed: false },
  { id: "3", text: "Integrate API", completed: false, isSubItem: true },
  { id: "4", text: "Report Analysis P2P Business", completed: true },
]

export default function SidebarDashboard() {
  const [todos, setTodos] = useState<TodoItem[]>(todoItems)
  const [searchValue, setSearchValue] = useState("")
  const [activeDays, setActiveDays] = useState<number[]>([0, 1, 2, 3, 4]) // Monday to Friday are active

  const handleTodoToggle = (id: string) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  return (
    <div className="w-[270px] h-[860px] bg-gray-100 rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col p-2">
      
      {/* Header Section */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">

          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search anything"
              value={searchValue}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchValue(e.target.value)}
              className="pl-7 border-0 bg-white-50 rounded-xl text-sm h-8 focus-visible:ring-1 focus-visible:ring-gray-300"
            />
          </div>

          <div className="relative">
            <Bell className="w-5 h-5 text-gray-900 " />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
          </div>

          <Avatar className="w-10 h-9">
            <AvatarImage src="/side.png" />
            <AvatarFallback className="bg-blue-500 text-white text-xs">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Step Streak Section */}
      <div className="p-4 border-b border-gray-100 bg-white rounded-3xl mt-5 ">
        <div className="flex items-center gap-2 mb-3">
          <div className=" text-orange-600 flex items-center justify-center">
            <SiFireship size={24}/>
          </div>
          <div className="flex flex-col">
            <span className="text-orange-600 font-medium text-sm">1234 day streak</span>
            <span className="text-gray-500 text-xs">Youre on fire!</span>
          </div>
        </div>

        {/* Weekly Calendar */}
        <div className="flex justify-between items-center">
          {weekDays.map((day, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">{day}</span>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                  activeDays.includes(index) ? "bg-orange-500" : "bg-gray-100"
                }`}
                onClick={() => {
                  if (activeDays.includes(index)) {
                    setActiveDays(activeDays.filter(dayIndex => dayIndex !== index));
                  } else {
                    setActiveDays([...activeDays, index]);
                  }
                }}
              >
                {activeDays.includes(index) ? (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-xs text-gray-600 font-medium">
                    {20 + index}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>


     {/* Remaining Tasks Section */}
      <div className=" border-b border-gray-100">
        <h3 className="text-gray-800 font-semibold text-base mb-4 flex items-center gap-2">
          Remaining Tasks
        </h3>
        
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          {tasks.map((task, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className=" bg-[#F2FBEB] rounded-md shadow-sm  p-1 text-[#027A48] "><IoIosDesktop/></div>
                  <span className="text-sm font-medium text-gray-700">{task.name}</span>
                </div>
                
                <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  {task.progress}%
                </span>
              </div>

              <div className="relative">
                <div className="w-full bg-emerald-100 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-[#58CC02] to-[#58CC02] h-2.5 rounded-full transition-all duration-300 shadow-sm" 
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* To Do List Section */}
      <div className="p-4 flex-1">
        <h3 className="text-gray-900 font-bold text-sm mb-4">To Do List</h3>
        <div className="space-y-3">

          {todos.map((todo) => (
            <div key={todo.id} className="space-y-2">
              <div className={`flex items-start gap-3 ${todo.isSubItem ? "ml-6" : ""}`}>
                <div className="mt-0.5">
                  {todo.completed ? (
                    <div 
                      className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center cursor-pointer"
                      onClick={() => handleTodoToggle(todo.id)}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => handleTodoToggle(todo.id)}
                      className="w-4 h-4 border-gray-300"
                    />
                    
                  )}
                  
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${todo.completed ? "text-gray-500 line-through" : "text-gray-700"}`}>
                    {todo.text}
                  </p>
                  {todo.id === "4" && todo.completed && (
                    <div className="flex gap-2 mt-2">
                      <Button variant="secondary" className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">
                        Business
                      </Button>
                      <Button variant="secondary" className="bg-gray-100 text-red-600 text-xs px-2 py-1 rounded-md">
                        04:50 PM
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>


    </div>
  )
}
