import React from "react";
import CountryItem, { ICountryItemProps } from "./CountryItem";

interface ICountriesListProps {
  countries: ICountryItemProps[];
}

const CountriesList = (props: ICountriesListProps) => {
  const { countries } = props;
  return (
    <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 lg:gap-16 md:gap-8 gap-4 pt-10">
      {countries.map((c: ICountryItemProps) => (
        <CountryItem
          key={c.numericCode}
          alpha3Code={c.alpha3Code}
          numericCode={c.numericCode}
          name={c.name}
          capital={c.capital}
          flag={c.flag}
          population={c.population}
          region={c.region}
        />
      ))}
    </ul>
  );
};

export default CountriesList;
