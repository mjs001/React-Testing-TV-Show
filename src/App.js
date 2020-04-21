import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-dropdown";
import parse from "html-react-parser";
import { fetchShow } from "./api/fetchShow";
import { formatSeasons } from "./utils/formatSeasons";

import Episodes from "./components/Episodes";
import "./styles.css";

export default function App() {
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const episodes = seasons[selectedSeason] || [];

  const handleSelect = (e) => {
    setSelectedSeason(e.value);
    console.log("this is running", e.value);
  };

  useEffect(() => {
    fetchShow().then((res) => {
      console.log("setShow", res);
      setShow(res.data);
      setSeasons(formatSeasons(res._embedded.episodes));
    });
  }, []);

  if (!show) {
    return <h2 className="fetching">Fetching data...</h2>;
  }

  return (
    <div className="App">
      <img className="poster-img" src={show.image.original} alt={show.name} />
      <h1>{show.name}</h1>
      {parse(show.summary)}
      <Dropdown
        options={Object.keys(seasons)}
        onChange={handleSelect}
        value={selectedSeason || "Select a season"}
        placeholder="Select an option"
        data-testid="button"
      />
      <Episodes episodes={episodes} />
    </div>
  );
}
