import React, { useEffect } from 'react'
import { HiOutlineStar, HiStar } from 'react-icons/hi'

const DropDown = ({
    currencies,
    currency,
    setCurrencies,
    setCurrency,
    favorites,
    handleFavorites,
    title='',
}) => {

  const isFav = curr => favorites.includes(curr)



    
 
   
  return (
    <div>

      <label className='block text-sm font-medium text-gray-700' htmlFor={title}>{title}</label>
      <div className='mt-1 relative'>
        <select value={currency} onChange={(e)=> setCurrency(e.target.value) } className='w-full p-2 border border-gray-400 rounded-md shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-indigo-500'>
            {/* render fav */}
            {
              favorites.map((fav)=>{
                return <option className='bg-gray-200'>
                  {fav}
                </option>
              })
            }
            <hr />
            {
                currencies?.map((currency)=>{
                    return (
                        <option value={currency} key={currency}>{currency}</option>
                    )
                })
            }
        </select>
        <button onClick={()=> handleFavorites(currency)} className='absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5'>
            {
              isFav(currency) ? (
                <HiStar/>
              ):
              (
                <HiOutlineStar/>
              )
            }
        </button>
      </div>
    </div>
  )
}

export default DropDown
