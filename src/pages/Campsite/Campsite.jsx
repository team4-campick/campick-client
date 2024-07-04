import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../../css/Campsite/Campsite.module.css";
import SiteCard from "../../components/Campsite/SiteCard";

const Campsite = () => {
  const url = process.env.REACT_APP_SERVER_URL;
  const apiUrl = "https://apis.data.go.kr/B551011/GoCamping/";
  const apiKey = process.env.REACT_APP_SERVICE_KEY;
  const apiOS = process.env.REACT_APP_SERVICE_OS;
  const apiType = process.env.REACT_APP_SERVICE_TYPE;
  const apiName = process.env.REACT_APP_SERVICE_NAME;

  const [searchKeyword, setSearchKeyword] = useState("");
  const [siteLists, setSiteLists] = useState([]);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    await searchList();
  };
  const searchList = async () => {
    try {
      const searchUrl = new URL(
        `${apiUrl}searchList?MobileOS=${apiOS}&MobileApp=${apiName}&numOfRows=12&serviceKey=${apiKey}&_type=${apiType}&keyword=${encodeURI(
          searchKeyword
        )}`
      );
      console.log("검색 기능", searchUrl);
      const response = await fetch(searchUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSiteLists(data.response.body.items.item);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    console.log("Updated siteLists:", siteLists);
  }, [siteLists]);

  useEffect(() => {
    const basedList = async () => {
      try {
        const baseUrl = new URL(
          `${apiUrl}basedList?MobileOS=${apiOS}&MobileApp=${apiName}&numOfRows=12&serviceKey=${apiKey}&_type=${apiType}`
        );
        console.log("baseUrl : ", baseUrl);
        const response = await fetch(baseUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        console.log("response", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setSiteLists(data.response.body.items.item);
      } catch (error) {
        console.error(error);
      }
    };
    basedList();
  }, []);
  return (
    <section className={style.campsite}>
      <h2 hidden>Campsite</h2>
      <form className="searchBar" onSubmit={handleSearch}>
        <label className="inputArea">
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </label>
      </form>
      <div className={style.siteAreas}>
        {siteLists ? (
          siteLists.map((site) => {
            return <SiteCard key={site.contentId} site={site} />;
          })
        ) : (
          <div>검색된 내용이 없습니다.</div>
        )}
      </div>
    </section>
  );
};

export default Campsite;
