import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("Delhi");
  const [temp, setTemp] = useState('temp To be get');
  const [condition, setCondition] = useState('condition To be get');


  // now have to convert the date in month name format

  const months = [
    "jan",
    "feb",
    "Mar",
    "apr",
    "may",
    "jun",
    "july",
    "aug",
    "sept",
    "oct",
  ];

  console.log(months[5]);
  //have to separate the day month name and year form the original date
  const dateToday = new Date().getDate();
  const monthName = months[new Date().getMonth()];
  const year = new Date().getFullYear();

  // formation the string
  const printDate = `${monthName} ${dateToday}, ${year}`;
  // fetching the data from api
  // https://api.openweathermap.org/data/2.5/weather?q=ladwa&appid=f7c3e53038ce83035f61557c22d0ee22

  const fetchData = async (city) => {
    const response = await fetch(
      ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=24d56173ff2a282511356e4725e1ead3`
    );
    const data = await response.json();
    console.log(data.main.temp, data.weather[0].description, data.name);

    setCity(data.name);
    setCondition(data.weather[0].description);
    setTemp(data.main.temp);
  };



  function cityName(e) {
    setCity(e.target.value);



  }

  function submitDone(e) {
    e.preventDefault();
    fetchData(city);
  }

  return (
    <div className="App">
      <h3> {printDate}</h3>
      <h1>{city}</h1>

      <h2>{temp}</h2>
      <p>{condition}</p>
      <form onSubmit={submitDone}>
        <input placeholder="enter the place name" onChange={cityName} />
        <button>Get</button>
      </form>
    </div>
  );
}

export default App;
