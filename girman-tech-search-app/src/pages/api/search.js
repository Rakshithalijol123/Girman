// Import the user list JSON data
import users from '../data/user_list.json';

export default function handler(req, res) {
  const { query } = req.query;

  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Please enter a valid search term' });
  }
  const searchTerm = query.toLowerCase();

  const filteredUsers = users.filter((user) => 
    user.first_name.toLowerCase().includes(searchTerm) || 
    user.last_name.toLowerCase().includes(searchTerm)
  );

  if (filteredUsers.length === 0) {
    return res.status(404).json({ message: 'No results found' });
  }

  return res.status(200).json(filteredUsers);
}
