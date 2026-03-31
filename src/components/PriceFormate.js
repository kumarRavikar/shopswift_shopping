import React from 'react'

const PriceFormate = ({price}) => {
  return Intl.NumberFormat('en-IN',{
    style:'currency',
    currency:'INR',
    maximumFractionDigits:2,
  }).format(price)
}

export default PriceFormate