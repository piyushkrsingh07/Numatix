'use client'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/hooks/useTheme"
import Image from "next/image"
import LeftSide from "./component/LeftSide"


interface AuthProps {
    children:React.ReactNode
}

export default  function AuthLayout({children}:AuthProps){

    const {isDark,setIsDark}=useTheme()
  return (
 
  <div className="h-screen flex w-screen overflow-y-hidden"> 
  <div className="hidden md:block md:w-[60%] relative h-[106%] -mt-8 "> 
<LeftSide/>
  </div>

   <div className="w-full md:w-1/2 relative "> 
     <div className="absolute top-4 right-4 flex items-center gap-2 ">
        <Label htmlFor="dark-mode" className={`${isDark?"text-white":"text-black"}`}>Dark Mode</Label>
      <Switch id="dark-mode" aria-label='Animated large switch' checked={isDark} onCheckedChange={()=>setIsDark((prev:boolean)=>!prev)}
        
        className="
     
    data-[state=checked]:bg-blue-500 border-black
    [&>span]:bg-white border-blue-800 border-1
  ">
  
  </Switch>
      
    </div>
   {children} </div>
   </div>
 
  )
}
