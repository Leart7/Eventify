import { useState, useEffect, useRef } from "react";

export function useDropdown(initialState = false, closeOnOutsideClick = true) {
  const [isOpen, setIsOpen] = useState(initialState);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        closeOnOutsideClick &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeOnOutsideClick]);

  return { isOpen, setIsOpen, dropdownRef };
}
