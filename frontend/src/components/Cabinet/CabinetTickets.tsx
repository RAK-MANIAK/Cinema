import { useEffect, useState } from 'react';
import { ITicket } from '../../Interfaces';
import axios from 'axios';

const CabinetTickets = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [active, setActive] = useState<ITicket[]>([]);
  const [old, setOld] = useState<ITicket[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/v1/tickets/my?booking=');
        setTickets(response.data.data.data);
        setTickets(prev =>
          prev.sort(
            (a, b) =>
              new Date(a.showtime.time.start).getTime() -
              new Date(b.showtime.time.start).getTime()
          )
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    setActive(
      tickets.filter(
        ticket => new Date(ticket.showtime.time.end).getTime() >= Date.now()
      )
    );
    setOld(
      tickets.filter(
        ticket => new Date(ticket.showtime.time.end).getTime() < Date.now()
      )
    );
  }, [tickets]);

  return (
    <div>
      <h1>Active tickets</h1>
      {JSON.stringify(active)}
    </div>
  );
};

export default CabinetTickets;
