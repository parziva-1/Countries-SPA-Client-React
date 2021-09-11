import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { geoMercator, geoPath } from "d3-geo";
import styles from "./CountryPage.module.css";

const CountryPage = (props) => {
  const { id } = useParams();
  const [country, setCountry] = useState();
  const [data, setData] = useState(null);
  const [size, setSize] = useState({ height: null, width: null });

  const height = 450,
    width = 450;

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
    )
      .then((data) => data.json())
      .then((res) => setData(res));
  }, []);

  const generator = (() => {
    const projection = geoMercator().fitSize([658, 500], data);
    return geoPath().projection(projection);
  })();

  useEffect(() => {
    if (id !== "" || !id === undefined) {
      fetch(`http://localHost:3001/country/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (!Array.isArray(data)) {
            setCountry({ name: data.msg, id: 1 });
          } else {
            setCountry(data[0]);
          }
        });
    } else {
      country(null);
    }
  }, [id]);

  const div = useCallback((node) => {
    if (node !== null) {
      setSize((state) => ({
        ...state,
        height: node.getBoundingClientRect().height,
      }));
      setSize((state) => ({
        ...state,
        width: node.getBoundingClientRect().width,
      }));
    }
  }, []);

  console.log(size);

  return (
    <div>
      {country ? (
        <div>
          <img src={country.image} alt={country.name}></img>
          <p>Country: {country.name}</p>
          <p>Id: {id}</p>
          <p>Continent: {country.continent}</p>
          <p>Capital: {country.capital}</p>
          <p>Subregion: {country.subregion}</p>
          <p>Area: {country.area} km²</p>
          <p>Population: {country.population}</p>

          <p>
            {country.Activities.length >= 1 ? (
              <div>
                <p>Activities</p>
                {country.Activities.map((a) => a.name)}
              </div>
            ) : (
              ""
            )}
          </p>
          <svg
            style={{ backgroundColor: "black" }}
            className={styles.svg}
            ref={div}
          >
            {data &&
              data.features.map((f) => (
                <path
                  className={styles.path}
                  d={generator(f)}
                  fill={
                    f.properties.name === country.name ? "red" : "transparent"
                  }
                />
              ))}
          </svg>
        </div>
      ) : (
        <p>hi</p>
      )}
    </div>
  );
};

export default CountryPage;
