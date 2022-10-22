import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { loggedIn } from "../Contexts/loggedIn";
import CreateFish from './CreateFish';
import FishCard from './FishCard';
import EditFish from './EditFish';

function LoadFish({regionName, regionId}) {
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([])
  const [isClicked, setIsClicked] = useState(false);
  const [clickedFish, setClickedFish] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClick = () => setIsClicked(true);


  const {isLoggedIn} = useContext(loggedIn);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/fish_all/?format=json')
      .then(response => {
        setPosts(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },[])

  useEffect(() => {
    setClickedFish(clickedFish)
    
  })

  return ((isLoggedIn === true) ? (
      
      <>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="primary" onClick={handleShow}>
          {regionName}
        </button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
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
                          <ul>
                            <li key={item.id}
                                className='p-2'
                                onClick={() => {
                                  setIsClicked(!isClicked);
                                  setClickedFish({id: item.id, name: item.name, scientific: item.scientific, region: item.region})
                                  console.log(clickedFish)
                                  console.log(isClicked)
                                  
                                }}>
                                <FishCard
                                  name={item.name}
                                  scientific={item.scientific}
                                  region={item.region}
                                    />
                            </li>
                          </ul>
                        );
                      } else {
                        if (item.region === regionId) {
                          return (
                            <ul>
                            <li key={item.id}>
                              <div className='p-2'>
                                <FishCard
                                  name={item.name}
                                  scientific={item.scientific}
                                  region={item.region}
                                    />
                              </div>
                            </li>
                          </ul>
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
            <CreateFish />
            {(isClicked === true) ? (
              <EditFish name={clickedFish.name} scientific={clickedFish.scientific} region={clickedFish.region} id={clickedFish.id} />
              ) : (
              <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded" variant="primary">
              Edit
              </button>
            )}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="primary" onClick={handleClose}>
              Delete
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="primary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </>
    ) : (
      <>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="primary" onClick={handleShow}>
          {regionName}
        </button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
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
                          <ul>
                            <li key={item.id}         >
                              <div className='p-2' >
                                <FishCard
                                  name={item.name}
                                  scientific={item.scientific}
                                  region={item.region}
                                  
                                    />
                              </div>
                            </li>
                          </ul>
                        );
                      } else {
                        if (item.region === regionId) {
                          return (
                            <ul>
                            <li key={item.id}>
                              <div className='p-2'>
                                <FishCard
                                  name={item.name}
                                  scientific={item.scientific}
                                  region={item.region}
                                    />
                              </div>
                            </li>
                          </ul>
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="primary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </>
  )
  
  )}


export default LoadFish