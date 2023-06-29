import MyRightHalfCircle from "./MyRightHalfCircle";
import MyLeftHalfCircle from "./MyLeftHalfCircle";

function MyCircle(props) {
    return (
        <div className="App-main-componnents">
            <MyLeftHalfCircle />
            <MyRightHalfCircle />
        </div>
    )
}

export default MyCircle;