import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { animeService } from "./services/jikanApi";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import AniInfo from "./pages/AniInfo";
import Nav from "./components/Nav";
import MyList from "./pages/MyList";
import Genre from "./pages/Genre";
import Airing from "./pages/Airing";
import Upcoming from "./pages/Upcoming";
import Popular from "./pages/Popular";
import Latest from "./pages/Latest";
import AnimeDetails from "./pages/AnimeDetails";
import ScrollToTop from "./components/ScrollToTop";

export default function Anime() {
  const [anime, setanime] = useState([]);
  const [page, setpage] = useState(1);

  useEffect(() => {
    animeService.getList(page)
      .then((d) => {
        if (d.data) {
          setanime((prev) => [...prev, ...d.data]);
        } else {
          console.error("No 'data' field in the response:", d);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [page]);

  const handleScroll = () => {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
      setpage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Nav />
        <div className="page-wrapper">
          <Routes>
            <Route path="/" element={<Home animeData={anime} />} />
            <Route path="/mylist" element={<MyList />} />
            <Route path="/genres" element={<Genre animeData={anime} />} />
            <Route path="/pop" element={<Popular animeData={anime} />} />
            <Route path="/ar" element={<Airing animeData={anime} />} />
            <Route path="/up" element={<Upcoming animeData={anime} />} />
            <Route path="/latest" element={<Latest />} />
            <Route path="/plusinfo/:id" element={<AniInfo />} />
            <Route path="/anime/:id" element={<AnimeDetails />} />
          </Routes>
        </div>
        <ScrollToTop />
      </BrowserRouter>
    </ThemeProvider>
  );
}
