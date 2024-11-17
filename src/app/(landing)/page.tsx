import React from "react"
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper"
import { Heading } from "@/components/Heading"
import { Check } from "lucide-react"
import { ShinyButton } from "@/components/ShinyButton"
import { MockDiscordUi } from "@/components/MockDiscordUi"
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list"
import { DiscordMessage } from "@/components/DiscordMessage"

interface Props {}

const page = () => {
  return (
    <>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto text-center flex flex-col items-center gap-10">
            <div>
              <Heading>
                <span>Real Time SaaS Insights,</span>
                <br />
                <span className="relative bg-gradient-to-r from-brand-700 to-brand-800 text-transparent bg-clip-text">
                  Delivered to Your Discord
                </span>
              </Heading>
            </div>
            <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
              PingPanda is the easiest way to monitor your SaaS. Get instant
              notifications for{" "}
              <span className="font-semibold text-gray-700">
                users, or any other event{" "}
              </span>
              sent directly to your Discord.
            </p>
            <ul className="space-y-2 text-base/7 text-gray-600 text-left items-start">
              {[
                "Real-time Discord alerts for critical events",
                "Buy once, use forever",
                "Track sales, new users, or any other event",
              ].map((item) => (
                <li className="flex gap-1.5 items-center text-left" key={item}>
                  <Check className="size-5 shrink-0 text-brand-700" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="w-full max-w-80">
              <ShinyButton
                href="/sign-up"
                className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                Start for free today
              </ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="relative bg-brand-25 pb-4">
        <div className="absolute inset-x-0 bottom-24 top-24 bg-brand-700" />
        <div className="relative mx-auto">
          <MaxWidthWrapper className="relative">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4">
              <MockDiscordUi>
                <AnimatedList>
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="PingPanda avatar"
                    username="PingPanda"
                    timestamp="Today at 12:30 AM"
                    badgeText="SignUp"
                    badgeColor="#43b581"
                    title="👤 New user signed up"
                    content={{
                       name: "some name", email: "somename@gmail.com"
                       }}
                  />
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="PingPanda avatar"
                    username="PingPanda"
                    timestamp="Today at 12:30 AM"
                    badgeText="Revenue"
                    badgeColor="#faa61a"
                    title="💸 Payment recieved"
                    content={{
                       amount:"$49.90",
                       email:"someemail@gmail.com",
                       plan:"PRO"
                       }}
                  />
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="PingPanda avatar"
                    username="PingPanda"
                    timestamp="Today at 5:34 PM"
                    badgeText="Milestone"
                    badgeColor="#5865f2"
                    title="🚀 Revenue Milestone achieved"
                    content={{
                       recurringRevenue :"$5,000",
                       growth:"+8.2%",
                       }}
                  />
                </AnimatedList>
              </MockDiscordUi>
            </div>
          </MaxWidthWrapper>
        </div>
      </section>
      <section></section>
      <section></section>
    </>
  )
}

export default page
