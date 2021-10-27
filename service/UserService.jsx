import AxiosService from "./AxiosService";

const obj = new AxiosService();
const baseurl='https://new-bookstore-backend.herokuapp.com';
const token = localStorage.getItem("token");
const headerconfig = {
    headers: {
    Authorization: token,
    }
};

class UserService {
    signup(data) {
        let response = obj.postMethod(`${baseurl}/bookstore_user/registration`, data);
        return response;
    }
    login(data) {
        let response = obj.postMethod(`${baseurl}/bookstore_user/login`, data, headerconfig);
        return response;
    }
}
export default UserService;