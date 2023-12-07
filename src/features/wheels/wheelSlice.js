import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useDispatch } from "react-redux"


export const createUser = createAsyncThunk(
    "createUser",
    async (data, { rejectWithValue }) => {
      const response = await fetch(
        "http://localhost:3002/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
  
      try {
        const result = await response.json();
        return result;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
);

export const createUsedCar = createAsyncThunk(
  "createUsedCar",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:3002/usedCars",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUsedCar = createAsyncThunk(
  "updateUsedCar",
  async (data, { rejectWithValue }) => {
    // console.log(data)
    // console.log(id)
    const response = await fetch(
      `http://localhost:3002/usedCars/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const showUsers = createAsyncThunk(
    "showUsers",
    async (data, { rejectWithValue }) => {
      console.log("data", data);
      const response = await fetch("http://localhost:3002/users");
      try {
        const result = await response.json();
        return result;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
);

export const showCarMakers = createAsyncThunk(
  "showCarMakers",
  async (data, { rejectWithValue }) => {
    const response = await fetch("http://localhost:3002/makerList");
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const showUsedCars = createAsyncThunk(
  "showUsedCars",
  async (data, { rejectWithValue }) => {
    const response = await fetch("http://localhost:3002/usedCars");
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


  export const userDetail = createSlice({
    name: "wheel",
    initialState: {
      users: [],
      loading: false,
      error: null,
      searchData: [],
      carMakers: [],
      makersLoading: false,
      usedCars: [],
      usedCarsConatiner: []
    },
  
    reducers: {
      searchUser: (state, action) => {
        console.log(action.payload);
        state.searchData = action.payload;
      },
    },
  
    extraReducers: {
      [createUsedCar.pending]: (state) => {
        state.loading = true;
      },
      [createUsedCar.fulfilled]: (state, action) => {
        state.loading = false;
        state.usedCars.push(action.payload);
      },
      [createUsedCar.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [createUser.pending]: (state) => {
        state.loading = true;
      },
      [createUser.fulfilled]: (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      },
      [createUser.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [showUsers.pending]: (state) => {
        state.loading = true;
      },
      [showUsers.fulfilled]: (state, action) => {
        state.loading = false;
        state.users = action.payload;
      },
      [showUsers.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      [showCarMakers.pending]: (state) => {
        state.makersLoading = true;
      },
      [showCarMakers.fulfilled]: (state, action) => {
        state.makersLoading = false;
        state.carMakers = action.payload;
      },
      [showCarMakers.rejected]: (state, action) => {
        state.makersLoading = false;
        state.error = action.payload;
      },
      [showUsedCars.pending]: (state) => {
        state.makersLoading = true;
      },
      [showUsedCars.fulfilled]: (state, action) => {
        state.makersLoading = false;
        state.usedCars = action.payload;
        state.usedCarsConatiner = action.payload
      },
      [showUsedCars.rejected]: (state, action) => {
        state.makersLoading = false;
        state.error = action.payload;
      },
    //   [deleteUser.pending]: (state) => {
    //     state.loading = true;
    //   },
    //   [deleteUser.fulfilled]: (state, action) => {
    //     state.loading = false;
    //     const { id } = action.payload;
    //     if (id) {
    //       state.users = state.users.filter((ele) => ele.id !== id);
    //     }
    //   },
    //   [deleteUser.rejected]: (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   },
  
      [updateUsedCar.pending]: (state) => {
        state.loading = true;
      },
      [updateUsedCar.fulfilled]: (state, action) => {
        state.loading = false;
        state.usedCars = state.usedCars.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
        state.usedCarsConatiner = state.usedCars
      },
      [updateUsedCar.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });
  
  export default userDetail.reducer;
  
  export const { searchUser } = userDetail.actions;