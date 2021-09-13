import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import style from "./ActivityPage.module.css";
import NavBar from "../Home/Nav/Nav";
const ActivityPage = () => {
  const countries = useSelector((store) => store.countries);
  const [state, setState] = useState({
    name: "",
    duration: 1,
    difficulty: 1,
    season: "Summer",
    countries: [],
  });

  const handleClickDelete = (e) => {
    if (e.target?.attributes?.name?.nodeValue !== undefined) {
      setState((state) => ({
        ...state,
        countries: state.countries.filter(
          (name) => name !== e.target.attributes.name.nodeValue
        ),
      }));
    } else return;
  };
  const countriesName = [...new Set(countries.map((c) => c.name))]
    .sort((a, b) => (a > b ? 1 : -1))
    .filter((name) => !state.countries.includes(name));

  const handleChange = (e) =>
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch("http://localhost:3001/activity", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      body: JSON.stringify({
        name: state.name,
        difficulty: parseInt(state.difficulty),
        duration: state.duration,
        season: state.season,
        countries: state.countries,
      }), // body data type must match "Content-Type" header
    });
  };
  return (
    <div className={style.background}>
      <NavBar />
      <div className={style.back}>
        <form onSubmit={handleSubmit} className={style.form}>
          <input
            placeholder="Name"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          ></input>
          <label>difficulty</label>
          <label>
            <input
              className={style.input}
              required
              onChange={(e) => {
                setState((state) => ({ ...state, difficulty: e.target.value }));
              }}
              type="range"
              min="1"
              max="5"
              step="1"
              value={state.difficulty}
            ></input>
            {state.difficulty}
          </label>
          <label>{state.duration > 1 ? "Hours" : "Hour"}:</label>
          <input
            required
            placeholder="Duration"
            type="number"
            name="duration"
            value={state.duration}
            onChange={(e) => {
              /^\d*\.?\d*$/.test(e.target.value) && e.target.value > 0
                ? handleChange(e)
                : alert("numbers only");
            }}
          ></input>

          <select
            value={state.season}
            name="season"
            onChange={handleChange}
            required
          >
            <option>Summer</option>
            <option>Autumn</option>
            <option>Winter</option>
            <option>Spring</option>
          </select>
          <select
            name="countries"
            onChange={(e) => {
              if (e.target.value !== "Chose one") {
                setState((state) => ({
                  ...state,
                  countries: [...state.countries, e.target.value],
                }));
              }
            }}
            required
          >
            <option>Chose one</option>
            {countriesName.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
          <div className={style.names}>
            {state.countries.length > 0 &&
              state.countries.map((name) => (
                <p
                  key={name}
                  onClick={handleClickDelete}
                  className={StyleSheet.name}
                >
                  {name} <AiOutlineClose value={name} name={name} />,
                </p>
              ))}
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default ActivityPage;
