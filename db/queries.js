const pool = require("./pool");

async function createUser(username, password, email) {
  await pool.user.create({
    data: {
      username,
      password,
      email,
    },
  });
}

module.exports = { createUser };
