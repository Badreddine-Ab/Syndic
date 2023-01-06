import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Dashboard() {
  const [apartments, setApartments] = useState([])
  const [selectedApartment, setSelectedApartment] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('/api/apartments')
      setApartments(result.data)
    }
    fetchData()
  }, [])

  return (
    <div className="flex h-screen">
      <div className="w-1/4 h-full border-r border-gray-400">
        <h1 className="text-2xl font-bold py-4 px-4 border-b border-gray-400">
          Apartments
        </h1>
        <ul className="list-none p-4">
          {apartments.map(apartment => (
            <li
              key={apartment.id}
              className="py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => setSelectedApartment(apartment)}
            >
              {apartment.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 h-full p-4">
        {selectedApartment ? (
          <PaymentForm apartment={selectedApartment} />
        ) : (
          <div className="text-center font-bold text-3xl pt-32">
            Select an apartment to view payment details
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
