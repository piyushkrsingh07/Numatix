import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import { FieldValues } from "react-hook-form";
import { FormInputProps } from '@/types/form';
import { useTheme } from '@/hooks/useTheme';

const InputField =<T extends FieldValues> ({name,label,placeholder,type='text',register,error,disabled,suffix}:FormInputProps<T>) => {
    const {isDark}=useTheme()
  return (
    <div className=' flex flex-col gap-y-2'>
     
         <Label htmlFor={name} className={`${isDark?'text-white':'text-black'}`}>
            {label}
         </Label>
        <Input 
          type={type}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
         
          className={cn( 
   
            isDark ? "text-white bg-gray-800 placeholder:text-white placeholder:opacity-50 border-none" : "text-black placeholder:text-black border-[0.1px]",)}
          {...register(name)}
            

              
        />
         {error && (
                <p className='text-xs text-red-500'>
                  {error.message}
                </p>
              )
            }
    </div>
  )
}

export default InputField
