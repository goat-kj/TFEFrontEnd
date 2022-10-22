import React from 'react'

export default function FishCard({name, scientific, region}) {


  return (
        <div className="flex flex-col justify-start w-full md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg hover:opacity-75"

        >
            <img className=" w-20 h-20" src="https://i.pinimg.com/564x/37/88/31/378831fd6c64524de6a4fc76ed9a127a.jpg" alt="" />
            <div className="p-4 flex flex-col justify-start">
                <h5 className="text-gray-700 text-base mb-4">
                    {name}
                </h5>
                <p className="text-gray-600 text-xs">
                    {scientific}
                </p>
                <p className="text-gray-600 text-xs">
                    {region}
                </p>
            </div>
        </div>
  )
};