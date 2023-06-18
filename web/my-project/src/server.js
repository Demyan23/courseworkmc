const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { Board, Thermometer } = require("johnny-five");
const board = new Board();

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1108',
  database: 'thdata'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

app.use(cors());

let temperature;
let humidity;

board.on("ready", () => {
  const thermometer = new Thermometer({
    controller: "DHT11_I2C_NANO_BACKPACK",
    pin: 2
  });

  thermometer.on("change", () => {
    temperature = thermometer.celsius;
    humidity = thermometer.relativeHumidity;

    const query = `INSERT INTO sensor_data (temperature, humidity) VALUES (${temperature}, ${humidity})`;
    db.query(query, (err, result) => {
      if (err) throw err;
      console.log('Data saved to database');
    });
  });
});

app.get('/data', (req, res) => {
  const data = {
    temperature: temperature,
    humidity: humidity
  };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});