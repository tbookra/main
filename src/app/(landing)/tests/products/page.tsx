"use client"
import React, { useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/app/api/productItems"
import { useInView } from "react-intersection-observer"
import Products from "./Product"
import { Product } from "@/types/productTypes"

const Page = () => {
  const { data, status, error, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["items"],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParams) =>
      lastPage?.nextPage,
  })
  const { ref, inView } = useInView()
  
  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  return status === "pending" ? (
    <div>Loading...</div>
  ) : status === "error" ? (
    <div>{error.message}</div>
  ) : (
    <div className="container mx-auto p-4 min-h-screen max-w-5xl">
      <h1 className="text-3xl font-bold mb-4 text-center">Infinite Scroll</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Products
          products={
            data?.pages.flatMap((page) => page?.data) as Product[]
          }
        />
      </div>
      <div ref={ref}>{isFetching && "Loading..."}</div>
    </div>
  )
}

export default Page
