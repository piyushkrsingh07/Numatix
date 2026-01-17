import Image from "next/image"

interface AuthProps {
    children:React.ReactNode
}

export default async function AuthLayout({children}:AuthProps){
  return (
  <div className="h-screen flex bg-main"> <div className="w-1/2 relative h-full"> 
  <Image
   src="/left-section.svg"
   alt="Left image" 
   fill priority={true} 
   className="object-cover" /> 
  </div>
   <div className="w-1/2 flex items-center justify-center"> {children} </div>
   </div>
  )
}