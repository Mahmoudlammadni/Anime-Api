import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./style2.css"


export default function Ani_info() {
    const {id}=useParams()
    const info = useSelector(data=>data.plus_info)
    console.log(info)
    
    return (
        <div className="agrid">
          {info.map((p, i) => {
            return (
              <div className="anime-details-container" key={i}>
                <div className="anime-header">
                  <img
                    src={p.images.jpg.image_url}
                    alt={p.title}
                    className="anime-poster"
                  />
                  <div className="anime-info">
                    <h1>{p.title}</h1>
                    <p>
                      <strong>Source:</strong> {p.source}
                    </p>
                    <p>
                      <strong>Score:</strong> {p.score}
                    </p>
                    <p>
                      <strong>Episodes:</strong> {p.episodes}
                    </p>
                    <p>
                      <strong>Rating:</strong> {p.rating}
                    </p>
                    <p>
                      <strong>Type:</strong> {p.type}
                    </p>
                    <p>
                      <strong>Genres:</strong>{" "}
                      {p.genres.map((g) => g.name).join(", ")}
                    </p>
                    {p.studios?.length > 0 && (
                      <p>
                        <strong>Director:</strong>{" "}
                        {p.studios.map((studio) => studio.name).join(", ")}
                      </p>
                    )}
                  </div>
                </div>
      
                <div className="anime-synopsis">
                  <h2>Synopsis</h2>
                  <p>{p.synopsis}</p>
                </div>
      
                {p.trailer.embed_url && (
                  <div className="anime-trailer">
                    <h2>Watch Trailer</h2>
                    <iframe
                      width="560"
                      height="315"
                      src={p.trailer.embed_url}
                      title="Anime Trailer"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
      
    
   
    
}