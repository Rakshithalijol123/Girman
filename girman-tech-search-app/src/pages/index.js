import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/results?query=${encodeURIComponent(searchTerm)}`);
    } else {
      alert('Please enter a valid search term');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-white-500">
      {/* Navbar */}
      <nav className="bg-grey-600 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
        <a href="http://girmantech.com" className="flex items-center">
            <Image src="logo.png" alt="Girman Tech" className="h-12 rounded" />
          </a>
          <div className="space-x-4">
          <a href="http://girmantech.com" className="text-blue-500 hover:font-bold">Website</a>
            <a href="https://www.linkedin.com/company/girmantech/" className="text-blue-500 hover:font-bold">LinkedIn</a>
            <a href="mailto:contact@girmantech.com" className="text-blue-500 hover:font-bold">Contact</a>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="container mx-auto p-6">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <Image src="logo.png" alt="Girman Tech" className="h-20 m-2" />
          <input
            type="text"
            placeholder="Search for a user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="mt-4 w-full bg-gradient-to-r from-blue-500 to-gray-300 text-white p-3 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

