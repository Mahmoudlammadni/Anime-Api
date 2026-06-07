import { useSelector } from "react-redux";
import "../styles/style2.css"

export default function AniInfo() {
    const {plus_info} = useSelector(data => data)
    return (
        <div>
            <h1>{plus_info?.title}</h1>
            <img src={plus_info?.images?.jpg?.image_url} alt={plus_info?.title} />
            <p>{plus_info?.synopsis}</p>
        </div>
    );
}
