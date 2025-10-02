import Header from "./Header";
import Menu from "./Menu";
import SideBar from "../../components/Sidebar/Sidebar";

function AdminPage() {
  return (
    <>
      <SideBar isMobile={false} />
      <div className="grid grid-cols-8 bg-background pl-16 grid-rows-9 h-dvh w-dvw">
        <Header headerText="Admin Page"></Header>
        <div className="hidden xl:block col-span-1 row-span-8">
          <Menu current=""></Menu>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
