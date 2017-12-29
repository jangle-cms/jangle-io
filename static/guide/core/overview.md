> a lightweight layer of javascript services.

---

### Before We Start

Let's make sure the following dependencies are ready to go:

- [NodeJS](https://nodejs.org/en/download/) - Runs our application

- [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) - Stores our content

### Getting Started

1. First, install `jangle-core` and `mongoose`:

```shell
npm install --save jangle-core mongoose
```

2. Next, create an `app.js` file with the following code:

```js
const jangle = require('jangle-core')
const { Schema } = require('mongoose')

const jangleConfig = {
  // 1. Define your Mongoose schemas.
  schemas: {
    Puppy: new Schema({
      name: String,
      owner: String
    })
  },
  // 2. Define an initial user.
  user: {
    email: 'ryan@jangle.com',
    password: 'password'
  }
}

// 3. Initialize Jangle.
jangle
  .start(jangleConfig)
  .then(({ services }) =>
    // 4. Create your first item!
    services.Puppy
      .create({
        name: 'Jangle',
        owner: 'Ryan'
      })
      .then(puppy => {
        console.log(puppy)
      })
  )
```

3.  In a terminal, run `node app.js`.

    We should see the following output:

```js
{
  _id: '<jangles-id>',
  name: 'Jangle',
  owner: 'Ryan',
  jangle: {
    version: 1,
    status: 'visible',
    created: {
      by: '<our-users-id>',
      at: '<timestamp from a few seconds ago>'
    },
    updated: {
      by: '<our-users-id>',
      at: '<timestamp from a few seconds ago>'
    },
  }
}
```

---

__Great Job!__ In the next section, we'll take a look at [Configuration](/docs/core/configuration)
