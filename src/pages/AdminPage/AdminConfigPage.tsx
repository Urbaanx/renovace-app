import { useGetApiConfig } from "../../api/endpoints/api";
import { useState } from "react";
import DataTableHeader from "./DataTableHeader";
import ConfigModal from "./ConfigModal";
import SideBar from "../../components/Sidebar/Sidebar";
import Header from "./Header";
import Menu from "./Menu";

function AdminConfigPage() {
  const tableHeaders = [
    "name",
    "maxRooms",
    "maxObjects",
    "maxRenovations",
    "maxFrames",
  ];
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [orderByAsc, setOrderByAsc] = useState(true);
  const [orderByCol, setOrderByCol] = useState("objectid");
  const [editable, setEditable] = useState(-1);
  const query = useGetApiConfig();

  return (
    <>
      {addModalOpen && (
        <ConfigModal
          setIsOpen={setAddModalOpen}
          values={undefined}
          refresh={query.refetch}
        />
      )}
      <SideBar isMobile={false} />
      <div className="grid grid-cols-8 bg-background pl-16 grid-rows-9 h-dvh w-dvw">
        <Header headerText="Config"></Header>
        <div className="hidden xl:block col-span-1 row-span-8">
          <Menu current="config"></Menu>
        </div>
        <div className="col-span-8 xl:col-span-7 row-span-8 px-10 py-20 grid grid-cols-5 rows-12 text-mainColorText overflow-clip">
          <div className="row-span-2 col-span-5 lg:grid grid-cols-5 overflow-scroll hidden ">
            <button
              className="place-self-end my-5 bg-mainColorText font-bold text-background rounded-md py-1 px-2 row-start-2 col-start-5 max-h-8 hover:brightness-150 w-20 xl:w-36 2xl:w-44"
              onClick={() => setAddModalOpen(true)}
            >
              Dodaj nowy
            </button>
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
              {query.data != null && (
                <>
                  {updateModalOpen && (
                    <ConfigModal
                      setIsOpen={setUpdateModalOpen}
                      values={query.data.at(editable)}
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
                        {query.data.map((object, id) => (
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
                                <p>{object.name + ""}</p>
                              </div>
                            </td>
                            <td className="w-1/4 text-start border-b p-3">
                              <div className="max-w-80 overflow-x-auto">
                                <p>{object.maxRooms + ""}</p>
                              </div>
                            </td>
                            <td className="w-1/4 text-start border-b p-3">
                              <div className="max-w-80 overflow-x-auto">
                                <p>{object.maxObjects + ""}</p>
                              </div>
                            </td>
                            <td className="w-1/4 text-start border-b p-3">
                              <div className="max-w-80 overflow-x-auto">
                                <p>{object.maxRenovations + ""}</p>
                              </div>
                            </td>{" "}
                            <td className="w-1/4 text-start border-b p-3">
                              <div className="max-w-80 overflow-x-auto">
                                <p>{object.maxFrames + ""}</p>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default AdminConfigPage;
