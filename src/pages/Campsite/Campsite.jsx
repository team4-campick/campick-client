import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import style from "../../css/Campsite/Campsite.module.css";
import SiteCard from "../../components/Campsite/SiteCard";
import Loading from "../../components/Loading/Loading";
import REGION_CATEGORY from "../../constants/campsite";

const Campsite = () => {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_SERVER_URL;
  const apiUrl = "https://apis.data.go.kr/B551011/GoCamping/";
  const apiKey = process.env.REACT_APP_SERVICE_KEY;
  const apiOS = process.env.REACT_APP_SERVICE_OS;
  const apiType = process.env.REACT_APP_SERVICE_TYPE;
  const apiName = process.env.REACT_APP_SERVICE_NAME;

  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [siteLists, setSiteLists] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading && !isSearching) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleCategoryClick = (category) => {
    searchParams.delete("keyword");
    setSearchKeyword("");

    if (!category) {
      return navigate("/campsite");
    }

    setSearchParams({ category });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });
    const observerTarget = document.getElementById("observer");
    if (observerTarget) {
      observer.observe(observerTarget);
    }
    return () => {
      if (observerTarget) {
        observer.unobserve(observerTarget);
      }
    };
  }, [loading, isSearching]);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchKeyword) {
      return alert("검색어를 입력해주세요.");
    }
    setIsSearching(true);
    setPage(1);
    setSiteLists([]);
    await searchList(1);
  };

  const searchList = async (pageNumber) => {
    setLoading(true);
    try {
      const searchUrl = new URL(
        `${apiUrl}searchList?MobileOS=${apiOS}&MobileApp=${apiName}&numOfRows=12&serviceKey=${apiKey}&_type=${apiType}&pageNo=${pageNumber}&keyword=${encodeURI(
          searchKeyword
        )}`
      );
      const response = await fetch(searchUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSiteLists((prevData) =>
        pageNumber === 1
          ? data.response.body.items.item
          : [...prevData, ...data.response.body.items.item]
      );
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("Updated siteLists:", siteLists);
  }, [siteLists]);

  useEffect(() => {
    const basedList = async () => {
      setLoading(true);
      try {
        const baseUrl = new URL(
          `${apiUrl}basedList?MobileOS=${apiOS}&MobileApp=${apiName}&numOfRows=12&serviceKey=${apiKey}&pageNo=${page}&_type=${apiType}`
        );
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
        setLoading(false);
        setSiteLists((prevData) =>
          prevData ? [...prevData, ...data.response.body.items.item] : null
        );
      } catch (error) {
        console.error(error);
      }
    };
    if (!isSearching) {
      basedList();
    }
  }, [page, isSearching]);

  return (
    <section className={`mw ${style.campsite}`}>
      <h2 hidden>Campsite</h2>
      <form className="searchBar" onSubmit={handleSearch}>
        <label className="inputArea">
          <input
            type="text"
            placeholder="어디로 갈까요?"
            onChange={handleSearchChange}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </label>
      </form>
      <div className={style.cateGories}>
        <button onClick={() => handleCategoryClick("")}>전체보기</button>
        {REGION_CATEGORY.map((cate) => (
          <button
            key={cate.value}
            onClick={() => handleCategoryClick(cate.label)}
          >
            {cate.label}
          </button>
        ))}
      </div>
      <div className={style.siteAreas}>
        {siteLists ? (
          siteLists.map((site) => {
            return <SiteCard key={site.contentId} site={site} />;
          })
        ) : (
          <div>검색 결과 없음</div>
        )}
      </div>
      {loading ? <Loading /> : null}
      <div id="observer" style={{ height: "20px" }}></div>
    </section>
  );
};

export default Campsite;
