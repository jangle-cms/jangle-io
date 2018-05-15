<template lang="md">
### `start`
```ts
(config: Config) => Promise<ProtectedJangleCore>
```

__Description:__

Starts an instance of Jangle, returning a `Promise` with all your lists, items, and authentication services.

__Parameters:__

- `config` - [`Config`](/docs/core#config)

__Returns:__

A [`ProtectedJangleCore`](/docs/core#protectedjanglecore) object.

Because no user was provided, all protected list and item functions will require an authentication token.

__Example:__
```ts
const Jangle = require('@jangle/core')

Jangle.start()
  .then(({ lists, items, auth }) => {
    // ... access content and auth functions
  })
  .catch(reason => {
    // ... handle initialization errors.
  })
```

---

### `startAsUser`

```ts
(user: UserConfig, config: Config) => Promise<JangleCore>
```

__Description:__

Starts an instance of Jangle, authenticated with the provided user.

__Parameters:__

- `user` - [`UserConfig`](/docs/core#userconfig)

- `config` - [`Config`](/docs/core#config)

__Returns:__

A new [`JangleCore`](/docs/core#janglecore) object. This contains lists, items, and authentication helpers.

The [`JangleCore`](/docs/core#janglecore) object does not require any authentication tokens. The provided user login will be associated with any protected operations.


__Example:__
```ts
const Jangle = require('@jangle/core')

Jangle.startAsUser({
  email: 'ryan@jangle.com',
  password: 'password'
})
  .then(({ lists, items, auth }) => {
    // ... access content and auth functions
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
  lists: Dict<Schema>
  items: Dict<Schema>
  secret: string
}
```

__Description:__

The configuration object that Jangle uses on startup.

- `mongo.content` - The MongoDB URI for storing our private content and Jangle metadata.
- `mongo.live` - The MongoDB URI for storing our public items.
- `lists` - An object mapping list names to their Mongoose schemas.
- `items` - An object mapping item names to their Mongoose schemas.
- `secret` - The secret used to hash passwords and generate authentication tokens.

__Example:__
```js
import { Schema } from 'mongoose'

const config = {

  mongo: {
    content: 'mongodb://localhost/jangle',
    live: 'mongodb://localhost/jangle-live'
  },

  secret: 'some very secret thing',

  lists: {
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
  },

  items: {
    HomepageSettings: new Schema({
      title: {
        type: String,
        required: true,
        default: 'Jangle'
      },
      subtitle: {
        type: String,
        required: true,
        default: 'A cms for humans.'
      }
    })
  }

}
```

__Related Items__:

- [`Schema`](http://mongoosejs.com/docs/guide.html) - Used in the `schemas` property.

- [`start`](/docs/core#start) - Uses this configuration.

- [`startAsUser`](/docs/core#startasuser) - Uses this configuration.

---


### `UserConfig`

```ts
type UserConfig = {
  name: string
  email: string
  password: string
}
```

__Description:__

The Jangle user credentials to use for the application. (Used in [`startAsUser`](/docs/core#startasuser))

- `name` - The display name for our user (used during sign up).
- `email` - The email address for our user.
- `password` - The password for our user.

__Example:__
```ts
const userConfig = {
  name: 'Ryan',
  email: 'ryan@jangle.com',
  password: 'password'
}
```

__Related Items__:

- [`startAsUser`](/docs/core#startasuser) - Uses this configuration.

---


### `ProtectedJangleCore`

```ts
type ProtectedJangleCore = {
  lists: Dict<ProtectedListService>
  items: Dict<ProtectedItemService>
  auth: Authorization
}
```

__Description:__

The object containing [protected services](/docs/core#protectedservice) and the [authorization service](/docs/core#auth).

- `lists` - An object mapping list names to their dynamically generated functions.
- `items` - An object mapping item names to their dynamically generated functions.
- `auth` - An object containing helpful functions for user authentication.

__Example:__
```ts
const jangle = require('@jangle/core')

jangle.start()
  .then(core => {
    console.log("All protected services: ", core.services)
    console.log("Our authentication helpers: ", core.auth)
  })
```

__Related Items__:

- [`start`](/docs/core#start) - Returns this object in a `Promise`.

- [`ProtectedListService`](/docs/core#protectedlistservice) - the type of service on the `lists` property.

- [`ProtectedItemService`](/docs/core#protecteditemservice) - the type of service on the `items` property.

- [`Authorization`](/docs/core#authorization) - the type for the `auth` property.


---

### `JangleCore`

```ts
type JangleCore = {
  lists: Dict<ListService>
  items: Dict<ItemService>
  auth: Authorization
}
```

__Description:__

The object containing [jangle services](/docs/core#service) and the [authorization service](/docs/core#auth).

Unlike [`ProtectedJangleCore`](/docs/core#protectedjanglecore`), the services here have already been given a user, so tokens don't need to be passed in to each service function.

- `services` - An object mapping our schemas to their dynamically generated functions.
- `auth` - An object containing a [`JangleUser`](/docs/core#jangleuser) service and helpful functions for user authentication.

__Example:__
```js
const jangle = require('@jangle/core')

jangle.start()
  .then(core => {
    console.log("All jangle services: ", core.services)
    console.log("Our authentication helpers: ", core.auth)
  })
```

__Related Items__:

- [`startAsUser`](/docs/core#startasuser) - Returns this object in a `Promise`.

- [`ListService`](/docs/core#listservice) - the type of service on the `lists` property.

- [`ItemService`](/docs/core#itemservice) - the type of service on the `items` property.

- [`Authorization`](/docs/core#authorization) - the type for the `auth` property.

---

### `ProtectedListService`

```ts
type ProtectedListService = {

  any: ProtectedAnyFunction
  count: ProtectedCountFunction
  find: ProtectedFindFunction
  get: ProtectedGetFunction

  create: ProtectedCreateFunction
  update: ProtectedUpdateFunction
  patch: ProtectedPatchFunction
  remove: ProtectedRemoveFunction

  isLive: ProtectedIsLiveFunction
  publish: ProtectedPublishFunction
  unpublish: ProtectedUnpublishFunction
  live: LiveService

  history: ProtectedHistoryFunction
  previewRollback: ProtectedPreviewRollbackFunction
  rollback: ProtectedRollbackFunction

  schema: ProtectedSchemaFunction

}
```

---

### `ProtectedItemService`

```ts
type ProtectedItemService = {

  get: ProtectedItemGetFunction
  update: ProtectedItemUpdateFunction
  patch: ProtectedItemPatchFunction

  isLive: ProtectedItemIsLiveFunction
  publish: ProtectedItemPublishFunction
  unpublish: ProtectedItemUnpublishFunction
  live: ItemLiveService

  history: ProtectedItemHistoryFunction
  previewRollback: ProtectedItemPreviewRollbackFunction
  rollback: ProtectedItemRollbackFunction

  schema: ProtectedSchemaFunction

}
```

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
