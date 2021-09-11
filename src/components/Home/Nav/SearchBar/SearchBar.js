import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SearchBar.module.css";
const SearchBar = () => {
  const [text, setText] = useState("");
  const [search, setSearch] = useState(null);

  const handleSubmint = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (text !== "") {
      fetch(`http://localHost:3001/country?name=${text}`)
        .then((res) => res.json())
        .then((data) => {
          if (!Array.isArray(data)) {
            setSearch([{ name: data.msg, id: 1 }]);
          } else {
            setSearch(data);
          }
        }); //setSearch(data)
    } else {
      setSearch(null);
    }
  }, [text]);

  console.log(search);
  return (
    <div>
      <form onSubmit={handleSubmint} className={styles.form}>
        <input
          onChange={handleChange}
          className={styles.formInput}
          value={text}
        />
        <button value={text} type="submit" className={styles.formButtom}>
          Search
        </button>
      </form>

      {search && (
        <ul
          className={styles.dataResult}
          style={{
            position: "fixed",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          {search.map((c) => (
            <Link
              onClick={() => {
                setSearch(null);
                setText("");
              }}
              to={`/country/${c.id}`}
              key={c.id}
              className={styles.dataItem}
            >
              <li>{c.name}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
