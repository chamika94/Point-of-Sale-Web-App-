import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";

export const createTransaction = createAsyncThunk("pos/createTransaction",async({items, parent, total, navigate, toast},{rejectWithValue})=>{
    try{
      const response = await api.createTransaction({items, parent, total});
      toast.success("Transaction Successfully");
      navigate("/sale");
      return response.data;
      //console.log("resp",total);
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});


export const getTransactions = createAsyncThunk("pos/getTransactions",async(_,{rejectWithValue})=>{
    try{
      const response = await api.getTransactions();
      return response.data;

    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const getItems = createAsyncThunk("pos/getItems",async(_,{rejectWithValue})=>{
    try{
      const response = await api.getItems();
      return response.data;
     //console.log("resp1",response.data);
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

const posSlice = createSlice({
    name:"Pos",
    initialState:{
        transactions:[],
        items:[],
        item:{},
        selectedItem:[],
        error:"",
        loading: false,
    },

    extraReducers:{
        [createTransaction.pending]:(state, action) => {
            state.loading=true;
        },
        [createTransaction.fulfilled]:(state, action) => {
            state.loading = false;
        },
        [createTransaction.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
//=====================================================================
        [getTransactions.pending]:(state, action) => {
            state.loading=true;
        },
        [getTransactions.fulfilled]:(state, action) => {
            state.loading = false;
            state.transactions = action.payload;
        },
        [getTransactions.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
//=====================================================================
        [getItems.pending]:(state, action) => {
            state.loading=true;
        },
        [getItems.fulfilled]:(state, action) => {
            state.loading = false;
            state.items = action.payload;
        },
        [getItems.rejected]:(state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        },        
    },
});

export default posSlice.reducer;

