> signing in and creating users

---

### Overview

After starting up Jangle, a property called `auth` is returned.

This property has the following functions available on it:

```ts
type Auth = {
  createInitialAdmin: (email: string, password: string) => Promise<Token>,
  signUp: (token: string, email: string, password: string, role: Role) => Promise<Token>,
  signIn: (email: string, password: string) => Promise<Token>
}
```

---

### `createInitialAdmin`
> `createInitialAdmin: (email: string, password: string) => Promise<Token>`

__Description:__

Creates an admin user, if one does not exist in the system. Returns the user's token.

__Example:__
```js
const jangle = require('jangle-core')

jangle.start()
  .then(({ auth }) =>
    auth
      .createInitialAdmin('ryan@jangle.com', 'password')
      .then(token => console.log("Ryan's token:", token))
  )
  .catch(reason =>
    console.error('Something went wrong:', reason)
  )
```

__Helpful Context:__

- [How to check if any admins exist.](/docs/core/status)
- [Alternative to `createInitialUser`](/docs/core/configuration)

---

### `signUp`
> `signUp: (token: string, email: string, password: string, role: string) => Promise<Token>`

__Description:__

Creates a user, if the user's token points to an Admin Users. Returns the user's token.

__Example:__
```js
const jangle = require('jangle-core')

jangle.start()
  .then(({ auth }) =>
    auth
      .signUp(ryansToken, 'alexa@jangle.com', 'password', 'editor')
      .then(token => console.log("Alexa's token:", token))
  )
  .catch(reason =>
    console.error('Something went wrong:', reason)
  )
```

__Helpful Context:__

- [User Roles](/api/core/roles)

---

### `signIn`
> `signIn: (email: string, password: string) => Promise<Token>`

__Description:__

Signs in a user, if the provided credentials match. Returns the user's token.

__Example:__
```js
const jangle = require('jangle-core')

jangle.start()
  .then(({ auth }) =>
    auth
      .signIn('alexa@jangle.com', 'password')
      .then(token => console.log("Alexa's token:", token))
  )
  .catch(reason =>
    console.error('Something went wrong:', reason)
  )
```
