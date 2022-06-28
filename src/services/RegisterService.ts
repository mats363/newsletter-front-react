import axios from "axios";
import { IUser } from "../models/IUser";

export class RegisterService {
    
    async createNewUser(newUser: IUser) {
        try {
        let createdResponse = await axios.post<IUser>('http://localhost:4000/user', newUser);
        console.log('createdResponse.data', createdResponse.data);  
        } catch(err) {
            console.log("Error: " + err)
        };
                    
    }

    async editUser(user: any) {
        let response = await axios.put<IUser>('http://localhost:4000/user', user)
    }

    // async fetchUsers(users: IUser[]) {
        
    //     try {
    //         axios.get<IUser[]>('http://localhost:4000/user') 
    //     } catch(err) {
    //         console.log(err)
    //     }
         
    // }

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