import React from 'react';
import Image from 'next/image';

const Popup = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Close"
        >
          Close
        </button>

        {/* User Details */}
        <div className="flex items-center mb-4">
          <Image
            src={user.profile_picture || 'pic.jpg'}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold">{user.first_name} {user.last_name}</h2>
            <p className="text-gray-600 flex items-center">
              <i className="fas fa-map-marker-alt text-blue-500 mr-2"></i>
              {user.city}
            </p>
            <p className="text-gray-600 flex items-center">
              <i className="fas fa-phone-alt text-green-500 mr-2"></i>
              {user.contact_number}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{user.bio || 'No additional information available.'}</p>
      </div>
    </div>
  );
};

export default Popup;
