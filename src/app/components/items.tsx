"use client";
import React from 'react'
import { ItemCard } from './ItemCard';
import {useEffect, useState} from 'react';
type Product = {
    id: string;
    name: string;
    price: number;
    description?: string;
    inStock: boolean;
};
export const  Items = ( {products }:{products:Product[]})=> {

const [page, setpage] = useState(2)
const [items, setproducts] = useState( products || [] )
const [hasMore, sethasMore] = useState(true)

useEffect(() => {
    
      
    const handleScroll = () => {
      if(window.innerHeight + document.documentElement.scrollTop +1 >= document.documentElement.offsetHeight){
       if(hasMore) setpage((prevPage) => prevPage + 1);
    }}
       
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
     
      }, []);
    
      useEffect(() => {
        const fetchMoreProducts = async () => {
          const res = await fetch(`http://localhost:3000/api/product?page=${page}`);
          const newProducts: Product[] = await res.json();
          // Append new products to existing list
          setproducts((prevProducts) => [...prevProducts, ...newProducts]);
        };
        //TODO
        if(page == 4) sethasMore(false);
       if(page != 2 && hasMore) fetchMoreProducts();
      }, [page])
      
     


  return (
     <>
      {items.map(
            (item:Product) => (
              <ItemCard key={item.id} {...item}></ItemCard>
            )
          )}
     </> 
  )
}
