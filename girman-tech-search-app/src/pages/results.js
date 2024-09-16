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
        .catch((err) => setError(&quot;Failed to fetch data.&quot;));
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
    return <div className=&quot;text-red-500 text-center p-4&quot;>{error}</div>;
  }

  return (
    <div className=&quot;min-h-screen bg-gray-100 p-6&quot;>
      <h1 className=&quot;text-2xl font-bold mb-4 text-center&quot;>Search Results for &quot;{query}&quot;</h1>
      <div className=&quot;grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6&quot;>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className=&quot;bg-white p-4 rounded-lg shadow-lg flex flex-col&quot;>
              <Image
                src={user.profile_picture || &quot;pic.jpg&quot;}
                alt={`${user.first_name} ${user.last_name}`}
                className=&quot;w-16 h-16 rounded-full mb-4 mx-auto&quot;
              />
              <h2 className=&quot;text-xl font-semibold text-center mb-2&quot;>{user.first_name} {user.last_name}</h2>
              <div className=&quot;flex items-center justify-center mb-2&quot;>
                <i className=&quot;fas fa-map-marker-alt text-blue-500 mr-2&quot;></i>
                <p>{user.city}</p>
              </div>
              <div className=&quot;flex items-center justify-center mb-4&quot;>
                <i className=&quot;fas fa-phone-alt text-green-500 mr-2&quot;></i>
                <p>{user.contact_number}</p>
              </div>
              <button
                onClick={() => openPopup(user)}
                className=&quot;mt-auto bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500&quot;
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <div className=&quot;flex flex-col items-center justify-center min-h-[300px]&quot;>
            <Image
              src=&quot;/images/no-results.png&quot;
              alt=&quot;No-Results&quot;
              className=&quot;w-48 h-auto&quot;
            />
            <p className=&quot;mt-4 text-gray-600&quot;>No results found</p>
          </div>
        )}
      </div>

      {isPopupOpen && <Popup user={selectedUser} onClose={closePopup} />}
    </div>
  );
}

