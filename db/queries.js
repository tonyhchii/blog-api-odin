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

async function findUserById(userId) {
  return await pool.user.findFirst({
    where: { id: userId },
  });
}

module.exports = { createUser, findUserById };
