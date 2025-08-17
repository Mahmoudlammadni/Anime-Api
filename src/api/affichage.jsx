import { Link, Links } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add2 } from './action';
import { add } from './action';

import './style.css'
    export default function Aff_anime(props) {
        const dis=useDispatch()
        return (
            
            <div className="pp">
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
                   
        
                    <Link to={`/plusinfo/${props.anime.mal_id}`} onClick={()=>dis(add2(props.anime))}>
                     < button className="btn2">plus d'information</button></Link>
                    </div>
                   
            </div > 
            <button className="btn" onClick={()=>dis(add(props.anime))} style={{width:"100%",display:"none"}}>click</button>

             </div>
        );
    }
    


  