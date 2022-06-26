import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../models/User"

interface IChildComponentProps {
    user: User
}

interface UserUpdate {
    _id: string,
    name: string,
    subStatus: boolean
}

interface fUser {
    subStatus: boolean
}

export function Settings(props: IChildComponentProps) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isSub, setIsSub] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<UserUpdate>({
        _id: "",
        name: "",
        subStatus: true
    });
    const [response, setResponse] = useState<fUser>();

    useEffect(() => {
        if (props.user.subStatus === true) {
            setIsSub(true);
        } else if (props.user.subStatus === false){
            setIsSub(false);
        }
    }, [] )  

    useEffect(() => {
        axios.get(`http://localhost:4000/user/${props.user._id}`)
            .then(res => {setIsSub(res.data)})

    }, [])

    async function unSubscribe(e: any) {
        e.preventDefault();
       let userToUpdate: User = new User(props.user._id, props.user.name, false)
 
        try {
            axios.patch(`http://localhost:4000/user`, userToUpdate)
            .then(res => {console.log(res)})
            setIsSub(false);
        } catch(err) {
            console.log(err)
        }
      }

    async function subscribe(e: any) {
        e.preventDefault();
        let userToUpdate: User = new User(props.user._id, props.user.name, true)
        
        try {
            axios.patch(`http://localhost:4000/user`, userToUpdate)
            .then(res => {console.log(res)})
            setIsSub(true);
        } catch(err) {
            console.log(err)
        }
    }
    
    function logOut() {
        setIsLoggedIn(false);
        localStorage.clear();
        window.location.reload()       
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