import React from 'react'
import loaaderImg from '../assets/feather_loader.png'

const Spinner = () => {
  return (
    <div className='spinner'>
      <img src={loaaderImg} alt='loader'></img>
    </div>
  )
}

export default Spinner
