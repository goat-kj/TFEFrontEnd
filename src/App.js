import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadFish from './Components/LoadFish';
import Header from './Components/Header';


export default function App() {

  return (
  <div className="App">
      <Header />
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600 flex flex-wrap justify-center">Tropical Fish Encyclopedia</h1>
      <div className="flex flex-wrap justify-center gap-x-5">
        <LoadFish regionName={"All Fish"} regionId={0} />
        <LoadFish regionName={"South America"} regionId={1} />
        <LoadFish regionName={"Southeast Asia"} regionId={2} />
        <LoadFish regionName={"Africa"} regionId={3} />
      </div>
  </div>
  );
}


