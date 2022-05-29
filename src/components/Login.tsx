import { ChangeEvent, useState } from "react";
import { RegisterService } from "../services/RegisterService";

export function Login () {
    let service = new RegisterService;

    const [userToLogin, setUserToLogin] = useState({
        name: "",
        password: ""
    });

    function login() {
        // Hämta och kolla om användaren finns och om lösenordet är rätt
        service.login(userToLogin)
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        //let user: string = e.target.name;
        //setNewUser({ ...newUser, [user]: e.target.value });
      }
      
      function handleCheckBox() {
       // setChecked(!checked);
        
      }

    return (<>
   
    <h1>Login works!</h1>

    <form onSubmit={login}>
      <input required type="text" name="username" placeholder="username" value={userToLogin.name} onChange={handleChange}/>
      <input required type="password" name="password" placeholder="password" value={userToLogin.password} onChange={handleChange}/>
      <input type="submit"/>
    </form>
    </>)
}