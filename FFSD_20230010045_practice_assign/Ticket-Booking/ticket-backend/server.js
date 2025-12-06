const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


const tickets = [
  {
    id: 1,
    name: "BTS World Tour",
    date: "2025-10-10",
    price: 3000,
    image: "/images/bts.jpg"
  },
  {
    id: 2,
    name: "Taylor Swift Live",
    date: "2025-10-12",
    price: 3500,
    image: "/images/taylor.jpg"
  },
  {
    id: 3,
    name: "Arijit Singh Live Concert",
    date: "2025-10-15",
    price: 1500,
    image: "/images/arjit.jpg"
  },
  {
    id: 4,
    name: "Rock Night with Imagine Dragons",
    date: "2025-11-01",
    price: 2000,
    image: "/images/imagine-dragons.jpg"
  },
  {
    id: 5,
    name: "Jazz Evening with Norah Jones",
    date: "2025-10-20",
    price: 1200,
    image: "https://i.imgur.com/4R5QkDd.jpg"
  },
  {
    id: 6,
    name: "Classical Night with Yo-Yo Ma",
    date: "2025-12-05",
    price: 2500,
    image: "https://i.imgur.com/5M4vK7D.jpg"
  },
  {
    id: 7,
    name: "EDM Festival 2025",
    date: "2025-11-15",
    price: 1800,
    image: "https://i.imgur.com/6Xj4H3D.jpg"
  },
  {
    id: 8,
    name: "Coldplay Live in Mumbai",
    date: "2025-12-20",
    price: 4000,
    image: "https://i.imgur.com/Q2s9LrL.jpg"
  },
  {
    id: 9,
    name: "Metallica Concert",
    date: "2025-12-25",
    price: 5000,
    image: "https://i.imgur.com/N5a1FvM.jpg"
  },
  {
    id: 10,
    name: "Folk Music Festival",
    date: "2025-11-30",
    price: 1000,
    image: "https://i.imgur.com/XbF3u9R.jpg"
  }
];



app.get("/api/tickets", (req, res) => {
  const { name, date, price } = req.query;

  let filtered = tickets.filter(ticket => {
    return (
      (!name || ticket.name.toLowerCase().includes(name.toLowerCase())) &&
      (!date || ticket.date === date) &&
      (!price || ticket.price <= Number(price))
    );
  });

  res.json(filtered);
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
