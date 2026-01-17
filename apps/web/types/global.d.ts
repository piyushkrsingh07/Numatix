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
}