import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Product } from "@/types/productTypes"
interface Props {
  products: Product[]
}

const Products = ({ products }: Props) => {
  return (
    <>
      {products ? (
        products.map((product) => (
          <Card key={product.id}>
            <CardContent className="flex flex-col items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.description}
                className="object-contain h-48 rounded"
              />
            </CardContent>
            <CardFooter className="text-center flex flex-col p-4">
              <CardTitle className="my-2">{product.title}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="text-xl font-bold">No beers available!!</div>
      )}
    </>
  )
}

export default Products
