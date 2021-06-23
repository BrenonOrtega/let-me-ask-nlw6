import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

export function Room() {
  const { user } = useAuth();
  return (
    <div id="page-room">
      <header>
        <div className="content">
          
        </div>
      </header>
    </div>
  );
}