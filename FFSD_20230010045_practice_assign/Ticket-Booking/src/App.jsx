import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import TicketList from './TicketList';
import MyBookings from './MyBookings';
import Search from './Search';

function App() {
  const [bookedTickets, setBookedTickets] = useState([]);

  const handleBooking = (ticket, quantity) => {
    const existing = bookedTickets.find(b => b.ticket.id === ticket.id);
    if (existing) {
      setBookedTickets(
        bookedTickets.map(b =>
          b.ticket.id === ticket.id ? { ...b, quantity: b.quantity + quantity } : b
        )
      );
    } else {
      setBookedTickets([...bookedTickets, { ticket, quantity }]);
    }
    alert(`${ticket.name} booked (${quantity})`);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TicketList handleBooking={handleBooking} />} />
        <Route path="/ticketlist" element={<TicketList handleBooking={handleBooking} />} />
        <Route path="/bookings" element={<MyBookings bookedTickets={bookedTickets} />} />
        <Route path="/search" element={<Search handleBooking={handleBooking} />} />
      </Routes>
    </>
  );
}

export default App;
