import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function ProductDetails() {
  const [product, setProduct] = useState<any>(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      getProduct()
    }
  }, [id])

  const getProduct = async () => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(res => {
        setProduct(res)
      });
  }

  if (!product) return null
  return (
    <div className="flex items-start gap-3 p-12">
      <Image src={product.images?.[0]} width={0} height={0} sizes='30vw' alt={product.title} className='w-24 h-auto object-contain border border-gray-300 rounded' />
      <div>
        <div className="font-bold">{product.title}</div>
        <div className="text-xs" title={product.description}>{product.description}</div>
        <div className="price">$ {product.price.toLocaleString('us')}</div>
      </div>

    </div>
  )
}
