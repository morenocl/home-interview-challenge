const Users = require("./models").User;

const checkUser = (body) =>  {
  Users.find({username: body.username, password: body.password})
    .then((users) => {
      console.log('Correct login: ', 1 === users.length)
    })
}

const registerUser = (body) => {
  Users.create(body)
}

const handlerMongo = (path, body) => {
    switch (path) {
      case '/login':
          checkUser(body)
        break
      case '/register':
          registerUser(body)
        break
      default:
    }
}

module.exports = handlerMongo
