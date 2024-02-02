import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";

function Pagination({ totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = +searchParams.get("page") || 1;

  const handlePageChange = (newPage) => {
    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);
      newParams.set("page", newPage);
      return newParams;
    });
  };

  const renderLeftArrow = currentPage > 1;
  const renderRightArrow = currentPage < totalPages;

  return (
    <div className="mx-auto flex items-center gap-x-4">
      {renderLeftArrow && (
        <div
          onClick={() => handlePageChange(currentPage - 1)}
          role="button"
          className="mt-2 flex h-[30px] w-[30px] items-center justify-center rounded-full text-center hover:cursor-pointer hover:bg-stone-100"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
      )}
      <p className="pt-1">
        <span className="font-medium text-blue-600">{currentPage}</span> of{" "}
        {totalPages}
      </p>
      {renderRightArrow && (
        <div
          onClick={() => handlePageChange(currentPage + 1)}
          role="button"
          className="mt-2 flex h-[30px] w-[30px] items-center justify-center rounded-full text-center hover:cursor-pointer hover:bg-stone-100"
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      )}
    </div>
  );
}

export default Pagination;
