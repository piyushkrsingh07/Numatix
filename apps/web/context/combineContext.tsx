import React, { ReactNode } from "react";
type ProviderProps = {
  children: ReactNode;
};

type ProviderComponent = React.ComponentType<ProviderProps>;


export default function combineContext(...providers: ProviderComponent[]){
   return ({children}:ProviderProps)=>{
        return providers.reduceRight((accumulator,CurrentProvider)=>{
         return <CurrentProvider>{accumulator}</CurrentProvider>
        },children)
   }
}