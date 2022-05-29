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

    async editUser(user: IUser) {
        let response = await axios.put<IUser>('http://localhost:4000/user', user)
    }

    async fetchUsers(users: IUser[]) {
        
        try {
            axios.get<IUser[]>('http://localhost:4000/user') 
        } catch(err) {
            console.log(err)
        }
         
    }

    async login(user: any) {
        try {
            let userCheck = await axios.get<IUser>(`http://localhost:4000/user/userlogin/${user}'`);
            return userCheck;
        } catch (err) {
            console.log(err);
        }
    }
}