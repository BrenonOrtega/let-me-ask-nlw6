
import copyImg from "../Assets/images/copy.svg";

export function RoomCode() {

    return (
        <button className="room-code">
            <div>
                <img src={copyImg} alt="copy command"/>
            </div>
            <span>sala dasfdasfasdadsfdsfadfas</span>
        </button>
    )
}