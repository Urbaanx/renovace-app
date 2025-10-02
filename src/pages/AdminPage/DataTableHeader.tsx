import arrow_down from "../../assets/arrow_down.svg";
import arrow_up from "../../assets/arrow_up.svg";

interface DataTableHeaderProps {
  name: string;
  id: string;
  onSort: (value: string, sortByAsc: boolean) => void;
  selected: boolean;
  sortAsc: boolean;
}

function DataTableHeader({
  name,
  id,
  onSort,
  selected,
  sortAsc,
}: DataTableHeaderProps) {
  return (
    <th
      className={
        "min-w-40 text-start border-b p-3 rounded-sm focus:text-brownlight"
      }
      onClick={() => {
        onSort(id, sortAsc ? false : true);
      }}
    >
      <div className="flex hover:text-brownlight hover:cursor-pointer">
        {selected && <img src={!sortAsc ? arrow_up : arrow_down} />}
        <h2 className="overflow-hidden">{name}</h2>
      </div>
    </th>
  );
}

export default DataTableHeader;
