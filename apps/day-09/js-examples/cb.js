console.log('Async with Callbacks Demo');

const getUser = (username, cb) => {
  console.log('getUser() started..');

  // code to get the user from the server - ajax -- 4 seconds
  setTimeout(() => {
    const user = users.find(u => u.name === username);
    if (user) {
      cb(null, user);
    } else {
      cb('User not found.', null);
    }
  }, 4000);

  // return undefined
};

console.log('*** begin ***');

getUser('ram1', (error, user) => {
  if (error) {
    console.log('Error:', error);
    return;
  }

  console.log('Success - user:', user);
});

console.log('perform some other operation');

console.log('*** end ***');

  // Nested callback
  // getPosts(user.id, (error, posts) => {
  //    if(error) {
  //      console.log('Error:', error);
  //      return;
  //    } 
  //
  //    console.log('  Success - posts:', posts);
  // })
