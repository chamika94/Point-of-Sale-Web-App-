import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";

export const createTransaction = createAsyncThunk("pos/createTransaction",async({items, navigate, toast},{rejectWithValue})=>{
    try{
      const response = await api.createTransaction(items);
      toast.success("Transaction Successfully");
      navigate("/sale");
      //return response.data;
      console.log(response.data);
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

const posSlice = createSlice({
    name:"Pos",
    initialState:{
        transaction:[],
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

    },
});

export default posSlice.reducer;

