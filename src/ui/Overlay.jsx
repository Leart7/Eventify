function Overlay({ zIndex }) {
  const overlayClasses = `hover:cursor-default overlay fixed inset-0 bg-black bg-opacity-50 ${
    zIndex ? `z-[${zIndex}]` : "z-[499999]"
  }`;

  return <div id="layer" role="button" className={overlayClasses}></div>;
}

export default Overlay;
