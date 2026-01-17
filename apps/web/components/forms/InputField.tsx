import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import { FieldValues } from "react-hook-form";
import { FormInputProps } from '@/types/form';

const InputField =<T extends FieldValues> ({name,label,placeholder,type='text',register,error,disabled}:FormInputProps<T>) => {
  return (
    <div className=' flex flex-col gap-y-2'>
     
         <Label htmlFor={name} >
            {label}
         </Label>
        <Input 
          type={type}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
        
          className={cn({'opacity-50 cursor-not-allowed':disabled})}
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
