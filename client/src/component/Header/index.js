import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/img/logo_2.svg";
import { Link } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import "./style.css";
// image import
import avatar from "../../assets/profile/user.svg";
import signin from "../../assets/profile/refer.svg";

const Header = (props) => {
  // Main Function
  const [toggle, setToggle] = useState(false);
  const [scrollMove, setScrollMove] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function scrollHandler() {
      if (window.scrollY > 51) {
        setScrollMove(true);
      } else {
        setScrollMove(false);
      }
    }

    window.addEventListener("scroll", scrollHandler);
    setLoading(false);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  // End of Main
  return (
    <header
      className={
        scrollMove
          ? "header__active flex flex-none  animate-bounce sticky top-0 left-0 right-0 z-50 px-1 py-2 h-14 xl:h-16 items-center"
          : "flex flex-none px-1 py-2 h-14 xl:h-16 items-center"
      }
    >
      <div className=" w-1/3 md:ml-2 " id="logo p-2">
        <Link to="/">
          <img className="w-20 xl:w-24 xl:ml-4 " src={logo} />
        </Link>
      </div>
      <div className="w-2/3">
        <div className="flex items-center justify-end">
          {loading ? (
            false
          ) : (
            <ul className="flex py-2 h-auto">
              {props.login ? (
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setToggle(false);
                  }}
                >
                  <div
                    className="relative p-1  flex  justify-start items-center  md:flex-row md:mr-3 cursor-pointer lg:mr-4 min-w-2/6"
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  >
                    <img className="w-6 md:mr-1 md:w-8" src={avatar} />
                    <p className="text-xs w-full font-semibold text-center text-gray-800 px-1 lg:text-base cursor-pointer">
                      {props.currentUser.split(" ")[0]}
                    </p>
                    {toggle ? (
                      <div className="border absolute flex flex-col justify-center right-0 top-14 w-20 h-16 z-50 rounded-sm cursor-default bg-gray-100 lg:w-32 lg:h-24">
                        <ul className="">
                          <Link
                            to={
                              props.homeHeader === "Profile" ? "/profile" : "/"
                            }
                          >
                            <li className="text-center text-xs font-medium md:text-sm my-1 lg:text-base">
                              {props.homeHeader}
                            </li>
                          </Link>
                          <Link to="/logout">
                            <li className="text-center text-xs font-medium md:text-sm my-1 ">
                              Log Out
                            </li>
                          </Link>
                        </ul>
                      </div>
                    ) : (
                      false
                    )}
                  </div>
                </OutsideClickHandler>
              ) : (
                <Link to="/login">
                  <span className="px-2 py-1.5 rounded-sm text-xs xl:text-base text-gray-900 mr-2 md:mr-4 font-bold flex items-center">
                    <img src={signin} className="w-3 h-3 mr-1 xl:w-4 xl:h-4 " />
                    Sign In
                  </span>
                </Link>
              )}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
