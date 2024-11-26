import { DashboardPage } from "@/components/dashboardPage"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import React from "react"
import DashboardPageContent from "./DashboardPageContent"
import { CreateEventCategoryModal } from "@/components/CreateEventCategoryModal"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

interface Props {}

const page = async () => {
  const auth = await currentUser()
  if (!auth) {
    redirect("/sign-in")
  }
  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })
  if (!user) {
    redirect("/sign-in")
  }
  return <DashboardPage cta={<CreateEventCategoryModal>
    <Button className="">
      <PlusIcon className="size-4 mr-2"/>
      Add Category
    </Button>
  </CreateEventCategoryModal>} title="Dashboard">
    <DashboardPageContent  />
  </DashboardPage>
}

export default page
