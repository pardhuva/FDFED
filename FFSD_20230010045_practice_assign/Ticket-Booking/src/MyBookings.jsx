function MyBookings({ bookedTickets }) {
  return (
    <>
      <h2>My Bookings</h2>
      <div className="booked-tickets">
        {bookedTickets.map(ticket => (
          <Display key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </>
  );
}

function Display({ ticket }) {
  return (
    <div className="booked-ticket">
      <p>Concert: {ticket.name}</p>
      <p>Date: {ticket.date}</p>
      <p>Price: ₹{ticket.price}</p>
      <p>Quantity: {ticket.quantity}</p>
      <p>Total: ₹{ticket.price * ticket.quantity}</p>
    </div>
  );
}

export default MyBookings;
