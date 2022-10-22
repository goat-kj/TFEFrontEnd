import React, { useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'


export default function StaffLogin({ Login }) {
  
  const [details, setDetails] = useState({account: "", password: ""});
  const [err, setErr] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .get('http://127.0.0.1:8000/staff/1/?format=json')
      .then(response => {
        let err = Login(details, response)
        console.log(err)
        if (err) {
            setErr(err)
        }
        })
      .catch(error => {

          console.log(error)
        })
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  return (
    <>
    <button
    onClick={handleShow}
    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
    Staff Login
    </button>

    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    >
    <Modal.Header closeButton>
        <Modal.Title>Staff Login</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    >
                        Account:
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="account"
                        placeholder="Your Account"
                        type="text"
                        onChange={e => setDetails({...details, account: e.target.value})}
                        value={details.account}
                    />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    >
                        Password
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="password"
                        placeholder="PW"
                        type="password"
                        onChange={e => setDetails({...details, password: e.target.value})}
                        value={details.password}
                    />
                </div>
            </div>
            <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Login" />
        </form>
        {err && <p>{err}</p>}
    </Modal.Body>
    <Modal.Footer>
        <button
            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
        >
            Close
        </button>
    </Modal.Footer>
    </Modal>
    </>
  );
}