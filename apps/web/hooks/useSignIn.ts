import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { signInRequest } from "@/app/config/authConfig";



export const useSignIn=()=>{
    const {auth,setAuth}=useAuth()

        const {isPending,isSuccess,error,mutateAsync:signInMutation} = useMutation({         //on calling the mutate function the use mutation is going to trigger
        mutationFn:signInRequest,
        onSuccess:(response)=>{
            console.log("Successfully signin",response)
               setAuth({
        user: {
            id:response.user.id,
            email:response.user.email
        },
        token: response.user.token,
        isLoading: false
      })
      },

        
        onError:(error:any)=>[
            console.error('Failed to sign up',error)
        ]
    })

    return {
        isPending,
        isSuccess,
        error,
       signInMutation,
       
    }
}