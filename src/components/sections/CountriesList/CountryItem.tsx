import { useRouter } from "next/dist/client/router";
import React, { useCallback } from "react";

export interface ICountryItemProps {
  name: string;
  flag: string;
  population: number;
  capital: string;
  region: string;
  numericCode?: number;
  alpha3Code?: string;
  nativeName?: string;
  subregion?: string;
  topLevelDomain?: string[];
  currencies?: string[];
  languages?: string[];
  borders?: string[];
}

const CountryItem = (props: ICountryItemProps) => {
  const {
    capital,
    flag,
    name,
    population,
    region,
    numericCode,
    alpha3Code
  } = props;
  const router = useRouter();

  const navigateToDetails = useCallback(() => {
    router.push(`/details/${alpha3Code!.toLowerCase()}`);
  }, []);

  return (
    <li
      key={numericCode}
      className="flex flex-col bg-white dark:bg-darkBlue rounded-lg shadow-lg">
      <img
        style={{ width: "full", height: "300px" }}
        className="object-cover rounded-t-lg cursor-pointer hover:shadow-md"
        src={flag}
        onClick={navigateToDetails}
      />
      <div className="flex flex-col p-6">
        <span
          className="font-extrabold text-lg pb-4 cursor-pointer hover:text-gray-700 dark:hover:text-gray-400"
          onClick={navigateToDetails}>
          {name}
        </span>
        <ul className="text-sm space-y-1 pb-6">
          <li className="flex flex-row space-x-1">
            <p className="font-semibold">Population:</p>
            <p>{population.toLocaleString("en-US")}</p>
          </li>
          <li className="flex flex-row space-x-1">
            <p className="font-semibold">Region:</p>
            <p>{region}</p>
          </li>
          <li className="flex flex-row space-x-1">
            <p className="font-semibold">Capital:</p>
            <p>{capital}</p>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default CountryItem;
