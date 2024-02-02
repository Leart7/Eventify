import SearchModalLayout from "../features/SearchModal/SearchModalLayout";

function SearchPage({ setClickedModal, clickedModal }) {
  return (
    <div
      className={`animateOpenModal fixed bottom-0 left-0 right-0 top-0 z-[5000000] h-screen w-full overflow-y-auto bg-white  lg:-translate-x-0 lg:-translate-y-0 lg:transform`}
    >
      <SearchModalLayout setClickedModal={setClickedModal} />
    </div>
  );
}

export default SearchPage;
