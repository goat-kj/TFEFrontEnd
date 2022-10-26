import axios from 'axios';
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from 'recoil';
import { reloaderState } from '../atoms';


export default function EditFish({id, name, scientific, region}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Name, setName] = useState(name);
  const [Scientific, setScientific] = useState(scientific);
  const [Region, setRegion] = useState(region);

  const [reloader, setReloader] = useRecoilState(reloaderState);
  
  const EditFish = (Name, Scientific, Region) => {
    axios
      .put(`http://127.0.0.1:8000/update_fish/${id}/`, {data: {
        name: Name,
        scientific: Scientific,
        region: Region,
      }, headers: {
        'Content-Type': 'application/json'
    }})
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error)
      });
      setReloader((reloader) => reloader + 1);
    }

  return (
    <>
      <button onClick={handleShow}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        variant="primary">
        Edit
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Fish Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={(e) => {
              handleClose();
              e.preventDefault()
              EditFish(Name, Scientific, Region)
            }}
            id="editmodal" className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Fish Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                        id="name" 
                        type="text" 
                        placeholder={name}
                        value={Name}
                        onChange={(e) => {setName(e.target.value)}} />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Scientific Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                        id="scientific" 
                        type="text" 
                        placeholder={scientific}
                        value={Scientific}
                        onChange={(e) => {setScientific(e.target.value)}} />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Region
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                        id="region" 
                        type="number"
                        placeholder={region} 
                        value={Region}
                        onChange={(e) => {setRegion(e.target.value)}} />
                    </div>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClose}
          form="editmodal">
          Edit
        </button>
        <button className="bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded" onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
