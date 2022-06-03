import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(updatedTourData);
      toast.success("Tour Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTours = createAsyncThunk(
  "tour/getTours",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getTours();
      return response.data;

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTour = createAsyncThunk(
  "tour/getTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTour(id);
      return response.data;

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getToursByUser = createAsyncThunk(
  "tour/getToursByUser",
  async (userId, { rejectWithValue }) => {
    try {
     
      const response = await api.getToursByUser(userId);
       return response.data;
     
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, updatedTourData, navigate, toast}, { rejectWithValue }) => {
    try {
      
      const response = await api.updateTour({id,updatedTourData});
      toast.success("Tour Update Successfully");
      navigate(`/dashboard`);
       return response.data;
     
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, toast}, { rejectWithValue }) => {
    try {
      
      const response = await api.deleteTour(id);
      toast.success("Tour delete Successfully");
    
       return response.data;
     
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    tagTours: [],
    relatedTours: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },
  
  extraReducers: {
    [createTour.pending]: (state, action) => {
      state.loading = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = [action.payload];
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTours.pending]: (state, action) => {
      state.loading = true;
    },
    [getTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    },
    [getTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTour.pending]: (state, action) => {
      state.loading = true;
      state.tour=null;
    },
    [getTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    },
    [getTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getToursByUser.pending]: (state, action) => {
      state.loading = true;
      state.userTours = null;
    },
    [getToursByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    },
    [getToursByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },    
    [updateTour.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTour.fulfilled]: (state, action) => {
      //console.log("action",action);
      state.loading = false;
      const {arg:{id}} = action.meta;
      if(id){
        state.userTours = state.userTours.map((item)=>item._id === id ? action.payload : item );
        state.tours = state.tours.map((item)=>item._id === id ? action.payload : item);
      }
      
    },
    [updateTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteTour.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTour.fulfilled]: (state, action) => {
      //console.log("action",action);
      state.loading = false;
      const {arg:{id}} = action.meta;
      if(id){
        state.userTours = state.userTours.filter((item) => item._id !== id );
        state.tours = state.tours.filter((item) => item._id !== id);
      }
      
    },
    [deleteTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },


  },
});



export default tourSlice.reducer;
