import React, { ReactNode } from "react"
import Navbar from "../../components/Navbar"

interface Props {}

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
