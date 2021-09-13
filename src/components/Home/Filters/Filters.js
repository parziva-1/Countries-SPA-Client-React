import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Filters.module.css";

const Filters = () => {
  const [filter, setFilter] = useState({
    alf: { state: true, ord: true },
    ord: { state: false, ord: true },
    continent: "All",
    activity: "All",
  });

  const countries = useSelector((store) => store.countries);
  const dispatch = useDispatch();

  const hanldeOnChangueFilters = (e) => {
    setFilter((state) => ({ ...state, [e.target.name]: e.target.value }));
    if (e.target.name === "continent")
      setFilter((state) => ({ ...state, activity: "All" }));
  };

  const filters = (movies) =>
    movies.filter(
      (m) =>
        (filter.continent === "All"
          ? true
          : m.continent === filter.continent) &&
        (filter.activity === "All"
          ? true
          : m.Activities.map((m) => m.name).includes(filter.activity))
    );

  var result = filters(countries);

  if (filter.alf.state) {
    result = result.sort((a, b) =>
      filter.alf.ord ? (a.name > b.name ? 1 : -1) : b.name > a.name ? 1 : -1
    ); //sort abc
  }

  if (filter.ord.state) {
    result = result.sort((a, b) =>
      filter.ord.ord ? a.population - b.population : b.population - a.population
    ); //sort 123
  }

  const continents = [...new Set(countries.map((c) => c.continent))].sort(
    (a, b) => (a > b ? 1 : -1)
  ); // all continets in list

  const activitys = [
    ...new Set(
      result.reduce(
        (acc, curr) => [
          ...acc,
          ...curr.Activities.reduce((acc, curr) => [...acc, curr.name], []),
        ],
        []
      )
    ),
  ]; // all activitys name

  useEffect(
    () => setFilter((state) => ({ ...state, activity: "All" })),
    [filter.continent]
  );

  useEffect(() => {
    dispatch({ type: "CountriesFilter", payload: result });
  }, [result]);

  return (
    <div className={styles.Filters}>
      <p>Filters: </p>
      <div className={styles.filtersContainer}>
        <button
          className={styles.button}
          onClick={() =>
            setFilter((state) => ({
              ...state,
              alf: { ...state.alf, ord: !state.alf.ord, state: true },
              ord: { ...state.ord, state: false, ord: true },
            }))
          }
        >
          Alfabet: alf
        </button>
      </div>
      <div className={styles.filtersContainer}>
        <button
          className={styles.button}
          onClick={() =>
            setFilter((state) => ({
              ...state,
              ord: { ...state.ord, ord: !state.ord.ord, state: true },
              alf: { ...state.alf, state: false, ord: true },
            }))
          }
        >
          Population: ord
        </button>
      </div>
      <p>Continent: </p>
      <div className={styles.filtersContainer}>
        <select
          onChange={hanldeOnChangueFilters}
          name="continent"
          className={styles.button}
        >
          <option value="All" className={styles.option}>
            All
          </option>
          {continents.map((c) =>
            c !== "" ? (
              <option key={c} value={c}>
                {c}
              </option>
            ) : (
              ""
            )
          )}
        </select>
      </div>
      <p>Activity: </p>
      <div className={styles.filtersContainer}>
        <select
          onChange={hanldeOnChangueFilters}
          name="activity"
          className={styles.button}
          value={filter.activity}
        >
          <option value="All">All</option>
          {activitys.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default memo(Filters);
