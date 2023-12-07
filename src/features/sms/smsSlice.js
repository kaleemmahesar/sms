import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useDispatch } from "react-redux"


export const createStudent = createAsyncThunk(
    "createStudent",
    async (data, { rejectWithValue }) => {
      const response = await fetch(
        "http://localhost:3002/students",
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

export const createChallan = createAsyncThunk(
  "createChallan",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:3002/challans",
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



export const showStudents = createAsyncThunk(
    "showStudents",
    async (data, { rejectWithValue }) => {
      console.log("data", data);
      const response = await fetch("http://localhost:3002/students");
      try {
        const result = await response.json();
        return result;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
);

export const showChallans = createAsyncThunk(
  "showChallans",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    const response = await fetch("http://localhost:3002/challans");
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateChallans = createAsyncThunk(
  "updateChallans",
  async (data, { rejectWithValue }) => {
    // console.log(data)
    // console.log(id)
    const response = await fetch(
      `http://localhost:3002/challans/${data.id}`,
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




  export const studentDetails = createSlice({
    name: "sms",
    initialState: {
      students: [],
      loading: false,
      error: null,
      challans: [],
      studentsContainer : [],
      challansContainer: []
    },
  
    reducers: {
      searchStudentsByClass (state, action) {
        console.log(action.payload) 
        if (action.payload !== 'all') {
            state.students = state.studentsContainer.filter((student) => student.class === action.payload)
        } else {
            state.students = state.studentsContainer
        }
      },
      searchByStudentName(state, action) {      
        console.log(action.payload)  
        state.students = state.studentsContainer.filter(student => student.id.toLowerCase().includes(action.payload))
      },
      searchChallansByClass (state, action) {
        console.log(action.payload) 
        if (action.payload !== 'all') {
            if (action.payload.monthNameNumber !== undefined) {
              console.log('monthname number defined')
              state.challans = state.challansContainer.filter((challan) => challan.studentClass === action.payload.getClass && new Date(challan.challanDate).getMonth() + 1 === Number(action.payload.monthNameNumber))  
            } else if (action.payload.getClass !== undefined) {
              console.log('classname number defined')
              state.challans = state.challansContainer.filter((challan) => challan.studentClass === action.payload.getClass)
            }
        } else {
            state.challans = state.challansContainer
        }
      },
      searchChallansByMonth (state, action) {
        console.log(action.payload) 
        // var m = action.payload.getMonth();
        // console.log(m)
        if (action.payload !== 'all') {
          if (action.payload.classNameNumber !== undefined) {
            state.challans = state.challansContainer.filter((challan) => new Date(challan.challanDate).getMonth() + 1 === Number(action.payload.getMonth) && challan.studentClass === action.payload.classNameNumber)
          } else if (action.payload.getMonth !== undefined) {
            state.challans = state.challansContainer.filter((challan) => new Date(challan.challanDate).getMonth() + 1 === Number(action.payload.getMonth))
          }
        } else {
            state.challans = state.challansContainer
        }
      },
      searchByChallanName(state, action) {      
        console.log(action.payload)  
        state.challans = state.challansContainer.filter(challan => challan.studentName.toLowerCase().includes(action.payload))
      } 
    },
  
    extraReducers: {
      [createStudent.pending]: (state) => {
        state.loading = true;
      },
      [createStudent.fulfilled]: (state, action) => {
        state.loading = false;
        state.students.push(action.payload);
        state.studentsContainer.push(action.payload);
      },
      [createStudent.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [showStudents.pending]: (state) => {
        state.loading = true;
      },
      [showStudents.fulfilled]: (state, action) => {
        state.loading = false;
        state.students = action.payload;
        state.studentsContainer = action.payload;
      },
      [showStudents.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      [showChallans.pending]: (state) => {
        state.loading = true;
      },
      [showChallans.fulfilled]: (state, action) => {
        state.loading = false;
        state.challans = action.payload;
        state.challansContainer = action.payload;
      },
      [showChallans.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      [createChallan.pending]: (state) => {
        state.loading = true;
      },
      [createChallan.fulfilled]: (state, action) => {
        state.loading = false;
        state.challans.push(action.payload);
        state.challansContainer.push(action.payload)
      },
      [createChallan.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [updateChallans.pending]: (state) => {
        state.loading = true;
      },
      [updateChallans.fulfilled]: (state, action) => {
        state.loading = false;
        state.challans = state.challans.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      },
      [updateChallans.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });
  
  export default studentDetails.reducer;
  
  export const { searchStudentsByClass , searchByStudentName, searchChallansByClass, searchByChallanName, searchChallansByMonth } = studentDetails.actions;