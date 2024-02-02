function NoEventsResults() {
  return (
    <div className="z-[-1] -mt-12 flex items-center gap-x-5">
      <p className="text-2xl font-bold" style={{ color: "#1e0a3c" }}>
        Nothing matched your search, but you might like these options.
      </p>
      <img src="noResultsFound.png" className="max-w-[15rem]" />
    </div>
  );
}

export default NoEventsResults;
