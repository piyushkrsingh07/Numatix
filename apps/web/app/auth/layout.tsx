import Image from "next/image"

interface AuthProps {
    children:React.ReactNode
}

export default async function AuthLayout({children}:AuthProps){
  return (
  <div className="h-screen flex w-screen overflow-y-hidden"> 
  <div className="w-[60%] relative h-[106%]  -mt-8 "> 
  <Image
   src="/left-section.svg"
   alt="Left image" 
    priority={true} 
   fill
   className="object-cover  h-[150%]" /> 
  </div>
   <div className="w-1/2 "> {children} </div>
   </div>
  )
}