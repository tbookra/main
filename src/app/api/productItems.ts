import { Product } from "@/types/productTypes"

export async function fetchProducts({ pageParam }: { pageParam: number }) {

  const perPage = 15
  const apiUrl = `https://fakestoreapi.in/api/products?page=${pageParam}&limit=${perPage}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    return {
      data: data.products as Product[],
      currentPage: pageParam,
      nextPage: pageParam * perPage < 150 ? pageParam + 1 : null,
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    return null
  }
}
