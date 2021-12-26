import axios from "axios";
import "./style.css";
import React, { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Graph from "../Graph/index";
import BrandIcons from "../../service/images";
import Loader from "react-loader-spinner";

const Profile = (props) => {
  // Main
  const [openSearch, setSearch] = useState(false);
  const [ongoing, setOngoing] = useState(true);
  const [tracked, setTracked] = useState(false);
  const [Notification, setNotification] = useState(false);
  const [ongoingTask, setOngoingTask] = useState([]);
  const [trackedTask, setTrackedTask] = useState([]);
  const [notificationTask, setNotificationTask] = useState([]);
  const [onLoding, setOnLoading] = useState(true);
  const [searchStr, setSearchStr] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/profileData");
        const notification = await axios.get("/notification");
        if (response.data["Data"] !== undefined) {
          const ongoingTask = response.data["Data"].filter((Element) => {
            if (Element["pricedrop"] === false) {
              return Element;
            }
          });
          const trackedTask = response.data["Data"].filter((Element) => {
            if (Element["pricedrop"] === true) {
              return Element;
            }
          });
          setOngoingTask(ongoingTask);
          setTrackedTask(trackedTask);
          setOnLoading(false);
        }

        setNotificationCount(response.data["notificationCount"]);
        setNotificationTask(notification.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
    async function authHandler() {
      const response = await axios.get("/auth");
      setUserEmail(response.data["email"]);
    }
    authHandler();
  }, []);

  async function notificationReset() {
    try {
      const auth = await axios.get("/auth");
      let email = auth.data["email"];
      if (typeof email !== typeof undefined) {
        const notificationResponse = await axios.post("/notificationCount", {
          email: email,
        });
        if (notificationResponse.data["notificationClear"] === true) {
          setNotificationCount(0);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // End of Main
  return (
    <div className="profile scrollbar-hide pt-2  min-h-screen bg-white  ">
      <div className="profile__header  mx-2 rounded-xl mb-5  md:w-10/12 md:mx-auto">
        <div className="flex justify-between items-center px-2 py-1 mt-4 ">
          <div className=" p-1 md:w-1/2">
            <span
              className={
                ongoing
                  ? "text-xs px-2 lg:text-base text-blue-900 cursor-pointer font-medium "
                  : "text-xs px-2 lg:text-base cursor-pointer  font-medium"
              }
              onClick={() => {
                setTracked(false);
                setOngoing(true);
                setNotification(false);
              }}
            >
              Ongoing
            </span>
            <span
              className={
                tracked
                  ? "text-xs px-2 lg:text-base text-blue-900 cursor-pointer  font-medium "
                  : "text-xs px-2 lg:text-base cursor-pointer  font-medium "
              }
              onClick={() => {
                setTracked(true);
                setOngoing(false);
                setNotification(false);
              }}
            >
              Tracked
            </span>
            <span
              className={
                Notification
                  ? "text-xs px-2 lg:text-base text-blue-900 cursor-pointer  font-medium "
                  : "text-xs px-2 lg:text-base cursor-pointer font-medium"
              }
              onClick={() => {
                setTracked(false);
                setOngoing(false);
                setNotification(true);
                notificationReset();
              }}
            >
              Notification
              {notificationCount !== 0 && (
                <span className="ml-2 px-2 rounded-md text-white bg-red-600">
                  {notificationCount}
                </span>
              )}
            </span>
          </div>
          <div className="flex justify-end items-center lg:w-1/2  ">
            {/* Search bar  */}
            <div className="relative lg:w-5/12">
              <OutsideClickHandler
                onOutsideClick={() => {
                  setSearch(false);
                }}
              >
                <svg
                  className="w-5 h-5 m-1 md:hidden lg:hidden cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    setSearch(!openSearch);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

                {openSearch ? (
                  <input
                    className="absolute right-0 top-9 text-xs p-1 pl-4 rounded-sm shadow-sm  md:hidden lg:hidden border border-gray-300 outline-none"
                    type="text"
                    placeholder="Search Products"
                    onChange={(e) => {
                      setSearchStr(e.target.value);
                    }}
                    value={searchStr}
                  />
                ) : (
                  false
                )}
                <input
                  className=" hidden md:block md:text-sm lg:block p-1 pl-4 w-full rounded-xl outline-none border border-gray-300"
                  placeholder="Search Product"
                  onChange={(e) => {
                    setSearchStr(e.target.value);
                  }}
                  value={searchStr}
                />
              </OutsideClickHandler>
            </div>
          </div>
        </div>
      </div>

      {/* Info Tiles */}
      {onLoding ? (
        <div className="h-screen flex justify-center ">
          <Loader
            className="mt-24"
            type="TailSpin"
            color="rgb(255, 255, 255)"
            height={50}
            width={50}
            timeout={30000} //3 secs
          />
        </div>
      ) : (
        false
      )}

      {ongoing && ongoingTask.length !== 0 ? (
        ongoingTask
          .filter((element) => {
            let title = element["title"].toLocaleLowerCase();
            let vendor = element["vendor"].toLocaleLowerCase();
            let str = searchStr.toLocaleLowerCase();
            if (title.includes(str) || vendor.includes(str)) {
              return element;
            }
          })
          .map((element, index) => {
            return (
              <div className="ongoing flex flex-col my-2 " key={element["_id"]}>
                <div className="mx-2 flex justify-between text-xs font-medium font-sans  text-gray-300 px-2 md:w-10/12 md:mx-auto">
                  <div>
                    {(function () {
                      const date = new Date(element["date"]);
                      const newDate = date.toDateString().split(" ");

                      return newDate[2] + " " + newDate[1] + " " + newDate[3];
                    })()}
                  </div>
                  {/* <div>
                    <svg
                      className="w-5 h-5 cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div> */}
                </div>
                <div className="ongoing__wrapper p-1 border bg-white shadow-sm mx-2 rounded-xl my-2 md:w-10/12 md:mx-auto">
                  <div className="flex justify-between">
                    <img
                      className="w-8 mx-1 my-1 lg:w-12"
                      src={BrandIcons[element["vendor"]]}
                    />
                    {(function () {
                      if (element["error"] === 1) {
                        return (
                          <span>
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="black"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              alt="Link can not be tracked"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </span>
                        );
                      } else {
                        return false;
                      }
                    })()}
                  </div>
                  <div className="flex flex-col items-center px-2 ">
                    <div className="text-sm text-center  font-normal lg:text-lg">
                      {element["title"]}
                    </div>
                    <div className="text-sm text-gray-900 font-semibold lg:text-lg">
                      Marked Price :
                      {(function () {
                        const formatter = new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(element["target_price"]);
                        return formatter;
                      })()}
                    </div>
                  </div>
                  <div>
                    <Graph
                      dateArray={element["dateArray"]}
                      priceArray={element["current_price"]}
                    />
                  </div>
                </div>
              </div>
            );
          })
      ) : (
        <div className="md:w-10/12 md:mx-auto text-center text-gray-100 ">
          {ongoing && "No Product Added !"}
        </div>
      )}

      {tracked && trackedTask.length !== 0 ? (
        trackedTask
          .filter((element) => {
            let title = element["title"].toLocaleLowerCase();
            let vendor = element["vendor"].toLocaleLowerCase();
            let str = searchStr.toLocaleLowerCase();
            if (title.includes(str) || vendor.includes(str)) {
              return element;
            }
          })
          .map((element, index) => {
            return (
              <div className="flex flex-col my-2" key={element["_id"]}>
                <div className="mx-2 text-xs flex justify-between items-center font-medium font-sans text-gray-300 px-2 md:w-10/12 md:mx-auto">
                  <div>
                    {(function () {
                      const date = new Date(element["date"]);
                      const newDate = date.toDateString().split(" ");

                      return newDate[2] + " " + newDate[1] + " " + newDate[3];
                    })()}
                  </div>

                  {/* <div>
                    <svg
                      className="w-5 h-5 cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div> */}
                </div>
                <div className="tracked__wrapper p-1  shadow-sm mx-2 rounded-xl my-2 md:w-10/12 md:mx-auto">
                  <div>
                    <img
                      className="w-8 mx-1 my-1 lg:w-12"
                      src={BrandIcons[element["vendor"]]}
                    />
                  </div>
                  <div className="flex flex-col items-center px-2 ">
                    <div className="text-sm text-center lg:text-lg">
                      {element["title"]}
                    </div>
                    <div className="text-sm font-semibold lg:text-lg">
                      Marked Price :
                      {(function () {
                        const formatter = new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(element["target_price"]);
                        return formatter;
                      })()}
                    </div>
                  </div>
                  <div>
                    <Graph
                      dateArray={element["dateArray"]}
                      priceArray={element["current_price"]}
                    />
                  </div>
                </div>
              </div>
            );
          })
      ) : (
        <div className="md:w-10/12 md:mx-auto text-center text-gray-100 ">
          {tracked && "No Product Tracked"}
        </div>
      )}

      {/* Notification Panel */}
      {Notification && notificationTask.length !== 0 ? (
        notificationTask
          .filter((element) => {
            let title = element["title"].toLocaleLowerCase();
            let vendor = element["vendor"].toLocaleLowerCase();
            let str = searchStr.toLocaleLowerCase();
            if (title.includes(str) || vendor.includes(str)) {
              return element;
            }
          })
          .map((element) => {
            return (
              <div className="my-4">
                <div className="notification__date text-xs mx-2 text-gray-300 font-medium mb-2 xl:text-base md:w-10/12 md:mx-auto">
                  {(function () {
                    const date = new Date(element["date"]);
                    const newDate = date.toDateString().split(" ");

                    return newDate[2] + " " + newDate[1] + " " + newDate[3];
                  })()}
                </div>
                <div
                  className=" notification__wrapper   flex flex-col items-center m-2 shadow-sm mx-2 rounded-xl my-2 md:w-10/12 md:mx-auto "
                  key={element["_id"]}
                >
                  <div className=" flex flex-col w-full items-center p-2">
                    <div className="container">
                      <img
                        className="w-8 my-1 lg:w-12"
                        src={BrandIcons[element["vendor"]]}
                      />
                    </div>
                    <div className="notification__title text-sm text-center md:text-sm lg:text-lg">
                      {element["title"]}
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full py-2 px-1">
                    <div className="target__price text-xs font-semibold text-gray-800 xl:text-base">
                      Marked Price :{" "}
                      {(function () {
                        const formatter = new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(element["target_price"]);
                        return formatter;
                      })()}
                    </div>
                    <div className="buy__btn">
                      <span className="  py-1 px-2 rounded-sm text-white font-medium bg-blue-500 xl:py-2 ">
                        <a
                          className="text-xs xl:text-sm "
                          href={element["url"]}
                          target="_blank"
                          alt="buy now"
                        >
                          Buy Now{" "}
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
      ) : (
        <div className="md:w-10/12 md:mx-auto text-center text-gray-100 ">
          {Notification && "No Notification"}
        </div>
      )}

      {/* End of Notification */}
    </div>
  );
};

export default Profile;
