import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDropdown } from "../../hooks/useDropdown";
import Overlay from "../../ui/Overlay";
import Sidebar from "./Sidebar";

function ContactInfo() {
  const { isOpen, setIsOpen, dropdownRef } = useDropdown(false, true);

  return (
    <>
      <div className="flex items-center gap-x-2 border-b px-2 pb-2 shadow-md lg:hidden ">
        <div
          role="button"
          onClick={() => setIsOpen(true)}
          className="rounded-full px-3 py-2 hover:cursor-pointer hover:bg-stone-100 lg:hidden"
          ref={dropdownRef}
        >
          <FontAwesomeIcon icon={faBars} />
          {isOpen && <Sidebar />}
        </div>
        <h2 className="mb-1 text-2xl capitalize" style={{ color: "#1e0a3c" }}>
          {window.location.pathname === "/account-settings"
            ? "Contact Info"
            : window.location.pathname.split("/")[2].split("-").join(" ")}
        </h2>
      </div>
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      {isOpen && <Overlay zIndex={10} />}
    </>
  );
}

export default ContactInfo;
