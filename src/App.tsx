import React, { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';
import { RegisterService } from './services/RegisterService';
import { Link, Navigate } from 'react-router-dom';

// Används för att registrera användare

function App() {
let service = new RegisterService;
const [newUser, setNewUser] = useState({
  name: "",
  email: "",
  password: "",
  subStatus: true
});

const [checked, setChecked] = useState(true);
const [success, setSuccess] = useState(false);

function handleChange(e: ChangeEvent<HTMLInputElement>) {
  let user: string = e.target.name;
  setNewUser({ ...newUser, [user]: e.target.value });
}

function handleCheckBox() {
  setChecked(!checked);
  
}
function register (e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  newUser.subStatus = checked;
  service.createNewUser(newUser)
  setNewUser({name: "", email: "", password:"", subStatus:false});
  alert("Du har skapat ett konto")
  setSuccess(true);
  
}


  return (
  <>
   <section className="container">
    
    <div className="w-4">
    <h3 className="text-3xl font-bold underline text-red-600">
      Skapa ett konto
    </h3>
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={register}>
      <input required type="text" name="name" placeholder="name" value={newUser.name} onChange={handleChange}/>
      <input required type="email" name="email" placeholder="email" value={newUser.email} onChange={handleChange}/>
      <input required type="password" name="password" placeholder="password" value={newUser.password} onChange={handleChange}/>
      <label> JA! Jag vill prenumerera på nyhetsbrevet!
      <input type="checkbox" name="subStatus" checked={checked} onChange={handleCheckBox}/>
      </label>
      <input type="submit"/>
    </form>
    </div>
    <Link to="/login"><button>Logga in här</button></Link>
    </section>

    {success && <Navigate replace to="/login"/>}
  </>)
  
  
}

export default App;
