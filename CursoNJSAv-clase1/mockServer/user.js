function getNewUser() {
  let user = {
    name: Math.random(),
    edad:Math.random(),
  }
  return user;
}
module.exports = {
  getNewUser
}