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
  const handleSearch = (e) => {
    e.preventDefault();
    // setSearchParams({ keyword: searchKeyword });
    // searchParams.delete("category");
  };
  useEffect(() => {
    const basedList = async () => {
      try {
        const baseUrl = `https://apis.data.go.kr/B551011/GoCamping/basedList?MobileOS=ETC&MobileApp=campick&numOfRows=12&serviceKey=CigWDfrtb8KsC1aESUqp9aphPSv1K5o2HU0pHEh4sSWPlZJSa3Lk73vRKi2Xy9uMg%2B6Ae%2FrbnS0iq7T2f9YASA%3D%3D&_type=json`;
        const response = await fetch(baseUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        console.log("response", response);
        const data = await response.json();

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
      <form className={style.searchBar}>
        <label className={style.inputArea}>
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
        {siteLists.map((site) => {
          return <SiteCard key={site.contentId} site={site} />;
        })}
      </div>
    </section>
  );
};

export default Campsite;
