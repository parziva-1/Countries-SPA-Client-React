import Nav from "./Nav/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCountries } from "../../redux/actions";
import CountryCard from "./CountryCard/CountryCard";
import { Home as home, BackGround, link } from "./Home.module.css";
import Filters from "./Filters/Filters";
import Pagination from "./Pagination/Pagination";
import { Link } from "react-router-dom";

let PageSize = 10;

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((store) => store.result);

  useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = () => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return countries.slice(firstPageIndex, lastPageIndex);
  };

  const data = currentTableData();

  return (
    <div className={BackGround}>
      <Nav />
      <Filters />
      <div className={home}>
        {data.map((c) => (
          <Link key={c.id} to={`/country/${c.id}`} className={link}>
            <CountryCard {...c} />
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={countries.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Home;
