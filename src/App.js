import { useState, useEffect } from 'react';
import './App.css';
import {  Routes, Route } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ApartmentEdit from "./pages/ApartmentEdit"
import ApartmentIndex from "./pages/ApartmentIndex"
import ApartmentNew from "./pages/ApartmentNew"
import ApartmentShow from "./pages/ApartmentShow"
import ApartmentProtectedIndex from "./pages/ApartmentProtectedIndex"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"

const App = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [apartments, setApartments] = useState([])

  console.log(currentUser)

  const url = 'http://localhost:3000'

  const login = (userInfo) => {
    fetch(`${url}/login`, {
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      method: "POST"
    })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      // store the token
      localStorage.setItem("token", response.headers.get("Authorization"))
      return response.json()
    })
    .then(payload => {
      setCurrentUser(payload)
    })
    .catch(error => console.log("login errors: ", error))
  }

  const signup = (userInfo) => {
    fetch(`${url}/signup`, {
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      method: "POST"
    })
    .then(response => {
      if(!response.ok) {
        throw Error(response.statusText)
      }
      localStorage.setItem("token", response.headers.get("Authorization"))
      return response.json()
    })
    .then(payload => setCurrentUser(payload))
    .catch(errors => console.log("login errors:", errors))
  }

  const logout = () => {
    fetch(`${url}/logout`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") //retrieve the token
      },
      method: "DELETE"
    })
    .then(payload => {
      localStorage.removeItem("token")  // remove the token
      setCurrentUser(null)
    })
    .catch(error => console.log("log out errors: ", error))
  }

  return (
    <>    
    <Header currentUser={currentUser} logout={logout}/>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login login={login} />} />
      <Route path="/signup" element={<SignUp signup={signup} />} />
      <Route path="/apartmentindex" element={<ApartmentIndex apartments={apartments}/>} />
      <Route path="/myapartments" element={<ApartmentProtectedIndex currentUser={currentUser} apartments={apartments} />} />
      <Route path="/apartmentshow/:id" element={<ApartmentShow current_user={currentUser} apartments={apartments}/>} />
      <Route path="/apartmentnew" element={<ApartmentNew />} />
      <Route path="/apartmentedit/:id" element={<ApartmentEdit />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </>
  )
}

export default App