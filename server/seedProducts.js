const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch(err => console.error(err));

const sampleProducts = [
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 129.99,
    team: "Los Angeles Lakers",
    player: "LeBron James"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 119.99,
    team: "Golden State Warriors",
    player: "Stephen Curry"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 109.99,
    team: "Milwaukee Bucks",
    player: "Giannis Antetokounmpo"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 124.99,
    team: "Boston Celtics",
    player: "Jayson Tatum"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 114.99,
    team: "Phoenix Suns",
    player: "Kevin Durant"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 118.99,
    team: "Philadelphia 76ers",
    player: "Joel Embiid"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 113.99,
    team: "Dallas Mavericks",
    player: "Luka Dončić"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 109.99,
    team: "Denver Nuggets",
    player: "Nikola Jokić"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 105.99,
    team: "Miami Heat",
    player: "Jimmy Butler"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 107.99,
    team: "New York Knicks",
    player: "Jalen Brunson"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 112.99,
    team: "Cleveland Cavaliers",
    player: "Donovan Mitchell"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 102.99,
    team: "Atlanta Hawks",
    player: "Trae Young"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 108.99,
    team: "Brooklyn Nets",
    player: "Mikal Bridges"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 103.99,
    team: "Sacramento Kings",
    player: "De'Aaron Fox"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 106.99,
    team: "Minnesota Timberwolves",
    player: "Anthony Edwards"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 110.99,
    team: "New Orleans Pelicans",
    player: "Zion Williamson"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 111.99,
    team: "Chicago Bulls",
    player: "Zach LaVine"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 100.99,
    team: "Toronto Raptors",
    player: "Scottie Barnes"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 104.99,
    team: "Indiana Pacers",
    player: "Tyrese Haliburton"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 109.49,
    team: "Oklahoma City Thunder",
    player: "Shai Gilgeous-Alexander"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 98.99,
    team: "Orlando Magic",
    player: "Paolo Banchero"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 96.99,
    team: "San Antonio Spurs",
    player: "Victor Wembanyama"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 97.99,
    team: "Houston Rockets",
    player: "Jalen Green"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 101.99,
    team: "Charlotte Hornets",
    player: "LaMelo Ball"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 95.99,
    team: "Detroit Pistons",
    player: "Cade Cunningham"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 98.49,
    team: "Washington Wizards",
    player: "Kyle Kuzma"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 96.49,
    team: "Portland Trail Blazers",
    player: "Anfernee Simons"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 97.49,
    team: "Utah Jazz",
    player: "Lauri Markkanen"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 159.99,
    team: "New York Knicks",
    player: "Jalen Brunson"
  },
  {
    imageUrl: "/client/src/assets/placeholder.png",
    price: 79.99,
    team: "Memphis Grizzlies",
    player: "Ja Morant"
  }
];

Product.insertMany(sampleProducts)
  .then(() => {
    console.log("Sample products inserted.");
    mongoose.connection.close();
  });