"use client";

import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/check', { value });
      setMessage(response.data.message);
      setValue('');
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.response.data.message);
      setValue('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6'}}>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full" style={{backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', maxWidth: '28rem', width: '100%'}}>
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6" style={{fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', color: '#374151', marginBottom: '1.5rem'}}>Enter Serial Number</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center" style={{marginBottom: '1rem', display: 'flex', alignItems: 'center'}}>
            <label htmlFor="serialNumber" className="mr-4 text-gray-600" style={{marginRight: '1rem', color: '#4B5563'}}>Serial Number:</label>
            <input
              type="text"
              id="serialNumber"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter a 4-digit number"
              className="border border-gray-300 rounded-md p-2 flex-grow" 
              style={{border: '1px solid #D1D5DB', borderRadius: '0.375rem', padding: '0.5rem', flexGrow: 1}}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold rounded-md py-2 hover:bg-blue-600"
            style={{width: '100%', backgroundColor: '#3B82F6', color: 'white', fontWeight: '600', borderRadius: '0.375rem', padding: '0.5rem 0', cursor: 'pointer'}}
          >
            Submit
          </button>
        </form>
        
        {message && (
          <p className={`mt-4 text-center ${(message.includes('not exist') || message.includes('already entered')) ? 'text-red-500' : 'text-green-500'}`} style={{marginTop: '1rem', textAlign: 'center', color: (message.includes('not exist') || message.includes('already entered'))? '#EF4444' : '#10B981'}}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}