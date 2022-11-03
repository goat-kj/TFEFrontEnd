import React, { useState, useEffect, useMemo } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import CreateFish from './CreateFish';
import FishCard from './FishCard';
import { useRecoilValue } from 'recoil';
import { isLoggedInState, reloaderState } from '../atoms';

function LoadFish({regionName, regionId}) {

  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  
  const reloader = useRecoilValue(reloaderState)

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    
  };
  
  const isLoggedIn = useRecoilValue(isLoggedInState);

  useEffect(() => {
    axios
    .get('http://127.0.0.1:8000/fish_all/?format=json')
    .then(response => {
      setPosts(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  },[posts])

  const [filteredList, setFilteredList] = useState([])
  const [selectedCategory, setSeletctedCategory] = useState()
  
  useEffect(() => {
    setFilteredList(posts)
  },[])

  function getFilteredList() {
    if (selectedCategory == "All" || !selectedCategory) {
      return posts
    }
    return posts.filter((post) => post.types == selectedCategory)
  }

  const filteredFish = useMemo(getFilteredList, [selectedCategory, filteredList])  

  return (
      <>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="primary" onClick={handleShow}>
          {regionName}
        </button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}>  
          <Modal.Header  closeButton>
            <Modal.Title>{regionName}</Modal.Title>
            <select className="w-1/3 absolute right-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            id="filters"
            value={selectedCategory}
            onChange={(e) => {setSeletctedCategory(e.target.value)}}>
              <option value={"All"}>All</option>
              <option value={"Livebearers"}>Livebearers</option>
              <option value={"Minnows"}>Minnows</option>
              <option value={"Cichlids"}>Cichlids</option>
              <option value={"Catfish"}>Catfish</option>
              <option value={"Labyrinth"}>Labyrinth</option>
              <option value={"Oddballs"}>Oddballs</option>
            </select>
          </Modal.Header>
          <Modal.Body>
              <div>
                <div>
                  {filteredFish.map((item) => {
                      if (regionId === 0) {
                        return (
                            <div key={item.id}
                                className='py-2'>
                                <FishCard
                                  id={item.id}
                                  name={item.name}
                                  scientific={item.scientific}
                                  region={item.region}
                                  image={item.image}
                                  types={item.types}
                                  sizes={item.sizes} />
                            </div>
                        );
                      } else {
                        if (item.region === regionId) {
                          return (
                              <div key={item.id}
                                  className='p-2'>
                                  <FishCard
                                    id={item.id}
                                    name={item.name}
                                    scientific={item.scientific}
                                    region={item.region}
                                    image={item.image}
                                    types={item.types}
                                    sizes={item.sizes} />
                              </div>
                          );
                        }
                        return null;
                      }
                    })}
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            {(isLoggedIn === true) ? (<CreateFish />) : (<></>)}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="primary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </>  
  )}


export default LoadFish