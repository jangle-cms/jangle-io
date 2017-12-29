> getting jangle up and running.

---

### Overview

Jangle takes care of a lot of the details, but sometimes it requires our guidance.

A simple configuration object is how we communicate what makes our project unique:

- `mongo.content` - Where to store our content.
- `mongo.live` - Where to publish live content.
- `secret` - How to safely generate hashes and tokens.
- `schemas` - The types of content we want to store.

---

### `JangleConfig`

Here is the configuration object that Jangle will use during startup:

```ts
type JangleConfig = {
  mongo?: {
    content?: string,
    live?: string
  },
  secret?: string,
  schemas?: Dict<Schema>
}
```

Notice the config properties all end in `?`.

This syntax denotes that the property is optional.

If we decide to leave out configuration details, these defaults will be provided:

```js
{
  mongo: {
    content: 'mongodb://localhost/jangle',
    live: 'mongodb://localhost/jangle-live'
  },
  secret: 'super-secret-secret',
  schemas: {}
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

---

### Return Value

We just saw the configuration for the `jangle.start` function.

This function will return a `Promise`, containing our `JangleCore` object.

Here's what that object looks like:

```ts
type JangleCore = {
  services: Dict<Service<IJangleItem>>
  auth: {
    User: MetaService<IUser>
    signIn: (email: string, password: string) => Promise<Token>
    signUp: (token: string, user: IUser) => Promise<Token>
    createInitialAdmin: (email: string, password: string) => Promise<Token>
    hasInitialAdmin: () => Promise<boolean>
  }
}
```

By default, `JangleCore` object requires a token for each request.

These types might look confusing at first, so let's break them down:

---

### `services`

The `services` property is an object containing all of the schemas and their actions.

These are used to create, find, and update items.

Jangle services also add in the ability to view item history, publish, and restore.

Here is an example of using a `BlogPost` service:

```js
jangle.start({
  user: {
    email: 'ryan@jangle.com',
    password: 'some-password'
  }
})
  .then(({ services }) => {
    const BlogPost = services.BlogPost
    // Get a blog post by id

  })
```

```ts
type JangleConfig = {
  mongo?: {
    content?: string,
    live?: string
  },
  secret?: string,
  schemas?: Dict<Schema>
}
```

Notice the config properties all end in `?`.

This syntax denotes that the property is optional.

If we decide to leave out configuration details, these defaults will be provided:

```js
{
  mongo: {
    content: 'mongodb://localhost/jangle',
    live: 'mongodb://localhost/jangle-live'
  },
  secret: 'super-secret-secret',
  schemas: {}
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

---

Now that we have the big picture, let's take a closer look at [services](/docs/core/services).
