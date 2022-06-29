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
   <section className="w-full h-screen flex justify-center items-center bg-wall bg-cover">
    <div className="w-full max-w-xs justify-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={register}>
      <div className="mb-4">
      <h3 className="text-3xl font-bold text-red-600">
          Create an account
      </h3>
      </div>  
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2"> Full name
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required type="text" name="name" placeholder="name" value={newUser.name} onChange={handleChange}/>
        </label>
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2"> Email
         <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required type="email" name="email" placeholder="email" value={newUser.email} onChange={handleChange}/>
        </label>
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2"> Password
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required type="password" name="password" placeholder="password" value={newUser.password} onChange={handleChange}/>
        </label>
        </div>
        <div className="md:flex md:items-center mb-6">
      <label className="md:w-2/3 block text-gray-500 font-bold"><span className="text-sm">Yes! Sign me up for the newsletter </span>
      <input className="mr-2 leading-tight" type="checkbox" name="subStatus" checked={checked} onChange={handleCheckBox}/>
      </label>
      </div>
      <div className="flex items-center justify-between">
      <input className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" value="Send" type="submit"/>
      <Link to="/login"><a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Log in</a></Link>
      </div>
    </form>
    

    </div>
    </section>

    {success && <Navigate replace to="/login"/>}
  </>)
  
  
}

export default App;
