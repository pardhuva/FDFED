import React, { useState, useEffect } from 'react';

function TicketList({ handleBooking }) {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3000/api/tickets');
        if (!response.ok) throw new Error('Failed to fetch tickets');
        const data = await response.json();
        setTickets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(ticket =>
    ticket.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ticket-container">
      <h1>Available Tickets</h1>
      <input
        type="text"
        placeholder="Search concerts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="ticket-search"
      />

      {loading && <p>Loading tickets...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="ticket-list">
        {filteredTickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} handleBooking={handleBooking} />
        ))}
      </div>
    </div>
  );
}

function TicketCard({ ticket, handleBooking }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="ticket-card">
      <img src={ticket.image} alt={ticket.name} className="ticket-image" />
      <h3>{ticket.name}</h3>
      <p>Date: {ticket.date}</p>
      <p>Price: ₹{ticket.price}</p>
      <input
        type="number"
        min="1"
        max="10"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="ticket-quantity"
      />
      <button onClick={() => handleBooking(ticket, quantity)} className="ticket-button">Book</button>
    </div>
  );
}

export default TicketList;
