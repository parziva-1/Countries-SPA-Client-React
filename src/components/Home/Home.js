import Nav from "./Nav/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getAllCountries } from "../../redux/actions";
import CountryCard from "./CountryCard/CountryCard";
import { Home as home } from "./Home.module.css";
import Filters from "./Filters/Filters";
import Pagination from "./Pagination/Pagination";

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
    console.log(firstPageIndex, lastPageIndex);
    return countries.slice(firstPageIndex, lastPageIndex);
  };

  const data = currentTableData();

  return (
    <div>
      <Nav />
      <Filters />
      <div className={home}>
        {data.map((c) => (
          <CountryCard key={c.id} {...c} />
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
