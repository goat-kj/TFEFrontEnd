import React, { useState } from "react";
import { atom, useRecoilState } from 'recoil';
import SendMessage from "./SendMessage";
import StaffLogin from "./StaffLogin";
import ViewMessage from "./ViewMessages";
import { isLoggedInState } from "../atoms";

export default function Header({ fixed }) {
  


  const [staff, setStaff] = useState({account: ""});
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  function Login(details, response) {
    
    if (details.account === response.data.account && details.password === response.data.password) {
      setStaff({
        account: details.account,
        password: details.password
      })
      setIsLoggedIn(true);
    } else {
      return "Incorrect Login Info."
    };

  };

  function Logout() {
    setStaff({account: ""})
    setIsLoggedIn(false)
  };

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-700 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-end">
          {(isLoggedIn === true) ? (
            <><button className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" onClick={Logout}>Logout</button>
            <ViewMessage />
            </>
          ) : (
            <>
            <StaffLogin Login={Login} error={error} /> 
            <SendMessage />
            </>
          )}
        </div>
      </nav>
    </>
  );
};