import axios from "axios";

export const localLogin = async (username: string, password: string) => {
    console.log("locallogin")
    const data = { username: username, password: password }
    try {
        const token = await axios.post("http://localhost:3000/auth/local/login",data)
        console.log(token)
    } catch(e) {
        console.log(e)
    } 

}