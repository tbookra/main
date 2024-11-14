import React, { PropsWithChildren } from "react"
import { Icons } from "./icons"

interface Props {}

export const MockDiscordUi = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-[800px] w-full max-w-[1200px] bg-discord-background text-white rounded-lg overflow-hidden shadow-xl">
        {/*server list */}
        <div className="hidden sm:flex w-[72px] bg-[#202225] py-3 flex-col items-center  gap-2">
            <div className="size-12 bg-discord-brand-color rounded-2xl flex items-center justify-center mb-2 hover:rounded-xl transition-all duration-200">
                <Icons.discord className="size-3/5 text-white" />
            </div>
            <div className="w-8 h-[2px] bg-discord-background rounded-full my-2 ">
                {[...Array(5)].map((_,i)=>(
                    <div key={i} className="size-12 bg-discord-background rounded-3xl flex items-center justify-center my-3 -mx-1.5 hover:rounded-xl transition-all duration-200 hover:bg-discord-brand-color cursor-not-allowed">
                        <span className="text-lg font-semibold text-gray-400">
                            {String.fromCharCode(65+i)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
