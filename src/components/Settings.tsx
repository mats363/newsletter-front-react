import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../models/User"
import { RegisterService } from "../services/RegisterService";

interface IChildComponentProps {
    user: User
}

interface UserUpdate {
    _id: string,
    name: string,
    subStatus: boolean
}

export function Settings(props: IChildComponentProps) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isSub, setIsSub] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<UserUpdate>({
        _id: "",
        name: "",
        subStatus: true
    })

    const service = new RegisterService;

    function logOut() {
        setIsLoggedIn(false);
        localStorage.clear();
        window.location.reload()       
      }
    
    useEffect(() => {
        //setLoggedInUser(props.user)
    })

    useEffect(() => {
        if (props.user.subStatus) {
            setIsSub(true);
        }
    }, )  

    async function unSubscribe(e: any) {
        e.preventDefault();
        let userToUpdate: User = new User(props.user._id, props.user.name, false)
       // loggedInUser.subStatus = false;
        
        try {
           // loggedInUser.subStatus = false;
            axios.patch(`http://localhost:4000/user`, userToUpdate)
            .then(res => {console.log(res)})
            setIsSub(false);
        } catch(err) {
            console.log(err)
        }
        // await service.editUser(loggedInUser)
        // console.log(loggedInUser)
        // }
        //console.log(loggedInUser)

        
      }

    async function subscribe(e: any) {
        e.preventDefault();
        let userToUpdate: User = new User(props.user._id, props.user.name, true)
       // loggedInUser.subStatus = false;
        
        try {
            //loggedInUser.subStatus = false;
            axios.patch(`http://localhost:4000/user`, userToUpdate)
            .then(res => {console.log(res)})
            setIsSub(true);
        } catch(err) {
            console.log(err)
        }
    }

    return (<>
        {isSub && (
            <button onClick={unSubscribe}>Avregistrera mig från nyhetsbrevet</button>
        )}
        {!isSub && (
            <button onClick={subscribe}>Ge mig en prenumeration på nyhetsbrevet!</button>
        )}


        <button onClick={logOut}>Logga ut</button>
    </>)
}