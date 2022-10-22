import React from 'react'

export default function MessageCard({name, email, title, details}) {


  return (
        <div className="flex flex-col w-full md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg hover:opacity-75">
            <div className="p-6 flex flex-col justify-start">
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
        </div>
  )
};