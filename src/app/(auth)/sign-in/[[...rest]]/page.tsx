"use client"
import { SignIn } from "@clerk/nextjs"
interface Props {}

const page = () => {
  return <div className="w-full flex-1 flex items-center justify-center">
    <SignIn  />
  </div>
}

export default page