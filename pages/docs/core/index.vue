<template lang="md">### `start`
> (config?: [Config](/docs/core#config)) => Promise<[ProtectedJangleCore](/docs/core#protectedjanglecore)>

__Description:__

Starts an instance of Jangle, returning an object containing protected services.

__Parameters:__

- `config` - [`Config`](/docs/core#config) (Optional)

__Returns:__

A [`ProtectedJangleCore`](/docs/core#protectedjanglecore) object, containing services and authentication helpers.

All protected routes will require an authentication token.

__Example:__
```js
const Jangle = require('jangle-core')

Jangle.start()
  .then(({ services, auth }) => {
    // ... access `services` and `auth`
  })
  .catch(reason => {
    // ... handle initialization errors.
  })
```

---

### `startAsUser`
> (user: [UserConfig](/docs/core#userconfig), config?: [Config](/docs/core#config)) => Promise<[JangleCore](/docs/core#janglecore)>

__Description:__

Starts an instance of Jangle, authenticated with the provided user.

__Parameters:__

- `user` - [`UserConfig`](/docs/core#userconfig)

- `config` - [`Config`](/docs/core#config) (Optional)

__Returns:__

A new [`JangleCore`](/docs/core#janglecore) object, containing services and authentication helpers.

The [`JangleCore`](/docs/core#janglecore) object does not require any authentication tokens.

It will use the provided user for all protected requests.

__Example:__
```js
const Jangle = require('jangle-core')

Jangle.startAsUser({
  email: 'ryan@jangle.com',
  password: 'password'
})
  .then(({ services, auth }) => {
    // ... access `services` and `auth`
  })
  .catch(reason => {
    // ... handle initialization errors.
  })
```

---

### `Config`

```ts
type Config = {
  mongo: {
    content: string
    live: string
  }
  secret: string
  schemas: Dict<Schema>
}
```

__Description:__

The configuration object that Jangle uses on startup.

- `mongo.content` - The MongoDB URI for storing our private content and Jangle metadata.
- `mongo.live` - The MongoDB URI for storing our public items.
- `secret` - The secret used to hash passwords and generate authentication tokens.
- `schemas` - An object mapping model names to our Mongoose Schemas.

__Example:__
```js
import { Schema } from 'mongoose'

const config = {

  mongo: {
    content: 'mongodb://localhost/jangle',
    live: 'mongodb://localhost/jangle-live'
  },

  // Important: Use an environment variable for this!
  secret: 'some very secret thing',

  schemas: {
    Person: new Schema({
      name: {
        required: true,
        type: String
      },
      age: Number
    }),
    BlogPost: new Schema({
      title: {
        required: true,
        type: String
      },
      author: {
        ref: 'Person',
        required: true,
        type: Schema.ObjectId
      }
    })
  }

}
```

__Helpful Context__:

- [`Schema`](http://mongoosejs.com/docs/guide.html) - Used in the `schemas` property.

- [`start`](/docs/core#start) - Uses this configuration.

- [`startAsUser`](/docs/core#startasuser) - Uses this configuration.

---


### `UserConfig`

```ts
type UserConfig = {
  email: string
  password: string
}
```

__Description:__

The Jangle user credentials to use for the application. (Used in [`startAsUser`](/docs/core#startasuser))

- `email` - The MongoDB URI for storing our private content and Jangle metadata.
- `password` - The secret used to hash passwords and generate authentication tokens.

__Example:__
```js
const userConfig = {
  email: 'ryan@jangle.com',
  password: 'password'
}
```

__Helpful Context__:

- [`startAsUser`](/docs/core#startasuser) - Uses this configuration.

---


### `ProtectedJangleCore`

```ts
type ProtectedJangleCore = {
  services: Dict<ProtectedService<IJangleItem>>
  auth: Authorization<ProtectedMetaService>
}
```

__Description:__

The object containing [protected services](/docs/core#protectedservice) and the [authorization service](/docs/core#auth).

- `services` - An object mapping our schemas to their dynamically generated functions.
- `auth` - An object containing a protected [`JangleUser`](/docs/core#jangleuser) service and helpful functions for user authentication.

__Example:__
```js
const jangle = require('jangle-core')

jangle.start()
  .then(core => {
    console.log("All protected services: ", core.services)
    console.log("Our authentication helpers: ", core.auth)
  })
```

__Helpful Context__:

- [`start`](/docs/core#start) - Returns this object in a `Promise`.

- [`ProtectedService`](/docs/core#protectedservice) - the type of service on the `services` property.

- [`Authorization`](/docs/core#authorization) - the type for the `auth` property.

- [`ProtectedMetaService`](/docs/core#protectedmetaservice) - the type for the `auth.User` service.

- [`JangleCore`](/docs/core#janglecore) - the authenticated version of this type.


---

### `JangleCore`

```ts
type JangleCore = {
  services: Dict<Service<IJangleItem>>
  auth: Authorization<MetaService>
}
```

__Description:__

The object containing [jangle services](/docs/core#service) and the [authorization service](/docs/core#auth).

Unlike [`ProtectedJangleCore`](/docs/core#protectedjanglecore`), the services here have already been given a user, so tokens don't need to be passed in to each service function.

- `services` - An object mapping our schemas to their dynamically generated functions.
- `auth` - An object containing a [`JangleUser`](/docs/core#jangleuser) service and helpful functions for user authentication.

__Example:__
```js
const jangle = require('jangle-core')

jangle.start()
  .then(core => {
    console.log("All jangle services: ", core.services)
    console.log("Our authentication helpers: ", core.auth)
  })
```

__Helpful Context__:

- [`startAsUser`](/docs/core#startasuser) - Returns this object in a `Promise`.

- [`Service`](/docs/core#service) - the type of service on the `services` property.

- [`Authorization`](/docs/core#authorization) - the type for the `auth` property.

- [`MetaService`](/docs/core#metaservice) - the type for the `auth.User` service.

- [`ProtectedJangleCore`](/docs/core#protectedjanglecore) - the protected version of this type, requiring a token for each function.

</template>

<script>
import highlightjs from 'highlight.js'

export default {
  layout: 'docs',
  mounted () {
    document.querySelectorAll('pre code').forEach(block => highlightjs.highlightBlock(block))
  }
}
</script>
