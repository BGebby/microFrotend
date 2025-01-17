import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Person } from '../Models/person';
import { api } from '../services/service.person';

interface PersonListProps {
  refresh: number;
}

export function PersonList({ refresh }: PersonListProps) {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        setLoading(true);
        const data = await api.getPersons();
        setPersons(data);
      } catch (error) {
        toast.error('Failed to load persons');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersons();
  }, [refresh]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Registered Persons</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200  border border-transparent rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-gray-100  border border-transparent rounded-md	text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 border-gray-100  border border-transparent rounded-md	text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 border-gray-100  border border-transparent rounded-md	text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 border-gray-100  border border-transparent rounded-md	text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 border border-transparent rounded-md	">
            {persons.map((person) => (
              <tr key={person.id}>
                <td className="px-6 py-4 border-gray-100 border border-transparent rounded-md whitespace-nowrap">
                  {person.first_name} {person.last_name}
                </td>
                <td className="px-6 py-4 border-gray-100  border rounded-md  whitespace-nowrap">{person.email}</td>
                <td className="px-6 py-4 border-gray-100  border rounded-md  whitespace-nowrap">{person.age}</td>
                <td className="px-6 py-4 border-gray-100  border rounded-md  whitespace-nowrap">{person.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}