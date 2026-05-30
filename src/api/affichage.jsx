import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add2 } from './action';
import { add } from './action';

import './style.css'
    export default function Aff_anime(props) {
        const dis=useDispatch()
        const navigate = useNavigate()
        const id = props.anime.mal_id
        return (
            
            <div className="pp" onClick={() => navigate(`/anime/${id}`)} style={{cursor: 'pointer'}}>
            <div className="anca" >
                <img 
                    src={props.anime.images.jpg.image_url}
                    alt={props.anime.title}
                    className="aim"
                />
                <div className="adet">
                    <h3 className="at">{props.anime.title}</h3>
                    <p className="as">Source: {props.anime.source}</p>
                    <p className="asc">Score: {props.anime.score}</p>
                    <p className="ae">Episodes: {props.anime.episodes}</p>
                    <p className="ae">rating: {props.anime.rating}</p>
                   
                    <button className="btn2" onClick={(e) => { e.stopPropagation(); dis(add2(props.anime)); navigate(`/anime/${id}`); }}>plus d'information</button>
                    </div>
                   
            </div > 
            <button className="btn" onClick={(e) => {e.stopPropagation(); dis(add(props.anime));}} style={{width:"100%",display:"none"}}>click</button>

             </div>
        );
    }
    

   

