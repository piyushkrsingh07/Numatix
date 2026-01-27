import axiosConfig from "./axiosConfig"

export const fetchUserAccount=async(token:string)=>{
    try{
     const response=await axiosConfig.get(`/user/account/info`,{
        headers:{
            'x-access-token':token
        }
     })

console.log('see workspace details by id',response)
return response.data
    }catch(error:any){
  console.log('Error in get workspace request',error)
        throw error.response.data
    }
}