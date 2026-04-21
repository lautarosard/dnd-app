import { useHistory } from "../hooks/useHistory";
import { useNavigate } from "react-router-dom";

function RecentlyViewed() {
  const { history } = useHistory();
  const navigate = useNavigate();

  if (!history.length) return null;

  return (
    <div className="horizontal-scroll">
      {history.map((spell) => (
        <div
          key={spell.index}
          className="card"
          onClick={() => navigate(`/detail/${spell.index}`)}
        >
          <p>{spell.name}</p>
        </div>
      ))}
    </div>
  );
}

export default RecentlyViewed;
