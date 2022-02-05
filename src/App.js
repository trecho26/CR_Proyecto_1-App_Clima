import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState({});

  const handleSubmit = async (event) => {
    // Evitar comportamiento por defecto
    event.preventDefault();

    // Validar campo vacio
    if (city.trim() === "") return;

    // Consulta a la API
    const req = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=449f337b9c42ad630075be9d71d52993&units=metric`
    );
    // Transformar data a formato JSON
    const data = await req.json();

    // Guardar la data en nuestro estado
    setCityData(data);
  };

  console.log(cityData);

  // Desestructuracion global
  const { main, name } = cityData;

  return (
    <div className="container">
      <div className="item">
        <form className="formulario" onSubmit={handleSubmit}>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <input type="submit" value="Consultar" />
        </form>
      </div>
      <div className="item">
        {main && (
          <div className="card">
            <span>{name}</span>
            <p>{main.temp}°C</p>
            <div className="extra">
              <span>Min. {main.temp_min}°C</span>
              <span>Max. {main.temp_max}°C</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
