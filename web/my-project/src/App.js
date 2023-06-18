import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);

    const fetchData = () => {
        // Отримати дані з сервера (замініть URL на потрібний)
        fetch('http://localhost:3000/data')
            .then((response) => response.json())
            .then((data) => {
                setTemperature(data.temperature);
                setHumidity(data.humidity);
            })
            .catch((error) => console.log('Error:', error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="card">
                <h1 className="title">Temperature and Humidity</h1>
                <div className="data">
                    <p>{temperature}°C</p>
                    <p>{humidity}%</p>
                </div>
                <button className="btn" onClick={fetchData}>Оновити</button>
            </div>
        </div>
    );
};

export default App;