import React, { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';
import { RegisterService } from './services/RegisterService';
import { Link } from 'react-router-dom';

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

function handleChange(e: ChangeEvent<HTMLInputElement>) {
  let user: string = e.target.name;
  setNewUser({ ...newUser, [user]: e.target.value });
}

function handleCheckBox() {
  setChecked(!checked);
  
}
function register (e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  console.log(newUser.email + " hej")
  newUser.subStatus = checked;
  console.log("register function " + checked)
  service.createNewUser(newUser)
  setNewUser({name: "", email: "", password:"", subStatus:false});
  alert("Du har skapat ett konto")
  
}


  return (
  <>
    <h1>Skapa ett konto</h1>
    <form onSubmit={register}>
      <input required type="text" name="name" placeholder="name" value={newUser.name} onChange={handleChange}/>
      <input required type="email" name="email" placeholder="email" value={newUser.email} onChange={handleChange}/>
      <input required type="password" name="password" placeholder="password" value={newUser.password} onChange={handleChange}/>
      <label> JA! Jag vill prenumerera på nyhetsbrevet!
      <input type="checkbox" name="subStatus" checked={checked} onChange={handleCheckBox}/>
      </label>
      <input type="submit"/>
    </form>
    <Link to="/login">Logga in här</Link>
  </>)
  
  
}

export default App;
