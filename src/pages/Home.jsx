import React from 'react'
import Banner from '../components/Banner'
import CategoryDropdown from '../components/CategoryDropdown'
import ProductCard from '../components/ProductCard'
import CarouselContainer from "../components/CarouselContainer.jsx";
import Details from '../components/Details'
import SuggestedForYou from '../components/SuggestedForYou'
import LastChanceOffer from '../components/LastChanceOffer.jsx'
import Banner3 from '../components/Banner3.jsx'
import ProductsPage from '../components/ProductsPage'
import ProductCarousel from "../components/ProductCarousel.jsx";
import Gender from "../components/Gender.jsx";
import DeliveryMarquee from '../components/DeliveryMarquee.jsx'
const Home = () => {
  return (
    <div className=''>
      <DeliveryMarquee />
            <Details />

            <CategoryDropdown />

      <Banner />
      <ProductCarousel />
      <LastChanceOffer />

      <CarouselContainer />
      {/* <SuggestedForYou /> */}

      <ProductsPage />
      <Banner3 />
      {/* <Gender /> */}

    </div>
  )
}

export default Home
