"use client"
import React, { useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchItems } from "@/app/api/items"
import { useInView } from "react-intersection-observer"

interface Props {}

const Page = () => {
  const { data, status, error,fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,

  })
  const { ref, inView } = useInView()

  useEffect(()=>{
    if(inView){
        fetchNextPage()
    }
  },[fetchNextPage,inView])
  return status === "pending" ? (
    <div>Loading...</div>
  ) : status === "error" ? (
    <div>{error.message}</div>
  ) : (
    <div className="flex flex-col gap-2">
      {data.pages.map((page) => (
        <div key={page.currentPage} className="flex flex-col gap-2">
          {page.data.map((item) => (
            <div key={item.id} className="p-4 bg-gray-400 max-w-80">
              {item.name}
            </div>
          ))}
        </div>
      ))}
      <div ref={ref}>{isFetching && "Loading..."}</div>
    </div>
  )
}

export default Page
