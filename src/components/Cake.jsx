import React, { useEffect, useState } from 'react'
import Filters from './Filters'
import naturemedica from '../assets/product specfic banner/cake.png'
import axios from 'axios';
const NatureMedica = () => {
      const [products, setProducts] = useState([]);

      useEffect(() => {
        const fetchNatureMedica = async () => {
          try {
            const res = await axios.get("https://op-backend-lgam.onrender.com/api/customer/products/all");
            const filtered = res.data.filter((item) => item.brand === "Cakes");
            setProducts(filtered);
          } catch (err) {
            console.error("Error fetching Cakes products:", err);
          }
        };
    
        fetchNatureMedica();
      }, []);

      if (products.length === 0) {
        return <p className="text-center text-gray-500 mt-10">Loading Cakes products...</p>;
      }
    
  
  return (
    <>
    
      <img src={naturemedica} alt="" className='h0' />
    <div className='flex'>
      <Filters />

    </div>
    </>
  )
}

export default NatureMedica
