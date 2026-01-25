export {};

declare global {
    interface SignInFormData {
        email:string;
        password:string;
    }

    type SignUpFormData  = {
        email:string,
        password:string,
        binanceApiKey:string,
        binanceSecretKey:string
    }

    type FormInputProps ={
        name:string,
        label:string,
        placeholder:string,
        type:string?,
    
        
        disabled:boolean,
        value:string

    }
}
