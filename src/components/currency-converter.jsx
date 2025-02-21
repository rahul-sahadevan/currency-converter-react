import React, { useEffect, useState } from 'react'
import '../App.css'
import DropDown from './dropdown'
import { HiArrowsRightLeft } from 'react-icons/hi2'
import axios from 'axios'

const CurrencyConverter = () => {

  const [currencies,setCurrencies] = useState([])
  const [amount,setAmout] = useState(1)
  const [fromCurrency,setFromCurrency] = useState('USD')
  const [toCurrency,setToCurrency] = useState('INR')
  const [convertedAmount,setConvertedAamount] = useState(null)
  const [converting,setConverting] = useState(false)
  const [favorites,setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [''])

localStorage.clear()
  console.log(fromCurrency,toCurrency)
    // currencies -> https://api.frankfurter.app/currencies

    const fetchCurrecies = async()=>{
      try{

        const res = await fetch('https://api.frankfurter.app/currencies')
        const data = await res.json()
        console.log(data);
        
        setCurrencies(Object.keys(data))

      }
      catch(error){
        console.log(error)
      }
    }

    useEffect(()=>{
      fetchCurrecies()
     
    },[])
    // currencies -> https://api.frankfurter.app/latest?amount=1&from=USD&to=INR


    const convertCurrency = async ()=>{

      if(!amount) return
      setConverting(true)
      try{

        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
        const data = await res.json()
        console.log(data);
        
        // setCurrencies(Object.keys(data))
        setConvertedAamount(data.rates[toCurrency] + ' ' + toCurrency)

      }
      catch(error){
        console.log(error)
      }finally{
        setConverting(false)
      }
       
    }

    const handleFavorites = (currency)=>{
      if(!favorites.includes(currency)){
        let updatedFav = [...favorites]
        updatedFav.push(currency)
        setFavorites(updatedFav)
        localStorage.setItem('favorites',(JSON.stringify(favorites)))
      }
      else{
        alert('Already present in favoites ')
      }


    }

    const swapCurrencies = ()=>{
      setFromCurrency(toCurrency)
      setToCurrency(fromCurrency)
    }




  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
      <h2 className='mb-5 text-2xl font-semibold text-gray-700'>Currency Converter</h2>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
        <DropDown 
          favorites={favorites}
          currencies={currencies} 
          setCurrencies={setCurrencies}
          title='From:' 
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavorites={handleFavorites}
        />
        {/* swap button */}
        <div className='flex justify-center -mb-5 sm:mb-0'>
          <button onClick={swapCurrencies} className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
            <HiArrowsRightLeft className='text-xl text-gray-700'/>
          </button>
        </div>
        <DropDown 
          favorites={favorites}
          currencies={currencies} 
          setCurrencies={setCurrencies}
          title='To:' 
          currency={toCurrency}
          setCurrency={setToCurrency}
          handleFavorites={handleFavorites}
        />
      </div>

      <div className='mt-4'>
          <label htmlFor="amount" className='block text-sm font-medium text-gray-700'>
            Amount:
          </label>
          <input onChange={(e)=> setAmout(e.target.value)} value={amount} type="number" className='w-full p-2
          border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
      </div>
      <div className='flex  justify-end mt-6'>
        <button onClick={convertCurrency} className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 
         ${converting ? 'animate-pulse' : ''}focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>Convert</button>

      </div>
      {convertedAmount && (
        <div className='mt-4 text-lg font-medium text-green-700 text-right'>
          Converted Amount: {convertedAmount}
        </div>

      )}
    </div>
  )
}

export default CurrencyConverter
