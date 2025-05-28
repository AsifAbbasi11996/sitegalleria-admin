import { useEffect, useState } from 'react';
import { addDestination, getDestinations } from '../api/api';

export default function DestinationManager() {
  const [name, setName] = useState('');
  const [destinations, setDestinations] = useState([]);

  const fetchDestinations = async () => {
    const res = await getDestinations();
    setDestinations(res.data);
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDestination({ destinationName: name });
    setName('');
    fetchDestinations();
  };

  return (
    <div className="p-6 py-3">
      <h1 className="text-xl font-bold mb-4">Manage Destinations</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          placeholder="Destination Name"
        />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer">Add Destination</button>
      </form>
      <ul className="mt-6 flex flex-wrap items-center gap-3">
        {destinations.map((d) => (
          <li key={d._id} className="p-2 border rounded">{d.destinationName}</li>
        ))}
      </ul>
    </div>
  );
}
