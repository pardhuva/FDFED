import React, { useEffect, useRef } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";


const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => { state.count += 1; },
    decrement: (state) => { state.count -= 1; },
    reset: (state) => { state.count = 0; },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});


const ChildA = React.memo(() => {
  const count = useSelector((state) => state.counter.count);
  console.log("Child A re-rendered");

  const bgColor =
    count > 0 ? "green" :
    count < 0 ? "blue" :
    "red";

  return (
    <p
      style={{
        backgroundColor: bgColor,
        color: "white",
        transition: "background-color 0.3s ease",
      }}
    >
      Child A Count: {count}
    </p>
  );
});


const ChildB = React.memo(() => {
  const dispatch = useDispatch();
  console.log("Child B re-rendered");

  const timerRef = useRef(null);

  const restartTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      console.log("10s inactivity");
      dispatch(counterSlice.actions.reset());
    }, 10000); 
  };

  const handleIncrement = () => {
    dispatch(counterSlice.actions.increment());
    restartTimer();
  };

  const handleDecrement = () => {
    dispatch(counterSlice.actions.decrement());
    restartTimer();
  };

  useEffect(() => {
    restartTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div style={{ display: "flex"}}>
      <button
        onClick={handleIncrement}
        style={{
          backgroundColor: "#28a745",
          color: "white",
        }}
      >
        Increment
      </button>

      <button
        onClick={handleDecrement}
        style={{
          backgroundColor: "#dc3545",
          color: "white",
        }}
      >
        Decrement
      </button>
    </div>
  );
});

function App() {
  return (
    <Provider store={store}>
      <h2>Redux Toolkit Demo</h2>
      <ChildA />
      <ChildB />
    </Provider>
  );
}

export default App;
