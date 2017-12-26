> a cms for humans.

[MongoDB]() > [Mongoose]() > Jangle CMS > [Jangle API]() > [Jangle UI]()

## Overview

Jangle is a focused content management system, powered by MongoDB.

It builds on top of the wonderful [Mongoose]() npm package to deliver three essential features:

- __Authentication:__ Make sure your content is protected.
- __History:__ Make tracking changes and undoing mistakes easy.
- __Publishing:__ Control when your content should be available.

After providing your Mongoose Schemas, Jangle automatically generates a layer of services.

On top of these services, you can safely build a [REST API]() or [GraphQL API]().

## Getting Started

```js
const jangle = require('jangle-cms')
const { Schema } = require('mongoose')

// 1. Make your Mongoose Schemas.
const schemas = {
  Puppy: new Schema({
    name: String,
    owner: String
  })
}

// 2. Make an initial user.
const user = {
  email: 'ryan@jangle.com',
  password: 'password'
}

// 3. Let Jangle automatically generate services.
jangle
  .start({ schemas, user })
  .then(({ services, token }) =>
    services.jangle.Puppy
      .create(token, {
        name: 'Jangle',
        owner: 'Ryan'
      })
      .then(console.log)
  )
  .catch(console.error)
```


## API Documentation

> ["It's not done until the docs are great."](https://ryannhg.gitbooks.io/jangle/content) - Evan Czaplicki, creator of [elm](http://elm-lang.org)

Jangle breaks up API endpoints into two categories:

- __Public__: Does not require an authentication token.

- __Protected__: Requires an authentication token for access.


### Authentication API (Public)

> Check if any users exist, sign up, and sign in.

__Route__ | __Description__ | __Query Params__
--- | --- | ---
`GET /api/jangle/status` | Retrieve the status of the Jangle instance. | (None)
`POST /api/jangle/sign-up` | Create __first__ user with an `email`, `password`, and `role`. | (None)
`POST /api/jangle/sign-in` | Attempt to sign in a user with an `email` and `password`. | (None)


### List API

> Find, create, update, and remove items.

__Route__ | __Description__ | __Query Params__
--- | --- | ---
`GET /api/:list` | Find items in `:list` collection. | `where`, `skip`, `limit`, `populate`, `select`, `sort`
`GET /api/:list/:id` | Get `:list` items with `:id` | `populate`, `select`
`POST /api/:list` | Create a new item in `:list` | None.
`PUT /api/:list/:id` | Completely replace the `:list` item with `:id` with a new item. | None.
`PATCH /api/:list/:id` | Update some fields for the `:list` item with `:id` | None.
`DELETE /api/:list/:id` | Remove the `:list` item with `:id` | `permanent`


### Schema API

> Get available lists and their fields (So you can roll your own Admin UI).

__Route__ | __Description__ | __Query Params__
--- | --- | ---
`GET /api/jangle/schemas` | Gets all Jangle lists and their fields. | None
`GET /api/jangle/schemas/:list` | Finds the Jangle list with name `:list` and its fields. | None


### History API

> Look at item history, preview and commit a restore to a previous version.

__Route__ | __Description__ | __Query Params__
--- | --- | ---
`GET /api/jangle/history/:id` | Returns complete history for an item. | None
`GET /api/jangle/history/:id/restore` | Preview the result of a version restore. | `list`, `version`
`POST /api/jangle/history/:id/restore` | Perform a version restore. | `list`, `version`


### Publishing API

> Make content visible to anonymous users (read-only).

__Route__ | __Description__ | __Query Params__
--- | --- | ---
`POST /api/:list/publish/:id` | Publishes the latest version of an item. | None
`DELETE /api/:list/unpublish/:id` | Unpublishes a published item. | None
