> configuring jangle with a simple object.

---

## Configuration Object

```ts
type JangleCoreConfig = {
  mongo?: {
    content?: MongoUri,
    public?: MongoUri
  },
  secret?: string,
  schemas?: Dict<Schema>,
  user?: {
    email: string,
    password: string
  }
}
```

This is the configuration object that gets passed into the `jangle.start` function.

Here are all the fallbacks, if we decide to leave out configuration details:

```js
{
  mongo: {
    content: 'mongodb://localhost/jangle',
    public: 'mongodb://localhost/jangle-public'
  },
  secret: 'super-secret-secret',
  schemas: {},
  user: undefined
}
```

__Important:__ We should always provide our own `secret` (ideally via environment variable).

---

### `mongo`

__Description:__

Lets Jangle know where to store private and public content.

__Example:__
```js
import jangle from 'jangle-core'

// Pulling connection strings from environment variables.
const mongo = {
  content: process.env.JANGLE_URI,
  public: process.env.JANGLE_PUBLIC_URI
}

jangle.start({ mongo })
  .then(() => console.log('Jangle is ready'))
  .catch(reason => console.error('Jangle failed to start', reason))
```

__Helpful Context:__

- [Using `dotenv` with NodeJS](https://www.npmjs.com/package/dotenv)

---

### `secret`

__Description:__

A secret value that is used to hash passwords, as well as generate JWT user tokens.

__Example:__
```js
import jangle from 'jangle-core'

// Pulling connection strings from environment variables.
const secret = process.env.JANGLE_SECRET

jangle.start({ secret })
  .then(() => console.log('Jangle is ready'))
  .catch(reason => console.error('Jangle failed to start', reason))
```

__Helpful Context:__

- [Using `dotenv` with NodeJS](https://www.npmjs.com/package/dotenv)

---

### `schemas`

__Description:__

An object mapping names to Mongoose Schemas. Used by Jangle to initialize services.

__Example:__
```js
import jangle from 'jangle-core'
import { Schema } from 'mongoose'

const schemas = {
  Author: new Schema({
    name: string
  }),
  Book: new Schema({
    title: string,
    author: { type: Schema.Types.ObjectId, ref: 'Author' }
  })
}

jangle.start({ schemas })
  .then(() => console.log('Jangle is ready'))
  .catch(reason => console.error('Jangle failed to start', reason))
```


### `user`

__Description:__

An optional alternative to [`auth.createInitialAdmin`](/docs/core/authentication), which let's us specify an initial admin user.

Using this option will return the users token after Jangle initializes.

__Example:__
```js
import jangle from 'jangle-core'

// Pulling admin credentials from environment variables.
const user = {
  email: process.env.JANGLE_INITIAL_EMAIL,
  email: process.env.JANGLE_INITIAL_PASSWORD
}

jangle.start({ user })
  .then(({ token }) => console.log("Here's your admin token", token))
  .catch(reason => console.error('Jangle failed to start', reason))
```

__Helpful Context:__

- [Using `dotenv` with NodeJS](https://www.npmjs.com/package/dotenv)
