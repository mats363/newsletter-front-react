import { ChangeEvent, FormEvent, useState } from "react";
import { isBooleanObject } from "util/types";
import { RegisterService } from "../services/RegisterService";
import {IUser} from "../models/IUser"

export function Login () {
    let service = new RegisterService;

    const [checked, setChecked] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState({
      name: "",
      email: "",
      password: "",
      subStatus: false
    })

    const [userToLogin, setUserToLogin] = useState({
        email: "",
        password: ""
    });


    async function login(e: FormEvent<HTMLFormElement> ) {
        e.preventDefault();
        let userTest = await service.login(userToLogin);
        
        if (userTest) {
          service.saveToLs(loggedInUser.name)
          console.log(userTest)
          setLoggedInUser(userTest);
          
          console.log(loggedInUser)
          setIsLoggedIn(true);
         
      
        } else {
          console.log("Inte inloggad")
        }  
        
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
      localStorage.clear();
    }
      
    async function submitChange() {
      loggedInUser.subStatus = checked;
      await service.editUser(loggedInUser)
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
      <section>
        <h1>Välkommen {loggedInUser?.name}!</h1>
        <h5>Här kan du ändra din prenumerationsstatus:</h5>
        
        <label> JA! Jag vill ändra min prenumeration på nyhetsbrevet!
         
        <input type="checkbox" name="subStatus" checked={checked} onChange={handleCheckBox}/>
        </label>
        <div>
          <button onClick={submitChange}>Spara ändringar</button>
          <button onClick={logOut}>Logga ut</button>
        </div>
         
      </section>
      
    )}

    </>)
}