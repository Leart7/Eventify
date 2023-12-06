import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

function AppLayout() {
  const { searchClicked } = useSelector((store) => store.searchClicked);

  return (
    <>
      {!searchClicked && (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </>
  );
}

export default AppLayout;
