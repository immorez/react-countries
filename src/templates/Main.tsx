import React, { ReactNode } from "react";
import Footer from "../components/sections/Footer/Footer";
import Header from "../components/sections/Header/Header";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  return (
    <div className="antialiased w-full">
      {props.meta}

      <div className="w-full flex flex-col min-h-screen bg-lightGray text-secondaryDarkBlue dark:bg-primaryDarkBlue dark:text-white">
        <Header />
        <div className="py-5 md:px-16 px-6 text-xl min-h-screen">
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export { Main };
