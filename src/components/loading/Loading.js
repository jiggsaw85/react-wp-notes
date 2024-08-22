import "./index.scss";
import LoadingGif from "../../images/loading.gif"

export default function Loading() {
    return (
        <div className="loading">
            <img width={100} src={LoadingGif} alt="Loading" />
        </div>
    )
}