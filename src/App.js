import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Todos  from './components/Todos';
import { fetchTodos } from './features/todos/todosSlice';
import { useDispatch } from 'react-redux';
import ListKbc from './components/kbc/ListKbc';
import FoodApps from './components/foods/FoodApps';
import WheelsApp from './components/pakwheels/WheelsApp';
import { fetchWheelUsers, showUsers, showCarMakers, showUsedCars } from './features/wheels/wheelSlice';
import AllStudents from './components/sms/AllStudents';
import SmsApp from './components/sms/SmsApp';
import { showChallans, showStudents } from './features/sms/smsSlice';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
    dispatch(showUsers())
    dispatch(showCarMakers())
    dispatch(showUsedCars())
    dispatch(showStudents())
    dispatch(showChallans())
  }, [])

  return (
    <div className="App">
      {/* <WheelsApp /> */}
      {/* <FoodApps /> */}
      {/* <Todos /> */}
      {/* <ListKbc /> */}
      <SmsApp />
    </div>
  );
}

export default App;
