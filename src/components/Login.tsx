import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RegisterService } from "../services/RegisterService";
import axios from "axios";

export function Login () {
    let service = new RegisterService;

    const [checked, setChecked] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState({
      name: "",
      subStatus: checked
    })

    const [userToLogin, setUserToLogin] = useState({
        email: "",
        password: ""
    });

    const [isSubscribing, setIsSubscribing] = useState();

    const [message, setMessage] = useState("");


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
      if (loggedInUser.subStatus) {
        setChecked(true)
      } else {setChecked(false)}
      console.log(checked + " checked")
      
    }, [])


    useEffect(()=> {
      console.log("i useeffect " + loggedInUser.subStatus)
    }, [])

    async function login(e: FormEvent<HTMLFormElement> ) {
        e.preventDefault();
        let userTest = {name: "", subStatus: false }
        try {
          await axios.post(`http://localhost:4000/user/userlogin`, userToLogin)
          .then(res => {userTest = res.data})
          
          setIsLoggedIn(true)
          setLoggedInUser(userTest)
          
          
        } catch (err){
          alert("Wrong password or username");
          setUserToLogin({email: "", password: ""});
          setIsLoggedIn(false);
        }

        localStorage.setItem("activeUser", JSON.stringify(userTest.name));
        
    }
    

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let user: string = e.target.name;
        setUserToLogin({...userToLogin, [user]: e.target.value });
      }
    
    function handleCheckBox() {
      setChecked(!checked);
      console.log(checked + " checked")
      console.log(loggedInUser.subStatus)
      
    }

    function logOut() {
      setIsLoggedIn(false);
      localStorage.clear();
    }
      
    async function submitChange() {
      loggedInUser.subStatus = checked;
      await service.editUser(loggedInUser)
      console.log(loggedInUser)
    }

    let subStatusMsg = "";

  

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
        <h1>Välkommen {loggedInUser.name}!</h1>
        <h3> {subStatusMsg} </h3>
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