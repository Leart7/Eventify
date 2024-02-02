import { useEffect, useState } from "react";

export function useModalCloser(initialState = false) {
  const [clickedModal, setClickedModal] = useState(initialState);

  const closeOnEscape = (e) => {
    if (e.key === "Escape") {
      setClickedModal(false);
    }
  };

  const closeOnClickOutside = (e) => {
    if (e.target.closest("#layer")) {
      setClickedModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("click", closeOnClickOutside);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("click", closeOnClickOutside);
    };
  }, []);

  useEffect(() => {
    if (clickedModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [clickedModal]);

  return [clickedModal, setClickedModal];
}
