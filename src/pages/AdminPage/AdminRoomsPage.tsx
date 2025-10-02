import { useGetAdminGetRooms } from "../../api/endpoints/api";
import { useState } from "react";
import DataTableHeader from "./DataTableHeader";
import Paginator from "./Paginator";
import RoomModal from "./RoomModal";
import SideBar from "../../components/Sidebar/Sidebar";
import Header from "./Header";
import Menu from "./Menu";

function AdminRoomsPage() {
  const tableHeaders = ["roomId", "ownerId", "name", "generationDate"];
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orderByAsc, setOrderByAsc] = useState(true);
  const [orderByCol, setOrderByCol] = useState("roomid");
  const [roomIdFilter, setRoomIdFilter] = useState("");
  const [ownerIdFilter, setOwnerIdFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [generationDateFilterUpper, setGenerationDateFilterUpper] =
    useState("");
  const [generationDateFilterLower, setGenerationDateFilterLower] =
    useState("");
  const [editable, setEditable] = useState(-1);
  const [filterFocus, setFilterFocus] = useState("");

  const query = useGetAdminGetRooms({
    page: page,
    pageSize: pageSize,
    orderByAsc: orderByAsc,
    orderBycol: orderByCol,
    roomIdFilter: roomIdFilter,
    ownerIdFilter: ownerIdFilter,
    nameFilter: nameFilter,
    generationDateFilterUpper: generationDateFilterUpper,
    generationDateFilterLower: generationDateFilterLower,
  });

  return (
    <>
      {addModalOpen && (
        <RoomModal
          setIsOpen={setAddModalOpen}
          values={undefined}
          refresh={query.refetch}
        />
      )}
      <SideBar isMobile={false} />
      <div className="grid grid-cols-8 bg-background pl-16 grid-rows-9 h-dvh w-dvw">
        <Header headerText="Room"></Header>
        <div className="hidden xl:block col-span-1 row-span-8">
          <Menu current="room"></Menu>
        </div>
        <div className="col-span-8 xl:col-span-7 row-span-8 px-10 py-20 grid grid-cols-5 rows-12 text-mainColorText overflow-clip">
          <div className="row-span-2 col-span-5 lg:grid grid-cols-5 overflow-scroll hidden ">
            <label className="content-center max-h-6 min-w-28">roomId</label>
            <label className="content-center max-h-6 min-w-28">ownerId</label>
            <label className="content-center max-h-6 min-w-28">name</label>
            <label className="content-center max-h-6 min-w-28">
              generationDate
            </label>
            <button
              className="place-self-end my-5 bg-mainColorText font-bold text-background rounded-md py-1 px-2 row-start-2 col-start-5 max-h-8 hover:brightness-150 w-20 xl:w-36 2xl:w-44"
              onClick={() => setAddModalOpen(true)}
            >
              Dodaj nowy
            </button>
            <input
              value={roomIdFilter}
              autoFocus={filterFocus == "roomId"}
              placeholder="roomId"
              className="text-background my-5 h-1/2 mr-16 rounded-md row-start-2 max-h-8 min-w-28"
              onChange={(e) => {
                setRoomIdFilter(e.target.value);
                setFilterFocus("roomId");
              }}
            />
            <input
              value={ownerIdFilter}
              autoFocus={filterFocus == "ownerId"}
              placeholder="ownerId"
              className="text-background my-5 h-1/2 mr-16 rounded-md row-start-2 max-h-8 min-w-28"
              onChange={(e) => {
                setOwnerIdFilter(e.target.value);
                setFilterFocus("ownerId");
              }}
            />
            <input
              value={nameFilter}
              autoFocus={filterFocus == "name"}
              placeholder="name"
              className="text-background my-5 h-1/2 mr-16 rounded-md row-start-2 max-h-8 min-w-28"
              onChange={(e) => {
                setNameFilter(e.target.value);
                setFilterFocus("name");
              }}
            />
            <div className="row-start-2 flex">
              <input
                autoFocus={filterFocus == "generationLower"}
                type="datetime-local"
                value={generationDateFilterLower}
                className="text-background my-5 h-1/2 mr-8 rounded-md max-h-8 w-5/12 min-w-28"
                onChange={(e) => {
                  setGenerationDateFilterLower(e.target.value);
                  setFilterFocus("generationLower");
                }}
              />
              <input
                autoFocus={filterFocus == "generationUpper"}
                type="datetime-local"
                value={generationDateFilterUpper}
                className="text-background my-5 h-1/2 mr-16 rounded-md max-h-8 w-5/12 min-w-28"
                onChange={(e) => {
                  setGenerationDateFilterUpper(e.target.value);
                  setFilterFocus("generationUpper");
                }}
              />
              <div className="w-1/5"></div>
            </div>
          </div>
          {query.isLoading && (
            <div className="flex w-full h-full text-center place-items-center place-content-center text-xl">
              <p>Trwa wczytywanie danych!</p>
            </div>
          )}
          {query.isError && (
            <div className="flex w-full h-full text-center place-items-center place-content-center text-xl">
              <p>Błąd przy pobieraniu danych! Sprawdź połączenie.</p>
            </div>
          )}
          {query.isFetched && (
            <>
              {query.data != null &&
                query.data != undefined &&
                query.data.returnedObjects != null &&
                query.data.returnedObjects != undefined && (
                  <>
                    {updateModalOpen && (
                      <RoomModal
                        setIsOpen={setUpdateModalOpen}
                        values={query.data?.returnedObjects.at(editable)}
                        refresh={query.refetch}
                      />
                    )}
                    <div className="col-span-5 row-span-9 overflow-auto text-mainColorText">
                      <table className="w-full">
                        <thead className="w-full z-20 sticky top-0 bg-background">
                          <tr className="w-full">
                            {tableHeaders.map((headerName) => (
                              <DataTableHeader
                                key={headerName}
                                name={headerName}
                                onSort={(value: string, sortAsc: boolean) => {
                                  setOrderByCol(value);
                                  setOrderByAsc(sortAsc);
                                }}
                                id={headerName.toLowerCase()}
                                selected={
                                  headerName.toLowerCase() ==
                                  orderByCol.toLowerCase()
                                }
                                sortAsc={
                                  headerName.toLowerCase() ==
                                  orderByCol.toLowerCase()
                                    ? orderByAsc
                                    : false
                                }
                              />
                            ))}
                          </tr>
                        </thead>
                        <tbody className="overflow-auto text-nowrap">
                          {query.data?.returnedObjects.map((object, id) => (
                            <tr
                              key={id}
                              className="w-full min-h-20 h-20 max-h-20 hover:bg-brownlight hover:text-backgroundComponents hover:cursor-pointer"
                              onClick={() => {
                                setEditable(id);
                                setUpdateModalOpen(true);
                              }}
                            >
                              <td className="w-1/4 text-start border-b p-3">
                                <div className="max-w-80 overflow-x-auto">
                                  <p>{object.roomId + ""}</p>
                                </div>
                              </td>

                              <td className="w-1/4 text-start border-b p-3">
                                <div className="max-w-80 overflow-x-auto">
                                  <p>{object.ownerId + ""}</p>
                                </div>
                              </td>

                              <td className="w-1/4 text-start border-b p-3">
                                <div className="max-w-80 overflow-x-auto">
                                  <p>{object.name + ""}</p>
                                </div>
                              </td>

                              <td className="w-1/4 text-start border-b p-3">
                                <div className="max-w-80 overflow-x-auto">
                                  <p>{object.generationDate + ""}</p>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="col-start-1 pt-2 content-end">
                      <select
                        className="w-40 h-8 text-background bg-brownlight font-semibold"
                        name="pageSizes"
                        id="selectPages"
                        defaultValue={pageSize}
                        onChange={(e) => {
                          setPageSize(Number.parseInt(e.target.value));
                        }}
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={query.data.totalCount}>Wszystko</option>
                      </select>
                    </div>

                    <div className="col-span-2 col-start-4 pt-2 content-end">
                      <Paginator
                        pages={
                          query.data.totalPages == undefined
                            ? 1
                            : query.data.totalPages
                        }
                        onChangePage={setPage}
                        startingPage={
                          query.data.currentPage == undefined
                            ? 1
                            : query.data.currentPage
                        }
                      />
                    </div>
                  </>
                )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminRoomsPage;
