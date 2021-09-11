import { Card, Img, Box } from "./CountryCard.module.css";

const CountryCard = ({ id, name, continent, image }) => {
  return (
    <div className={Card}>
      <div className={Box}>
        <div>Country: {name}</div>
        <div>Continent: {continent}</div>
      </div>
      <img src={image} className={Img} alt={name}></img>
    </div>
  );
};

export default CountryCard;
