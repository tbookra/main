import { cn } from "@/lib/utils"
import React from "react"
import { useFormContext, Controller } from "react-hook-form"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

interface CustomInputWrapperProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  required?: boolean
  className?: string
}

const CustomInput: React.FC<CustomInputWrapperProps> = ({
  name,
  label,
  required = false,
  type = "text",
  className,
  ...inputProps
}) => {
  const formContext = useFormContext()
  if (!formContext) {
    throw new Error("CustomInputWrapper must be used within a FormProvider")
  }
  const {
    control,
    formState: { errors },
  } = formContext
  return (
    <div>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{
          required: required ? `${label || name} is required` : undefined,
        }}
        render={({ field }) => (
          <Input
            {...field}
            {...inputProps}
            id={name}
            type={type}
            className={cn(
              `w-full border p-2 ${
                errors[name] ? "border-red-500" : "border-gray-300"
              }`,
              className
            )}
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  )
}

export default CustomInput
