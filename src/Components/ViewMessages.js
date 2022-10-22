import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import MessageCard from './MessageCard';


export default function ViewMessage() {
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/get_message_all/?format=json')
      .then(response => {
        setPosts(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return(
    <>
        <button
         className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
         variant="primary"
          onClick={handleShow}>
          View Message
        </button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>View All Messages</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div>
                <div>
                  <ul>
                    {posts.map(item => (
                      <li key={item.id}>
                        <div className="p-2">
                          <MessageCard name={item.name} email={item.email} title={item.title} details={item.details}/>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="primary" onClick={handleClose}>
              View
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="primary" onClick={handleClose}>
              Delete
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="primary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
    </>
  )
}