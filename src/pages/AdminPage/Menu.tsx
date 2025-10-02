import { Link } from "react-router-dom";
import { useDeleteApiAdminClearCache } from "../../api/endpoints/api";

interface MenuProps {
  current: string;
}

function Menu({ current }: MenuProps) {
  const clearCacheQuery = useDeleteApiAdminClearCache();

  return (
    <div className="border-r my-20 border-brown content-center px-5 max-w-72 h-4/5">
      <p className="w-fit mx-auto h-fit font-semibold text-brown">
        <Link to={"/admin/room"}>
          <h2
            className={
              "my-3 hover:brightness-150" +
              (current === "room" ? " brightness-150" : "")
            }
          >
            Room
          </h2>
        </Link>

        <Link to={"/admin/renovation"}>
          <h2
            className={
              "my-3 hover:brightness-150" +
              (current === "renovation" ? " brightness-150" : "")
            }
          >
            Renovation
          </h2>
        </Link>

        <Link to={"/admin/object"}>
          <h2
            className={
              "my-3 hover:brightness-150" +
              (current === "object" ? " brightness-150" : "")
            }
          >
            Object
          </h2>
        </Link>

        <Link to={"/admin/room-permissions"}>
          <h2
            className={
              "my-3 hover:brightness-150" +
              (current === "room permissions" ? " brightness-150" : "")
            }
          >
            Room Permissions
          </h2>
        </Link>
        <Link to={"/admin/renovation-permissions"}>
          <h2
            className={
              "my-3 hover:brightness-150" +
              (current === "renovation permissions" ? " brightness-150" : "")
            }
          >
            Renovation Permissions
          </h2>
        </Link>

        <Link to={"/admin/object-permissions"}>
          <h2
            className={
              "my-3 hover:brightness-150" +
              (current === "object permissions" ? " brightness-150" : "")
            }
          >
            Object Permissions
          </h2>
        </Link>

        <Link to={"/admin/rooms-in-renovations"}>
          <h2
            className={
              "my-3 hover:brightness-150" +
              (current === "rooms in renovations" ? " brightness-150" : "")
            }
          >
            Rooms In Renovations
          </h2>
        </Link>

        <Link to={"/admin/objects-in-renovations"}>
          <h2
            className={
              "my-3 hover:brightness-150" +
              (current === "objects in renovations" ? " brightness-150" : "")
            }
          >
            Objects In Renovations
          </h2>
        </Link>

        <Link to={"/admin/config"}>
          <h2
            className={
              "my-3 hover:brightness-150" +
              (current === "config" ? " brightness-150" : "")
            }
          >
            Config
          </h2>
        </Link>
      </p>
      <div className="w-fit mx-auto">
        <button
          className="text-backgroundComponents mx-auto max-w-44 px-4 my-3 font-semibold py-1 hover:brightness-150 rounded bg-brown"
          onClick={() => {
            clearCacheQuery.mutate();
          }}
        >
          Czyszczenie Cache
        </button>
      </div>
    </div>
  );
}

export default Menu;
