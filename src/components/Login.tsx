import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RegisterService } from "../services/RegisterService";
import axios from "axios";
import { Settings } from "./Settings";
import { User } from "../models/User";
import { Link } from "react-router-dom";

export function Login () {
    let service = new RegisterService;

    const [checked, setChecked] = useState(true);
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

    useEffect(() => {
      if (loggedInUser){
        if (loggedInUser.subStatus) {
          setChecked(true)
        } else {setChecked(false)}
        console.log(checked + " checked")
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
          // setUserToLogin({email: "", password: ""});
          setIsLoggedIn(false);
        }

        localStorage.setItem("activeUser", JSON.stringify(userTest));
        
    }
    

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let user: string = e.target.name;
        setUserToLogin({...userToLogin, [user]: e.target.value });
      }
    

  
    return (<>
   
    <h1>KÖPGAMMALTSKROT.SE</h1>

    {!isLoggedIn && (
    <div>
    <form onSubmit={login}>
      <input required type="email" name="email" placeholder="email" value={userToLogin.email} onChange={handleChange}/>
      <input required type="password" name="password" placeholder="password" value={userToLogin.password} onChange={handleChange}/>
      <input type="submit"/>
    </form>
    <Link to="/">Skapa nytt konto</Link>
    
    </div>)}

    {isLoggedIn && (
      <section>
      <Settings user={loggedInUser}></Settings>
      </section>
      
    )}

    </>)
}