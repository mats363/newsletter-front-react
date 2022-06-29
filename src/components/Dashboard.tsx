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

export function Dashboard(props: IChildComponentProps) {

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
     <header className="absolute w-full">
        <nav className="flex justify-between m-4">
            <h1 className="font-mono">the company.</h1>
            <button className="text-xs bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={logOut}>LOG OUT</button>
        </nav>
    </header>

    <section className="w-full h-screen flex justify-center items-center bg-wall bg-cover">
        
        <div className="w-full max-w-xs justify-center">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="mb-4">Welcome {props.user.name}!</h2>
                <span className="block text-gray-700 text-sm font-bold mb-6">Here you can view and change your subscription status</span>
                {isSub && (
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={unSubscribe}>Don't send me the newsletter</button>
                )}
                {!isSub && (
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={subscribe}>Give me a subscription to the newsletter!</button>
        )}
            </div>
        </div>

       
        </section>
    </>)
}