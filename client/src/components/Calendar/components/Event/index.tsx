const Event = ({ event }: any) => (
  <div
    className="text-base font-semibold"
    title={`${event.title} - ${event.ambience?.value}`}
  >
    {event.title} - {event.ambience?.value}
  </div>
);

export default Event;
