import React from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { messageReloaderState } from '../atoms'



export default function MessageCard({id, name, email, title, details}) {

  const [messageReloader, setMessageReloader] = useRecoilState(messageReloaderState);

  const del = (id) => {
    axios.
      delete(`http://127.0.0.1:8000/delete_message/${id}/`)
      .then((response) => {
        console.log(response.data);
        
      })
      .catch(error => {
        console.log(error)
      });
    setMessageReloader((messageReloader) => messageReloader + 1);
  }

  return (
            <div className="flex flex-row w-full p-3 block rounded-lg shadow-lg bg-white">
                <div>
                  <h5 className="text-gray-700 text-base mb-4">
                      {title}
                  </h5>
                  <p className="text-gray-600 text-xs">
                      Sent By: {name}
                  </p>
                  <p className="text-gray-600 text-xs">
                      Contact: {email}
                  </p>
                  <p className="text-gray-600 text-xs">
                      Details: {details}
                  </p>
                </div>  
                <button 
                  type="button" 
                  className="w-min h-min absolute right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {del(id)}}
                  >X
                </button>
              </div>
       
  )
};