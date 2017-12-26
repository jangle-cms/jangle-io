> a lightweight layer of javascript services.

---

## Before We Start

Let's make sure the following dependencies are ready to go:

- [NodeJS](https://nodejs.org/en/download/) - Runs our application

- [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) - Stores our content

## Getting Started

1. First, install `jangle-core` and `mongoose`:

```shell
npm install --save jangle-core mongoose
```

2. Next, create an `app.js` file with the following code:

```js
const jangle = require('jangle-core')
const { Schema } = require('mongoose')

// 1. Define your Mongoose Schemas.
const schemas = {
  Puppy: new Schema({
    name: String,
    owner: String
  })
}

// 2. Define an initial user.
const user = {
  email: 'ryan@jangle.com',
  password: 'password'
}

// 3. Let Jangle automatically generate services.
jangle.start({ schemas, user })
  .then(({ services, token }) =>
    services.content.Puppy
      .create(token, {
        name: 'Jangle',
        owner: 'Ryan'
      })
      .then(console.log)
  )
  .catch(console.error)
```

3. In a terminal, run `node app.js`. We should see the following output:

```shell
{
  _id: '<some mongo id>',
  name: 'Jangle',
  owner: 'Ryan',
  jangle: {
    version: 1,
    status: 'visible',
    created: {
      by: '<our users mongo id>',
      at: '<timestamp from a few seconds ago>'
    },
    updated: {
      by: '<our users mongo id>',
      at: '<timestamp from a few seconds ago>'
    },
  }
}
```
