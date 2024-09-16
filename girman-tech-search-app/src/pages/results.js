import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Popup from '../components/Popup';
import Image from 'next/image';

export default function Results() {
  const router = useRouter();
  const { query } = router.query;
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (query) {
      fetch(`http://localhost:8000/users/search/?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.detail) {
            setError(data.detail);
            setUsers([]);
          } else {
            setUsers(data);
            setError();
          }
        })
        .catch((err) => setError("Failed to fetch data."));
    }
  }, [query]);

  const openPopup = (user) => {
    setSelectedUser(user);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedUser(null);
    setIsPopupOpen(false);
  };

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
              <Image
                src={user.profile_picture || "pic.jpg"}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-16 h-16 rounded-full mb-4 mx-auto"
              />
              <h2 className="text-xl font-semibold text-center mb-2">{user.first_name} {user.last_name}</h2>
              <div className="flex items-center justify-center mb-2">
                <i className="fas fa-map-marker-alt text-blue-500 mr-2"></i>
                <p>{user.city}</p>
              </div>
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-phone-alt text-green-500 mr-2"></i>
                <p>{user.contact_number}</p>
              </div>
              <button
                onClick={() => openPopup(user)}
                className="mt-auto bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <Image
              src="/images/no-results.png"
              alt="No-Results"
              className="w-48 h-auto"
            />
            <p className="mt-4 text-gray-600">No results found</p>
          </div>
        )}
      </div>

      {isPopupOpen && <Popup user={selectedUser} onClose={closePopup} />}
    </div>
  );
}

