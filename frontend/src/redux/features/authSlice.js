import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk("auth/login",async({formValue, navigate, toast},{rejectWithValue})=>{
    try{
      const response = await api.signIn(formValue);
      toast.success("Login Successfully");
      navigate("/");
      return response.data;
    }catch(err){
      return rejectWithValue(err.response.data);
    }
});

export const register = createAsyncThunk("auth/register",async({formValue, navigate, toast},{rejectWithValue})=>{
    try{
        const response = await api.signUp(formValue);
        toast.success("Employee Added Successfully");
        navigate("/");
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const getEmployee = createAsyncThunk("auth/getEmployee",async(_,{rejectWithValue})=>{
    try{
       
        const response = await api.getEmployee();
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const deleteEmployee = createAsyncThunk("auth/deleteEmployee",async(empId,{rejectWithValue})=>{
    try{
       
        const response = await api.deleteEmployee(empId);
        return response.data;

    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const googleSignIn = createAsyncThunk(
    "auth/googleSignIn",
    async ({ result, navigate, toast}, { rejectWithValue }) => {
      try {
        const response = await api.GoogleSignIn(result);
        toast.success("Google Sign-in Successfully");
        navigate("/");
        return response.data;

      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

const authSlice = createSlice({
    name:"Auth",
    initialState:{
        employee:null,
        user:null,
        error:"",
        loading: false,
    },
    reducers:{
      setUser : (state,action) => {
          state.user = action.payload;
      },
      setLogout: (state, action) => {
        localStorage.clear();
        state.user = null;
      },
    },
    extraReducers:{
        [login.pending]:(state, action) => {
            state.loading=true;
        },
        [login.fulfilled]:(state, action) => {
            state.loading = false;
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            state.user = action.payload;
        },
        [login.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
//==================================================================================
        [register.pending]:(state, action) => {
            state.loading=true;
        },
        [register.fulfilled]:(state, action) => {
            state.loading = false;
           // localStorage.setItem("profile",JSON.stringify({...action.payload}));
           // state.user = action.payload;
        },
        [register.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
//===================================================================================
        [googleSignIn.pending]:(state, action) => {
            state.loading=true;
        },
        [googleSignIn.fulfilled]:(state, action) => {
            state.loading = false;
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            state.user = action.payload;
        },
        [googleSignIn.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

//===================================================================================

          [deleteEmployee.pending]: (state, action) => {
            state.loading = true;
          },
          [deleteEmployee.fulfilled]: (state, action) => {
            //console.log("action",action);
            state.loading = false;
            const {arg} = action.meta;
            if(arg){
              state.employee = state.employee.filter((emp) => emp._id !== arg );
            }
          },
          [deleteEmployee.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          },
//===================================================================================
        [getEmployee.pending]:(state, action) => {
            state.loading=true;
        },
        [getEmployee.fulfilled]:(state, action) => {
            //console.log("action",action);
            state.loading = false;
            state.employee = action.payload.result;
        },
        [getEmployee.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        },  
            
    },
});

export const {setUser,setLogout} = authSlice.actions;

export default authSlice.reducer;

