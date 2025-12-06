import React,{useState} from 'react'

function Loggedin() {
   const [isloggedin,setLogin] = useState(false);
   
   const handlechange =()=>{
      setLogin(!isloggedin);
   }
    return (
      <>
         {isloggedin?"Welcome back" : "please login"}
         <button id ="but" onClick = {handlechange}>{isloggedin?"Login":"Logout"}</button>
      </>
    )
}
export default Loggedin;


//extend tha tbooking having name, number of tickets,price paid 
//you add ticket, if no tickets and also paynow if not paid 
