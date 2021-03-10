import React, { useCallback } from "react";
import { useTheme } from "next-themes";
import Button from "../../UI/Button/Button";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { Config } from "../../../utils/Config";
import { useRouter } from "next/dist/client/router";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleThemeHandler = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const router = useRouter();

  const navigateToHome = useCallback(() => {
    router.push("/");
  }, []);

  return (
    <div className="flex md:flex-row flex-col justify-between py-6 px-16 shadow-sm bg-white dark:bg-darkBlue">
      <h1
        className="font-bold md:text-3xl text-xl text-center md:text-left cursor-pointer"
        onClick={navigateToHome}>
        {Config.title}
      </h1>
      <Button
        onClick={toggleThemeHandler}
        className="flex flex-row focus:outline-none mx-auto md:mx-0">
        {theme === "dark" ? (
          <HiOutlineSun className="my-auto mx-1 md:text-lg text-sm" />
        ) : (
          <HiOutlineMoon className="my-auto mx-1 md:text-lg text-sm" />
        )}{" "}
        <p className="my-auto font-bold md:text-md text-sm">
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </p>
      </Button>
    </div>
  );
};

export default Header;
