import React from "react"
import { cn } from "@/lib/utils"

interface CustomCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  className?: string
  setChecked: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomCheckbox = ({
  name,
  className = "",
  checked,
  setChecked,
  ...props
}: CustomCheckboxProps) => {
  return (
    <div>
      <input
        className={cn("custom-checkbox", className)}
        type="checkbox"
        id={name}
        checked={checked}
        onChange={(e)=>setChecked(e.target.checked)}
        {...props}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  )
}

export default CustomCheckbox
