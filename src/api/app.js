
import { useState, useEffect } from "react"; 
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Home_an from "./all"; 
import Ani_info from "./ani_infor"; 
import Nav from "./nav"; 
import Mylist from "./mylist"; 
import Genre_an from "./genre"; 
import Airing from "./airing"; 
import Upcoming from "./upcoming"; 
import Popular2 from "./popular2"; 

export default function Anime() { 
  const [anime, setanime] = useState([]); 
  const [page, setpage] = useState(1); 


  useEffect(() => { 
    fetch(`https://api.jikan.moe/v4/anime?page=${page}`)
      .then((r) => { 
        if (!r.ok) { 
          throw new Error(`HTTP error! Status: ${r.status}`); 
        } 
        return r.json(); 
      })
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
    <BrowserRouter> 
      <Nav /> 
      <Routes> 
        <Route path="/" element={<Home_an animeData={anime} />} /> 
        <Route path="/mylist" element={<Mylist />} /> 
        <Route path="/genres" element={<Genre_an animeData={anime} />} /> 
        <Route path="/pop" element={<Popular2 animeData={anime} />} /> 
        <Route path="/ar" element={<Airing animeData={anime} />} /> 
        <Route path="/up" element={<Upcoming animeData={anime} />} /> 
        <Route path="/plusinfo/:id" element={<Ani_info />} /> 
      </Routes> 
    </BrowserRouter> 
  ); 
}
