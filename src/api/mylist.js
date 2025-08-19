import { useSelector } from "react-redux";
import Aff_anime from "./affichage";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { add2 } from "./action";
import "./style.css"
export default function Mylist() {
    const my_list=useSelector(data=>data.mylist)
    const buttonStyle = {
        backgroundColor: " rebeccapurple",
        color: "orange",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        fontWeight:"bold",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      };
const dis=useDispatch()
    return(
        <div className="anime-grid">
            {
             my_list.map((p)=>{
                    return (
                        <div className="pp">
                        <div className="anca" >
                            <img 
                                src={p.images.jpg.image_url}
                                alt={p.title}
                                className="aim"
                            />
                            <div className="adet">
                                <h3 className="at">{p.title}</h3>
                                <p className="as">Source: {p.source}</p>
                                <p className="asc">Score: {p.score}</p>
                                <p className="ae">Episodes: {p.episodes}</p>
                                <p className="ae">rating: {p.rating}</p>
                               
                    
                                <Link to={`/plusinfo/${p.mal_id}`} onClick={()=>dis(add2(p))}>
                                 < button className="btn2">plus d'information</button></Link>
                                </div>
                               
                        </div >             
                         </div>
                    );

                })
            }

        </div>
    )
    
    
}