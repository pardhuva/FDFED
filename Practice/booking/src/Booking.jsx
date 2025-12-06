import React,{useState} from 'react'

function Booking() {
    const [booking, setBooking] = useState(0);
      
    const handlebook =() =>{
        setBooking(booking+1);
    }
    const handleDelete =() =>{
        if(booking ==0) return;
        setBooking(booking-1);
    }
   return (
    <>
       <p>Total bookings:{booking}</p>
      <button onClick={handlebook}>Book</button>
      <button onClick={handleDelete}>Delete</button>
    </>
     
   )
}
export default Booking;