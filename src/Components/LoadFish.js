import React, { useState, useEffect } from 'react';
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
  },[reloader])



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
          <Modal.Header closeButton>
            <Modal.Title>{regionName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div>
                <div>
                  <ul>
                  {posts.map((item) => {
                      if (regionId === 0) {
                        return (
                            <li key={item.id}
                                className='p-2'>
                                <FishCard
                                  id={item.id}
                                  name={item.name}
                                  scientific={item.scientific}
                                  region={item.region}
                                  image={item.image}
                                  types={item.types}
                                  sizes={item.sizes} />
                            </li>
                        );
                      } else {
                        if (item.region === regionId) {
                          return (
                              <li key={item.id}
                                  className='p-2'>
                                  <FishCard
                                    id={item.id}
                                    name={item.name}
                                    scientific={item.scientific}
                                    region={item.region}
                                    image={item.image}
                                    types={item.types}
                                    sizes={item.sizes} />
                              </li>
                          );
                        }
                        return null;
                      }
                    })}
                  </ul>
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