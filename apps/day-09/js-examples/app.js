console.log('Async with Promises Demo');

// ES6
const getUser = (username) => {
  console.log('getUser() started..');

  return new Promise((resolve, reject) => {
    // code to get the user from the server - ajax -- 4 seconds
    setTimeout(() => {
      const user = users.find(u => u.name === username);
      if (user) {
        resolve(user);
      } else {
        reject('User not found.');
      }
    }, 4000);
  });
};

console.log('*** begin ***');

getUser('ram1')
  .then((user) => {
    console.log('Success - user:', user);
  })
  .catch((error) => {
    console.log('Error:', error);
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
