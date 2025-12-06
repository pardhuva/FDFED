// App.js (Context API Demo)
import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const CounterContext = createContext();

function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  console.log("Provider re-rendered");

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
}

function ChildA() {
  const { count } = useContext(CounterContext);
  console.log("Child A re-rendered");

  const bgcolor =
    count > 0 ? "green" :
    count < 0 ? "blue" :
    "red";

  return (
    <p
      style={{
        backgroundColor: bgcolor,
      }}
    >
      Child A Count: {count}
    </p>
  );
}

function ChildB() {
  const { setCount } = useContext(CounterContext);
  console.log("Child B re-rendered");

  const timerRef = useRef(null);

  const restartTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      console.log("10s inactive");
      setCount(0);
    }, 10000);
    
  };

  useEffect(() => {
    restartTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setCount((c) => c + 1);
          restartTimer();
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          setCount((c) => c - 1);
          restartTimer();
        }}
      >
        Decrement
      </button>
    </div>
  );
}

function App() {
  return (
    <CounterProvider>
      <h2>Context API Demo</h2>
      <ChildA />
      <ChildB />
    </CounterProvider>
  );
}

export default App;
