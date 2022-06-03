import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from  "./features/authSlice";
import TourReducer from "./features/tourSlice";
import PosReducer from "./features/posSlice";

export default configureStore({
    reducer:{
        auth : AuthReducer,
        tour : TourReducer,
        pos  : PosReducer,
    },
});