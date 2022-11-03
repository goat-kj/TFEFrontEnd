import React, { useState } from 'react'
import axios from 'axios'
import EditFish from './EditFish'
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState, reloaderState } from '../atoms';


export default function FishCard({id, name, scientific, region, image, types, sizes}) {
  

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

    const regionString = {
      1: "South America",
      2: "Southeast Asia",
      3: "Africa",
    }

  return (
    <div className="w-full">
          <div className="block p-3 rounded-lg shadow-lg bg-white ">
            
              <div className="relative h-0 pt-2/3">
              <img className="py-2 absolute inset-0 w-full h-full object-cover" src={image} alt="Image missing."></img>
              </div>
              <div>
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{name}</h5>
                <p className="text-gray-700 text-base mb-4">
                    Scientific Name: {scientific}
                    <br/>
                    Region: {regionString[region]}
                    <br/>
                    Type: {types}
                    <br/>
                    Size(cm): {sizes}
                </p>

              </div>  
              {(isLoggedIn === true) ? (
              <div className="space-y-1 space-x-1">
                <EditFish id={id} name={name} scientific={scientific} region={region} image={image} types={types} sizes={sizes}/>
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