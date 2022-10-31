import axios from 'axios';
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from 'recoil';
import { reloaderState } from '../atoms';


export default function CreateFish() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [reloder, setReloader] = useRecoilState(reloaderState)

  const [name, setName] = useState('');
  const [scientific, setScientific] = useState('');
  const [region, setRegion] = useState('');
  const [image, setImage] = useState('');
  const [types, setTypes] = useState('');
  const [sizes, setSizes] = useState('');


  const CreateFish = (name, scientific, region, image, types, sizes) => {
    axios
      .post('http://127.0.0.1:8000/add_fish/', {data: {
        name: name,
        scientific: scientific,
        region: region,
        image: image,
        types: types,
        sizes: sizes,
      }, headers: {
        'Content-Type': 'application/json'
    }})
      .then((response) => {
        console.log(response.data);
        
      })
      .catch(error => {
        console.log(error)
      });
      setName('')
      setScientific('')
      setRegion('')
      setImage('')
      setTypes('')
      setSizes('')
      setReloader((reloader) => reloader + 1);
    }

  return (
    <>
      <button onClick={handleShow}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        variant="primary">
        +
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add A New Fish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={(e) => {
              handleClose();
              e.preventDefault();
              CreateFish(name, scientific, region, image, types, sizes)
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
                        value={name}
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
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                        id="scientific" 
                        type="text" 
                        value={scientific}
                        onChange={(e) => {setScientific(e.target.value)}} />
                    </div>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Region
                        </label>
                    </div>
                    <div className="md:w-2/3">
                      <select className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                      id="region"
                      value={region}
                      onChange={(e) => {setRegion(e.target.value)}}>
                        <option value={1}>South America</option>
                        <option value={2}>Southeast Asia</option>
                        <option value={3}>Africa</option>
                      </select>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Image URL
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                        id="image" 
                        type="text" 
                        value={image}
                        onChange={(e) => {setImage(e.target.value)}} />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Type
                        </label>
                    </div>
                    <div className="md:w-2/3">
                      <select className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                      id="types"
                      value={types}
                      onChange={(e) => {setTypes(e.target.value)}}>
                        <option value={"Livebearers"}>Livebearers</option>
                        <option value={"Minnows"}>Minnows</option>
                        <option value={"Cichlids"}>Cichlids</option>
                        <option value={"Catfish"}>Catfish</option>
                        <option value={"Labyrinth"}>Labyrinth</option>
                        <option value={"Oddballs"}>Oddballs</option>
                      </select>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Size(cm)
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                        id="name" 
                        type="text" 
                        value={sizes}
                        onChange={(e) => {setSizes(e.target.value)}} />
                    </div>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
        <button className="bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded" onClick={handleClose}>Close</button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClose}
          form="editmodal">
          Add
        </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}