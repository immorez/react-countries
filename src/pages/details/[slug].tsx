import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { ICountryItemProps } from "../../components/sections/CountriesList/CountryItem";
import Button from "../../components/UI/Button/Button";
import { Meta } from "../../layout/Meta";
import { Main } from "../../templates/Main";
import getCountryISO2 from "../../utils/convertISO";
import { fetcher } from "../../utils/fetcher";

interface IDetailsProps {
  country: ICountryItemProps;
}

interface IDataStructure {
  value: string | string[] | number | number[] | undefined;
  key: string | undefined;
  id: number | undefined;
}

const Details = (props: IDetailsProps) => {
  const { country } = props;
  const {
    name,
    flag,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders
  } = country;
  const router = useRouter();
  const [bordersElements, setBorderElements] = useState<
    { name: string; code: string }[]
  >([]);

  const navigateBack = useCallback(() => {
    router.back();
  }, [router]);

  const DATA_STRUCTURE = [
    { id: 1, key: "Native Name", value: nativeName },
    { id: 2, key: "Population", value: population },
    { id: 3, key: "Region", value: region },
    { id: 4, key: "Sub Region", value: subregion },
    { id: 5, key: "Capital", value: capital },
    { id: 6, key: "Top Level Domain", value: topLevelDomain },
    {
      id: 7,
      key: "Currencies",
      value: currencies!.map((c: any) => c.name).join(", ")
    },
    {
      id: 8,
      key: "Languages",
      value: languages!.map((l: any) => l.name).join(", ")
    }
  ];

  useEffect(() => {
    const regions = new (Intl as any).DisplayNames(["en"], { type: "region" });
    let bordersElements = borders!.map((b: string) => {
      return { name: regions.of(getCountryISO2(b)), code: b.toLowerCase() };
    });
    setBorderElements(bordersElements);
  }, [borders]);

  return (
    <Main
      meta={
        <Meta
          title={`${name} - Where in the world?`}
          description={`Fancy information about ${name}`}
        />
      }>
      <div className="flex flex-col md:pt-12 pt-5">
        <Button
          onClick={navigateBack}
          className="mr-auto flex flex-row shadow-md px-8 py-2 text-sm rounded-lg bg-white dark:bg-darkBlue hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-100">
          <HiArrowLeft className="my-auto mx-1" />
          Back
        </Button>
        <div className="flex md:flex-row flex-col px-2 py-16 md:justify-between">
          <div className="md:w-1/2 w-full flex">
            <img
              className="md:max-w-xl w-full h-full object-cover mx-auto"
              src={flag}
              alt={name}
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col space-y-8">
            {/* country name */}
            <h1 className="font-extrabold text-3xl py-4">{name}</h1>
            <ul className="md:w-1/2 w-full text-sm space-y-1 pt-4 grid md:grid-cols-2 grid-cols-1 gap-x-10 justify-items-stretch">
              {DATA_STRUCTURE.map((d: IDataStructure) => (
                <li key={d.id} className="flex flex-row space-x-1 pr-4">
                  <p className="font-semibold whitespace-nowrap">{d.key}:</p>
                  <p>
                    {Array.isArray(d.value)
                      ? d.value.join(", ")
                      : d.value === ""
                      ? "---"
                      : d.value?.toLocaleString("en-US")}
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex md:flex-row flex-col md:space-x-4">
              <p className="font-extrabold my-auto">Border Countries:</p>
              {bordersElements.length > 0 ? (
                <ul className="flex flex-wrap">
                  {bordersElements.map((b: { name: string; code: string }) => (
                    <li
                      key={b.code}
                      onClick={() => router.push(`/details/${b.code}`)}
                      className="mr-1 my-1 shadow-md px-8 py-2 text-sm rounded-md bg-white dark:bg-darkBlue hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-100 cursor-pointer">
                      {b.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>---</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get countries
  const countries = await fetcher("all");

  // Get the paths we want to pre-render based on countries
  const paths = countries.map((c: any) => ({
    params: { slug: String(c.alpha3Code).toLowerCase() }
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }: any) {
  // params contains the product `slug`.
  // If the route is like /details/irn, then params.slug is irn
  const country = await fetcher(`alpha/${params.slug}`);

  // Pass country data to the page via props
  return { props: { country } };
}

export default Details;
