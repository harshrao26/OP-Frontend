import React from 'react'
import Filters from './Filters'
import naturemedica from '../assets/product specfic banner/datesbanner.jpeg'
const NatureMedica = () => {
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
