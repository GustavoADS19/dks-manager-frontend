import axios from 'axios';

export default async function authorize() {
    if (localStorage.getItem("email") == null || localStorage.getItem("authorization") == null) {
        return false;
    } else {
        const data = {
            email: localStorage.getItem("email"),
            token: localStorage.getItem("authorization")
        };
        return await axios.post("https://dks-manager-backend.herokuapp.com/auth", data).then(res => {
            const response = res.data;
            if (response.authenticated == false) {
                return false;
            } else if (response.authenticated == true) {
                return true;
            }
        }).catch(err => {
            console.log(err);
            return false;
        });
    }
}