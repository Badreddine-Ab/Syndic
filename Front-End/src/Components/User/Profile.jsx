import React, { useState } from "react";
import axios from 'axios';
import { isAuthenticated } from '../../helper';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const [apartments, setApartments] = useState([]);
  const [newApartment, setNewApartment] = useState({ name: '', address: '', owner: '' });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);


  const fetchApartments = async () => {
    try {
      const jwt = isAuthenticated();
      if (!jwt) {
        return <Navigate to="/login" />
      }
      const res = await axios.get('http://localhost:8080/api/apartment/', {withCredentials: true});
      setApartments(res.data);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    
    fetchApartments();
  }, []);

  const handleAddApartment = async (e) => {
    e.preventDefault();
    try {
      const jwt = isAuthenticated();
      if (!jwt) {
        return <Navigate to="/login" />
      }
      const res = await axios.post('http://localhost:8080/api/apartment/', newApartment, { withCredentials: true });
      setApartments([...apartments, res.data]);
      setShowForm(false);
      fetchApartments(); // call the fetchApartments function again to re-fetch the apartments from the server
    } catch (error) {
      console.log(error);
    }
  }
  

  const handleChange = event => {
    setNewApartment({ ...newApartment, [event.target.name]: event.target.value });
  };

  const handleCancel = () => {
    setShowForm(false);
  };
  

  return (
    <>
      <div className="w-full h-screen bg-gray-900">
        <div className="relative overflow-x-auto p-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Appartement name
                </th>
                <th scope="col" className="px-6 py-3">
                  Adress
                </th>
                <th scope="col" className="px-6 py-3">
                  Owner
                </th>
                <th scope="col" className="px-6 py-3">
                  Mutations
                </th>
                </tr>
        </thead>
        <tbody>
          {apartments.map(apartment => (
            <tr key={apartment._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                {apartment.name}
              </td>
              <td className="px-6 py-4">
                {apartment.address}
              </td>
              <td className="px-6 py-4">
                {apartment.owner}
              </td>
              <td className="px-6 py-4">
                <button className="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Edit
                </button>
                <button className="bg-gray-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {showForm && (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <input
                  name="name"
                  type="text"
                  className="px-4 py-2 rounded-lg"
                  placeholder="Appartement name"
                  value={newApartment.name}
                  onChange={handleChange}
                />
              </th>
              <td className="px-6 py-4">
                <input
                  name="address"
                  type="text"
                  className="px-4 py-2 rounded-lg"
                  placeholder="Address"
                  value={newApartment.address}
                  onChange={handleChange}
                />
              </td>
              <td className="px-6 py-4">
                <input
                  name="owner"
                  type="text"
                  className="px-4 py-2 rounded-lg"
                  placeholder="Owner"
                  value={newApartment.owner}
                  onChange={handleChange}
                />
              </td>
              <td className="px-6 py-4">
    <button className="bg-gray-900 text-white px-2 py-1 rounded" onClick={handleAddApartment}>
      Enter
    </button>
    <button className="bg-gray-600 text-white px-2 py-1 rounded" onClick={handleCancel}>
      Cancel
    </button>
  </td>

            </tr>
          )}
        </tbody>
      </table>
      <div className="px-5 py-3">
        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => setShowForm(!showForm)}>
          Add
        </button>
      </div>
    </div>
  </div>
</>
);
};

export default Profile;