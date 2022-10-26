import axios from 'axios';
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';

export default function SendMessage() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [posts, setPosts] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  
  const addMessage = (name, email, title, message) => {
    axios
      .post('http://127.0.0.1:8000/add_message/', {data: {
        name: name,
        email: email,
        title: title,
        details: message,
      }, headers: {
        'Content-Type': 'application/json'
    }})
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error)
      });
    setName('');
    setEmail('');
    setTitle('');
    setMessage('');
    }

  return (
    <>
      <button onClick={handleShow}
        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
        variant="primary">
        Send Message
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Send a Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={(e) => {
              handleClose();
              e.preventDefault();
              addMessage(name, email, title, message);
            }}
            id="editmodal" className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Your Name
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
                            Your Email:
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                        id="email" 
                        type="text" 
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}} />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Title
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                        id="title" 
                        type="text" 
                        value={title}
                        onChange={(e) => {setTitle(e.target.value)}} />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Message
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                        id="message" 
                        type="text" 
                        value={message}
                        onChange={(e) => {setMessage(e.target.value)}} />
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