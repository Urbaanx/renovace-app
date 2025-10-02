import { useGetAdminGetObjectsPermissions } from "../../api/endpoints/api";
import { useState } from "react";
import DataTableHeader from "./DataTableHeader";
import Paginator from "./Paginator";
import ObjectPermissionsModal from "./ObjectPermissionsModal";
import SideBar from "../../components/Sidebar/Sidebar";
import Header from "./Header";
import Menu from "./Menu";

function AdminObjectPermissionPage() {
  const tableHeaders = ["objectId", "userId", "renovationOnly", "canEdit"];
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orderByAsc, setOrderByAsc] = useState(true);
  const [orderByCol, setOrderByCol] = useState("objectid");
  const [objectIdFilter, setObjectIdFilter] = useState("");
  const [canEditFilter, setCanEditFilter] = useState(true);
  const [renovationOnlyFilter, setRenovationOnlyFilter] = useState(true);
  const [userIdFilter, setUserIdFilter] = useState("");
  const [editable, setEditable] = useState(-1);
  const [filterFocus, setFilterFocus] = useState("");

  const query = useGetAdminGetObjectsPermissions({
    page: page,
    pageSize: pageSize,
    orderByAsc: orderByAsc,
    orderByCol: orderByCol,
    objectIdFilter: objectIdFilter,
    canEditFilter: canEditFilter,
    userIdFilter: userIdFilter,
  });

  return (
    <>
      {addModalOpen && (
        <ObjectPermissionsModal
          setIsOpen={setAddModalOpen}
          values={undefined}
          refresh={query.refetch}
        />
      )}
      <SideBar isMobile={false} />
      <div className="grid grid-cols-8 bg-background pl-16 grid-rows-9 h-dvh w-dvw">
        <Header headerText="Object Permissions"></Header>
        <div className="hidden xl:block col-span-1 row-span-8">
          <Menu current="object permissions"></Menu>
        </div>
        <div className="col-span-8 xl:col-span-7 row-span-8 px-10 py-20 grid grid-cols-5 rows-12 text-mainColorText overflow-clip">
          <div className="row-span-2 col-span-5 lg:grid grid-cols-5 overflow-scroll hidden ">
            <label className="content-center max-h-6 min-w-28">objectId</label>
            <label className="content-center max-h-6 min-w-28">userId</label>
            <label className="content-center max-h-6 min-w-28">
              renovationOnly
            </label>
            <label className="content-center max-h-6 min-w-28">canEdit</label>
            <button
              className="place-self-end my-5 bg-mainColorText font-bold text-background rounded-md py-1 px-2 row-start-2 col-start-5 max-h-8 hover:brightness-150 w-20 xl:w-36 2xl:w-44"
              onClick={() => setAddModalOpen(true)}
            >
              Dodaj nowy
            </button>
            <input
              value={objectIdFilter}
              autoFocus={filterFocus == "objectId"}
              placeholder="objectId"
              className="text-background my-5 h-1/2 mr-16 rounded-md row-start-2 max-h-8 min-w-28"
              onChange={(e) => {
                setObjectIdFilter(e.target.value);
                setFilterFocus("objectId");
              }}
            />
            <input
              value={userIdFilter}
              autoFocus={filterFocus == "userId"}
              placeholder="userId"
              className="text-background my-5 h-1/2 mr-16 rounded-md row-start-2 max-h-8 min-w-28"
              onChange={(e) => {
                setUserIdFilter(e.target.value);
                setFilterFocus("userId");
              }}
            />
            <input
              checked={renovationOnlyFilter}
              autoFocus={filterFocus == "renovationOnly"}
              type="checkbox"
              className="my-5 h-1/2 row-start-2 max-h-8 w-8 place-self-start"
              onChange={(e) => {
                setRenovationOnlyFilter(e.target.checked);
                setFilterFocus("renovationOnly");
              }}
            />
            <input
              checked={canEditFilter}
              autoFocus={filterFocus == "canEdit"}
              type="checkbox"
              className="my-5 h-1/2 row-start-2 max-h-8 w-8 place-self-start"
              onChange={(e) => {
                setCanEditFilter(e.target.checked);
                setFilterFocus("canEdit");
              }}
            />
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
                      <ObjectPermissionsModal
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
                                  <p>{object.objectId + ""}</p>
                                </div>
                              </td>

                              <td className="w-1/4 text-start border-b p-3">
                                <div className="max-w-80 overflow-x-auto">
                                  <p>{object.userId + ""}</p>
                                </div>
                              </td>

                              <td className="w-1/4 text-start border-b p-3">
                                <div className="max-w-80 overflow-x-auto">
                                  <p>{object.renovationOnly + ""}</p>
                                </div>
                              </td>

                              <td className="w-1/4 text-start border-b p-3">
                                <div className="max-w-80 overflow-x-auto">
                                  <p>{object.canEdit + ""}</p>
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

export default AdminObjectPermissionPage;
