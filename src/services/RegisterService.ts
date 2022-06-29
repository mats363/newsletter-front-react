import axios from "axios";
import { IUser } from "../models/IUser";

export class RegisterService {
    

    async editUser(user: any) {
        let response = await axios.put<IUser>('http://localhost:4000/user', user)
    }

    async fetchUser(userId: string) {
        try {
            let fetchedUser = await axios.get(`http://localhost:4000/user/${userId}`)
            console.log(fetchedUser.data)
        } catch(err) {
            console.log(err)
        }
        
    }

    async login(user: any) {
        try {
            let loggedInUser: IUser;
            await axios.post(`http://localhost:4000/user/userlogin`, user)
            .then(res => {loggedInUser = res.data})
            
        } catch (err) {
            console.log("Fel lösen!");
            return;
        }   
    }

    async editSubStatus(user: any) {
        try {
            axios.put(`http://localhost:4000/user`, user)
        } catch(err) {
            console.log(err)
        }
    }

    saveToLs (user: string) {
        localStorage.clear();
        localStorage.setItem("activeUser", user)
    }
}