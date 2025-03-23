const defaultUserImagePath = '../../public/images/users/defaultUser.png';

const data = {
  users: [
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      password: "password123",
      image: defaultUserImagePath,
      address: "123 Main St, Springfield",
      phone: "123-456-7890",
      isAdmin: false,
      isBanned: false,
    },
    {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      password: "securePass99",
      image: defaultUserImagePath,
      address: "456 Elm St, Metropolis",
      phone: "987-654-3210",
      isAdmin: true,
      isBanned: false,
    },
    {
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      password: "charliePass123",
      image: defaultUserImagePath,
      address: "789 Oak St, Gotham",
      phone: "555-123-4567",
      isAdmin: false,
      isBanned: true,
    },
  ],
};

module.exports = {data};