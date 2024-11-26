import { DashboardPage } from '@/components/dashboardPage'
import { db } from '@/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { UpgradePageContent } from './UpgradePageContent'

interface Props {}

const page =async () => {
    const auth = await currentUser()
    if(!auth){
        redirect("/sign-in")
    }
    
    const user = await db.user.findUnique({
        where:{externalId:auth.id}
    })

    if(!user){
        redirect("/sign-in")
    }

  return <DashboardPage title='Por Membership'>
    <UpgradePageContent plan={user.plan} />
  </DashboardPage>  //
}

export default page