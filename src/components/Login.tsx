import { ChangeEvent, FormEvent, useState } from "react";
import { isBooleanObject } from "util/types";
import { RegisterService } from "../services/RegisterService";
import {IUser} from "../models/IUser"

export function Login () {
    let service = new RegisterService;

    const [checked, setChecked] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<IUser>()

    const [userToLogin, setUserToLogin] = useState({
        email: "",
        password: ""
    });

    const [hasSubscription, setHasSubscription] = useState<boolean>();


    async function login(e: FormEvent<HTMLFormElement> ) {
        e.preventDefault();
        let userTest = await service.login(userToLogin);
        if (userTest) {
          console.log(userTest)
          setLoggedInUser(userTest);
          setIsLoggedIn(true);
          console.log(isLoggedIn)
          console.log(loggedInUser?.name)
      
        } else {
          console.log("Inte inloggad")
        }  
        console.log(loggedInUser?.subStatus)
    }
   
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let user: string = e.target.name;
        setUserToLogin({...userToLogin, [user]: e.target.value });
      }
    
    function handleCheckBox() {
      setChecked(!checked);
      
    }

    function logOut() {
      setIsLoggedIn(false);
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
    
    
    </div>)}

    {isLoggedIn && (
      <div>
        <h1>Välkommen {loggedInUser?.name}!</h1>
        <h5>Här kan du ändra din prenumerationsstatus:</h5>
        <p> {loggedInUser?.subStatus}</p>
        <label> JA! Jag vill prenumerera på nyhetsbrevet!
        <input type="checkbox" name="subStatus" checked={checked} onChange={handleCheckBox}/>
        </label>
        <div>
          <button onClick={logOut}>Logga ut</button>
        </div>
      </div>
      
    )}

    </>)
}