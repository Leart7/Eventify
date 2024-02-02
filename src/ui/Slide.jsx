function Slide({ img, title, upcomingNumber, description }) {
  return (
    <div className="flex flex-col gap-y-2 hover:cursor-pointer">
      <img src={img} />
      <h2 className="mt-5 text-lg font-semibold">{title}</h2>
      <div className="flex items-center gap-x-2">
        <img src="/eventifyIcon.png" className="w-8" /> <span>Eventify</span>
      </div>
      <p className="font-bold text-orange-500">
        {upcomingNumber} upcoming events
      </p>
      <p className="h-16 overflow-hidden text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}

export default Slide;
