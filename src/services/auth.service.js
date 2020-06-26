//Authentication service
// The service uses Axios for HTTP requests and Local Storage for user information & JWT.
// It provides 4 following important methods:

// login(): POST {username, password} & save JWT to Local Storage
// logout(): remove JWT from Local Storage
// register(): POST {username, email, password}
// getCurrentUser(): get stored user information (including JWT)
import axios from "axios";

const API_URL = "http://localhost:8888/";

const AuthService = {
    login,
    logout,
    register,
    currentUser: getCurrentUser,
};
function login(user) {
    return axios
        .post(API_URL + "auth/login", user)
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
}

function logout() {
    console.log('logout')
    localStorage.removeItem("user");
}

function register(newUser) {
    return axios.post(API_URL + "auth/register",newUser);
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
}
export default AuthService
