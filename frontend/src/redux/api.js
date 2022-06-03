import axios from "axios";

const API = axios.create({baseURL:"http://localhost:5000"});



API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });


export const signIn = (formData) => API.post("/users/signin",formData);
export const signUp = (formData) => API.post("/users/signup",formData);
export const GoogleSignIn = (result) => API.post("/users/googleSignIn",result);
export const getEmployee = () => API.get("/users/employee");
export const deleteEmployee = (empId) => API.post(`/users/employee/${empId}`);

export const createTour = (tourData) => API.post("/tour", tourData);
export const getTours = () => API.get("/tour");
export const getTour = (id) => API.get(`/tour/${id}`);
export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);
export const updateTour = ({id,updatedTourData}) => API.patch(`/tour/${id}`,updatedTourData);
export const deleteTour = (id) => API.post(`/tour/${id}`);

export const createTransaction = ({items, parent, total}) => API.post("/sale",{items, parent, total});
export const getTransactions = () => API.get("/sale/transaction");
export const getItems = () => API.get("/sale/items");









 