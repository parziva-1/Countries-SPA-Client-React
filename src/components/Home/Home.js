import Nav from "./Nav/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCountries } from "../../redux/actions";
import CountryCard from "./CountryCard/CountryCard";
import { Home as home } from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((store) => store.countries);

  useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  return (
    <div>
      <Nav />
      <div className={home}>
        {countries.map((c) => (
          <CountryCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
};

export default Home;
