console.log('Sync JS Demo');

const getUser = (username) => {
  const user = users.find(u => u.name === username);
  return user;

  // code to get the user from the server - ajax -- 3 seconds
};

console.log('begin');

const user = getUser('ram');
console.log('  1. user:', user);

console.log('  2. perform some other operation');

console.log('end');
