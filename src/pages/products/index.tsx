import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdArrowLeft, MdArrowRight } from 'react-icons/md'
import ReactPaginate from 'react-paginate'

function Products() {
  const [products, setProducts] = useState<any>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [limit, setLimit] = useState<any>(12)
  const [page, setPage] = useState<any>(0)
  const [total, setTotal] = useState<any>(0)
  const [sortBy, setSortBy] = useState<string>('')

  useEffect(() => {
    getProducts()
  }, [selectedCategory, sortBy, limit, page])

  useEffect(() => {
    getCategories()
  }, [])

  const getProducts = async () => {
    const categoryParams = !selectedCategory ? '' : `/category/${selectedCategory}`
    const sortParams = !sortBy ? '' : `sortBy=price&order=${sortBy}`
    const skipParams = `&skip=${(~~page - 1) * ~~limit}`
    const limitParams = `&limit=${limit}`
    const params = sortParams + skipParams + limitParams
    fetch(`https://dummyjson.com/products${categoryParams}?${params}`)
      .then(res => res.json())
      .then(res => {
        setProducts(res.products)
        setTotal(res?.total)
      });
  }

  const getCategories = async () => {
    fetch('https://dummyjson.com/products/category-list')
      .then(res => res.json())
      .then(res => {
        setCategories(res)
      });
  }

  const handlePageClick = (event:any) => {
    setPage(event.selected + 1)
  };

  if(!products) return null
  return (
    <div className='p-12'>
      <div className="flex justify-between items-center">
        <h1 className='text-2xl font-bold mb-5'>Products</h1>
        <div className="filters flex items-center gap-x-2">
          Filters by Category:
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className='border px-2 py-1 rounded'>
            <option value={``}>
              Select Category
            </option>
            {categories?.map((cat: string) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
            <div className="w-1/6"></div>
          </select>

          <div className="ml-5">Sort by Price:</div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='border px-2 py-1 rounded'>
            <option value="">sort by</option>
            <option value="asc">Min Price</option>
            <option value="desc">Max Price</option>
          </select>
        </div>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
        {products?.map((product: any) => (
          <Link href={`/products/${product?.id}`} key={product.id} className='w-full min-h-24 rounded-md border-2 border-gray-300 p-3'>
            <div className="flex items-start gap-3">
              <Image src={product.images?.[0]} width={0} height={0} sizes='30vw' alt={product.title} className='w-12 h-auto object-contain border border-gray-300 rounded' />
              <div>
                <div className="font-bold">{product.title}</div>
                <div className="text-xs" title={product.description}>{product.description.substring(0, 50)}...</div>
              </div>
            </div>
            <div className="price">$ {product.price.toLocaleString('us')}</div>
          </Link>
        ))}
      </div>
      
      
      <ReactPaginate
        activeClassName={'item active '}
        breakClassName={'item break-me '}
        breakLabel={'...'}
        containerClassName={'pagination'}
        disabledClassName={'disabled-page'}
        marginPagesDisplayed={2}
        nextClassName={"item next "}
        pageClassName={'item pagination-page '}
        pageRangeDisplayed={2}
        previousClassName={"item previous"}
        nextLabel={<MdArrowRight size={20} />}
        onPageChange={handlePageClick}
        pageCount={total / limit}
        previousLabel={<MdArrowLeft size={20} />}
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Products
