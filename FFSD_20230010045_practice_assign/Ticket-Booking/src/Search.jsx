import React, { useState } from 'react';


function Search({ handleBooking }) {
  const [concert, setConcert] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {};
      if (concert) params.name = concert;
      if (date) params.date = date;
      if (price) params.price = price;

      const query = new URLSearchParams(params);
      const response = await fetch(`http://localhost:3000/api/tickets?${query}`);
      if (!response.ok) throw new Error('Failed to fetch tickets');

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Concerts</h2>
      <div className="search-inputs">
        <input type="text" placeholder="Enter concert name" value={concert} onChange={e => setConcert(e.target.value)} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input type="number" placeholder="Enter max price" value={price} onChange={e => setPrice(e.target.value)} />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {results.length > 0 && (
        <div className="search-results">
          {results.map(ticket => (
            <div key={ticket.id} className="search-result-card">
              <img src={ticket.image} alt={ticket.name} />
              <h4>{ticket.name}</h4>
              <p>Date: {ticket.date}</p>
              <p>Price: ₹{ticket.price}</p>
              <button onClick={() => handleBooking(ticket, 1)}>Book</button>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && !loading && <p>No results found.</p>}
    </div>
  );
}

export default Search;
