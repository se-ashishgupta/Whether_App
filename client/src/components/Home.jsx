import React, { useState } from "react";
import axios from "axios";
import { server } from "../index";
import "./Home.css";
import Loader from "./Loader";
const Home = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [temp, setTemp] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [icon, setIcon] = useState("");
  const [date, setDate] = useState("");

  // Function to get the name of day
  function getDayFullName(num) {
    switch (num) {
      case 0:
        return "Sunday";

      case 1:
        return "Monday";

      case 2:
        return "Tuesday";

      case 3:
        return "Wednesday";

      case 4:
        return "Thursday";

      case 5:
        return "Friday";

      case 6:
        return "Saturdat";

      default:
        return "Don't Know";
    }
  }

  const getWhether = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { data } = await axios.post(`${server}/serachwhether`, {
        city,
      });

      // // Destructuring
      const {
        current: {
          temp_c,
          condition: { text, icon },
        },
        location: { name, localtime },
      } = data.response;

      const exactTime = localtime.split(" ")[1];
      const exactDate = localtime.split(" ")[0];
      const exactDay = getDayFullName(new Date(exactDate).getDay());

      setTemp(temp_c);
      setName(name);
      setText(text);
      setIcon(icon);
      setDate(`${exactTime} - ${exactDay}   ${exactDate}`);
      setLoading(false);
    } catch (error) {
      window.alert("City Not Found");
      setLoading(false);
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="container">
        {temp ? (
          <div className="weather">
            <div className="weather1">{temp}</div>
            <div className="weather2">
              <p>{name}</p>
              <span>{date}</span>
            </div>

            <div className="weather3">
              <p>
                <img src={icon} alt="condition" />
              </p>
              <span>{text}</span>
            </div>
          </div>
        ) : (
          <h1 className="default">Search Now...</h1>
        )}
      </div>

      <nav>
        <form onSubmit={getWhether}>
          <input
            type="text"
            placeholder="Search Location"
            className="searchField"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </form>
      </nav>
    </div>
  );
};

export default Home;
