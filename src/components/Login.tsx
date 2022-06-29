import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { Dashboard } from "./Dashboard";
import { User } from "../models/User";
import { Link } from "react-router-dom";

export function Login () {
   
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<User>({_id: "", name:"", subStatus: false})

    const [userToLogin, setUserToLogin] = useState({
        email: "",
        password: ""
    });

// Kollar mot LocalStorage om användaren är inloggad
    useEffect(()=> {
      let loginCheck = localStorage.getItem("activeUser");
      if (!loginCheck){
        setIsLoggedIn(false)
      } else {
        setIsLoggedIn(true)
        setLoggedInUser(JSON.parse(loginCheck))
      }
      
    }, [])

   
    async function login(e: FormEvent<HTMLFormElement> ) {
        e.preventDefault();
        let userTest: User = new User("", "", false)
        try {
          await axios.post(`http://localhost:4000/user/userlogin`, userToLogin)
          .then(res => {
            userTest._id = res.data._id;
            userTest.name = res.data.name;
            userTest.subStatus = res.data.subStatus
          })
          setIsLoggedIn(true)
          setLoggedInUser(userTest)
          
          
        } catch (err){
          alert("Wrong password or username");
          setIsLoggedIn(false);
        }

        localStorage.setItem("activeUser", JSON.stringify(userTest));   
    }
    
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let user: string = e.target.name;
        setUserToLogin({...userToLogin, [user]: e.target.value });
      }
    

  
    return (<>
   
    {/* <h1 className="text-red">KÖPGAMMALTSKROT.SE</h1> */}

    {!isLoggedIn && (
    <section className="w-full h-screen flex justify-center items-center bg-wall bg-cover">
    <div className="w-full max-w-xs justify-center">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={login}>
      <div className="mb-4">
        <h4 className="text-3xl font-bold text-red-600">
          Login
        </h4>
      </div>  
      <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Email 
        <br/>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required type="email" name="email" placeholder="email" value={userToLogin.email} onChange={handleChange}/>
      </label>
      </div>
      <div className="mb-10">

      <label className="block text-gray-700 text-sm font-bold mb-2">Password 
        <br/>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required type="password" name="password" placeholder="password" value={userToLogin.password} onChange={handleChange}/>
       
      </label>
      </div>
      <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Sign in"/>
      
      <Link to="/"><button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create account</button></Link>
    </form>
    
    
    </div>

    
    </section>
    )}

    {isLoggedIn && (
      <section>
      <Dashboard user={loggedInUser}></Dashboard>
      </section>
      
    )}

    </>)
}