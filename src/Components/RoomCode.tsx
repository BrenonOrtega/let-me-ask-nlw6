import copyImg from "../Assets/images/copy.svg";
import "../styles/RoomCode.scss";

type RoomCodeProps = {
  code: string;
};
export function RoomCode(props: RoomCodeProps) {
  const copyRoomCode = () => navigator.clipboard.writeText(props.code);

  return (
    <button className="room-code" onClick={copyRoomCode}>
      <div>
        <img src={copyImg} alt="copy command" />
      </div>
      <span>sala {props.code}</span>
    </button>
  );
}
