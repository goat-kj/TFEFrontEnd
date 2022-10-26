import React, { useState } from 'react'
import axios from 'axios'
import EditFish from './EditFish'
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState, reloaderState } from '../atoms';


export default function FishCard({id, name, scientific, region}) {
  

  const isLoggedIn = useRecoilValue(isLoggedInState);

  const [reloader, setReloader] = useRecoilState(reloaderState);

  const del = (id) => {
    axios.
      delete(`http://127.0.0.1:8000/delete_fish/${id}/`)
      .then((response) => {
        console.log(response.data);
        
      })
      .catch(error => {
        console.log(error)
      });
    setReloader((reloader) => reloader + 1);
    }

  return (
    <div className="w-full">
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{name}</h5>
            <p className="text-gray-700 text-base mb-4">
                {scientific}
            </p>
            <p className="text-gray-700 text-base mb-4">
                {region}
            </p>
            
            {(isLoggedIn === true) ? (
              <div className="space-x-2">
              
                <EditFish id={id} name={name} scientific={scientific} region={region}/>
                <button 
                type="button" 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {del(id)}}
                >Delete
                </button>
              </div>
              ) : (<></>)}
            </div>
        
    </div>
  )
};