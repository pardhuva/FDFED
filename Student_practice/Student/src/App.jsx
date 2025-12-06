// import React from 'react';
// import StudentList from './StudentList';

// function App() {
//   return (
//     <div>
//       <StudentList />
//     </div>
//   );
// }

// export default App;
// App.jsx
import React, { useState, useEffect, createContext, useContext } from "react";
import ChildComponent from './ChildComponent'

// 1️⃣ Create a Context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // 2️⃣ Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);
  const { theme } = useContext(ThemeContext);
  const [Counter,setCounter] = useState(0);

  //3️⃣ Fetch data once
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
      console.log("Data is changed")
  }, []);

   useEffect(() => {
    document.title = `Counter: ${Counter}`;
  }, [Counter]);

  return (
    <>
       <div
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        padding: "10px",
      }}
    >
      <h3>User List</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
    <div>
      <h2 id="count">Counter: {Counter}</h2>
      <ChildComponent counter={Counter}/>
    </div>
    
    </>
   
  );
}

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme}>
      Current Theme: {theme} (Click to toggle)
    </button>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
      <UserList />
    </ThemeProvider>
  );
}


1. move the theme provider component below themeswitch what will happen   ->might crash 
2. create a new component called theme display that only shows theme using useContext 
3. replace useContext with custom hook does it behave teh same 
4. add aonther context to foro the langiage then when you change teh context then the text shoudl change 
5. when you try nesting theme provider 