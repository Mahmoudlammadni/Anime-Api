

import { useState, useEffect } from "react";
import Aff_anime from "./affichage";
    
export default function Popular2() {
  const [anime, setanime] = useState([]);

  useEffect(()=>{
    fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity`) 
    .then((d)=>d.json())
    .then((d)=>setanime((d.data)))

  } ,[])
 

  return (
    <div className="anime-grid">
            {
             anime.filter((o)=> o.rating && 
                o.rating !== "R - 17+ (violence & profanity)" &&
                o.rating !== "R+ - Mild Nudity" &&
                o.rating !== "Rx - Hentai" &&
                o.rating !== "OVA"
          )
                .map((p)=>{
                    return (
                        <div  >
                           
                            <Aff_anime anime={p} />

                                 
                        </div>
                    );

                })
            }

        </div>
    
  );
}
