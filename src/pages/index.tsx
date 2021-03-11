import React, { useCallback, useEffect, useState } from "react";
import { HiChevronDown, HiSearch, HiX } from "react-icons/hi";
import Input from "../components/FormElements/Input";
import Button from "../components/UI/Button/Button";
import { useForm } from "../hooks/useForm";
import { Meta } from "../layout/Meta";
import { Main } from "../templates/Main";
import CountriesList from "../components/sections/CountriesList/CountriesList";
import { fetcher } from "../utils/fetcher";
import { ICountryItemProps } from "../components/sections/CountriesList/CountryItem";
import useSWR from "swr";
import Fuse from "fuse.js";
import { VALIDATOR_REQUIRE } from "../utils/validators";

const Index = ({ countries }: { countries: ICountryItemProps[] }) => {
  const [formState, inputHandler] = useForm(
    { search: { value: "", isValid: false } },
    false
  );
  const [region, setRegion] = useState<string | null>(null);
  const [searchedCountries, setSearchedCountries] = useState<{}[]>([]);
  const { data: filteredCountries, error } = useSWR(
    region !== null ? `region/${region}` : null,
    fetcher
  );

  const regionFilterHandler = useCallback((region: string) => {
    setRegion(region);
  }, []);

  const cancelFilterHandler = useCallback(() => {
    setRegion(null);
  }, []);

  useEffect(() => {
    const options = {
      keys: ["name", "alpha3Code", "alpha2Code"]
    };

    const fuse = new Fuse(countries, options);

    const result = fuse.search(formState.inputs.search?.value as string);
    const searchedCountries = result.map((r) => r.item);
    setSearchedCountries(searchedCountries);
  }, [formState.inputs, countries]);

  return (
    <Main
      meta={
        <Meta
          title="Where in the world?"
          description="This application provides full information about all the countries around the world."
        />
      }>
      <div className="flex md:flex-row flex-col w-full md:justify-between space-y-2">
        <Input
          element="input"
          type="text"
          id="search"
          className="py-4 pl-16 md:w-96 w-full bg-white dark:bg-darkBlue placeholder-secondaryDarkBlue dark:placeholder-white font-semibold text-sm"
          icon={<HiSearch className="text-xl mt-4 ml-6 text-gray-400" />}
          placeholder="Search for a country..."
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <div className="dropdown inline-block relative p-2">
          <Button className="p-4 w-64 bg-white dark:bg-darkBlue shadow-md flex flex-row justify-between rounded-lg">
            <p className="font-semibold text-sm">
              {region === null ? "Filter by Region" : region}
            </p>{" "}
            {region === null ? (
              <HiChevronDown className="my-auto mx-2" />
            ) : filteredCountries && !error ? (
              <HiX onClick={cancelFilterHandler} className="my-auto mx-2" />
            ) : (
              <p>...</p>
            )}
          </Button>
          <ul className="hidden bg-white dark:bg-darkBlue shadow-md p-4 rounded-lg w-64 text-sm font-semibold my-1 dropdown-menu absolute">
            <li
              onClick={() => regionFilterHandler("Africa")}
              className="my-2 px-4 cursor-pointer hover:bg-lightGray py-2">
              Africa
            </li>
            <li
              onClick={() => regionFilterHandler("Europe")}
              className="my-2 px-4 cursor-pointer hover:bg-lightGray py-2">
              Europe
            </li>
            <li
              onClick={() => regionFilterHandler("Americas")}
              className="my-2 px-4 cursor-pointer hover:bg-lightGray py-2">
              Americas
            </li>
            <li
              onClick={() => regionFilterHandler("Asia")}
              className="my-2 px-4 cursor-pointer hover:bg-lightGray py-2">
              Asia
            </li>
            <li
              onClick={() => regionFilterHandler("Oceania")}
              className="my-2 px-4 cursor-pointer hover:bg-lightGray py-2">
              Oceania
            </li>
          </ul>
        </div>
      </div>
      <CountriesList
        countries={
          searchedCountries.length > 0
            ? searchedCountries
            : region !== null && filteredCountries && !error
            ? filteredCountries
            : countries
        }
      />
    </Main>
  );
};

export async function getServerSideProps() {
  const data = await fetcher("all");

  if (!data) {
    return {
      notFound: true
    };
  }

  return {
    props: { countries: data } // will be passed to the page component as props
  };
}

export default Index;
