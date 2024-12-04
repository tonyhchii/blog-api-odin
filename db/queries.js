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

async function findUserByUsername(name) {
  return await pool.user.findFirst({
    where: { username: name },
  });
}

async function findUserByEmail(email) {
  return await pool.user.findFirst({
    where: { email: email },
  });
}

module.exports = {
  createUser,
  findUserById,
  findUserByUsername,
  findUserByEmail,
};
