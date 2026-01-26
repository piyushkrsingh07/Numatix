import axios from "@/app/config/axiosConfig"

export const signInRequest=async({email,password}:SignInFormData)=>{
    try{
       const response=await axios.post('/auth/login',{
        email,
        password,
         
       })
       return response.data
    }catch(error:any){
       throw error.response.data
    }
}