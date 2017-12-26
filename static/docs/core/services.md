> Here's how to interact with our content.


## Overview

Jangle Core exposes a property called `services` after initialization.

This property contains two different types of services:

- __`PublicService`__ - These are read-only services, showing published content only.

- __`ContentService`__ - These services require authentication, but allow us to create, update, and remove items.

Let's look at the APIs for each of the functions and some examples on how to use them.

---

## `PublicService`
> Read-only, publicly-available services for accessing content.

As opposed to `ContentServices`, `PublicServices` do not require any authentication.

We can easily perform __read operations__ with these services, and know that our private content will not be shared.

Here is a full breakdown of all properties on any `PublicService`:

```ts
type PublicService<Item> = {
  'any': (params?: AnyParams) => Promise<boolean>,
  'count': (params?: CountParams) => Promise<number>,
  'find': (params?: FindParams) => Promise<Object[]>,
  'get': (id: string, params?: GetParams) => Promise<Object>
}
```

---

## `ContentService`
> Protected services for safely creating, updating, removing, and accessing content.

When using this API, Jangle can [easily revert a mistake](/docs/core/history) and [trust our private content is hidden](/docs/core/publishing).

Here is a full breakdown of all properties on any `ContentService`:

```ts
type ContentService<Item> = {

  // Fetching content
  'any': (token: string, params?: AnyParams) => Promise<boolean>,
  'count': (token: string, params?: CountParams) => Promise<number>,
  'find': (token: string, params?: FindParams) => Promise<Object[]>,
  'get': (token: string, id: string, params?: GetParams) => Promise<Object>,

  // Creating, updating, removing
  'create': (token: string, newItem: Item) => Promise<Item>,
  'update': (token: string, id: string, newItem: Item) => Promise<Item>,
  'patch': (token: string, id: string, partialItem: Object) => Promise<Item>,
  'remove': (token: string, id: string) => Promise<Item>,

  // Controlling public visibility
  'publish': (token: string, id: string) => Promise<Item>,
  'unpublish': (token: string, id: string) => Promise<Item>,

  // Reviewing changes or undoing mistakes
  'history': (token: string, id: string) => Promise<JangleHistoryItem[]>,
  'restore': (token: string, id: string, version: number) => Promise<Item>

  // Accessing collection information
  'schema': (token: string) => Promise<Schema>
}
```

__Helpful FAQs__

- "[Why does _every_ function ask for a token?](/docs/core/faqs)"


---

## Service API
> Documentation for every service, public or protected

Fortunately, `ContentServices` and `PublicServices` share a common API for read operations.

This means if we learn one, we've unlocked understanding for the other.

### Examples

For the following documentation, we'll assume we have with the following code:

```js
import jangle from 'jangle-cms'
import { Schema } from 'mongoose'

const ourSchemas = {

  Author: new Schema({
    name: { type: String, required: true },
    about: { type: String, required: true }
  }),

  BlogPost: new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author' },
    content: { type: String },
  })

}

jangle
  .start({ schemas: ourSchemas })
  .then(({ services }) => {
    const userToken = '<our-secret-user-token>'

    /* --- Example code begins here --- */

  })
  .catch(reason => {
    console.error('Could not start Jangle...', reason)
  })
```

---

### `any`
> `any: (params?: AnyParams) => Promise<boolean>`

__Description:__

Returns `true` if there are any items matching the criteria, and `false` otherwise.

__Parameters:__
```ts
type AnyParams = {
  where?: MongoDBQuerySelector
}
```

__Example (`PublicService`):__
```js
const PublicAuthor = services.public.Author

PublicAuthor
  .any({ name: 'Jimmy' })
  .then(hasAuthorsNamedJimmy => {
    if (hasAuthorsNamedJimmy) {
      console.log('We have authors named Jimmy!')
    } else {
      console.log('No authors named Jimmy...')
    }
  })
  .catch(reason => {
    console.error('Error looking for authors named Jimmy...', reason)
  })
```

__Example (`ContentService`):__
```js
const Author = services.content.Author

Author
  .any(userToken, { name: 'Jimmy' })
  .then(hasAuthorsNamedJimmy => {
    if (hasAuthorsNamedJimmy) {
      console.log('We have authors named Jimmy!')
    } else {
      console.log('No authors named Jimmy...')
    }
  })
  .catch(reason => {
    console.error('Error looking for authors named Jimmy...', reason)
  })
```

__Helpful Context:__

- [MongoDBQuerySelector](https://docs.mongodb.com/manual/reference/operator/query/#query-selectors)

---

### `count`
> `count: (params?: CountParams) => Promise<number>`

__Description:__

Returns the number of items matching the criteria.

__Parameters:__
```ts
type CountParams = {
  where?: MongoDBQuerySelector
}
```

__Example (`PublicService`):__
```js
const PublicBlogPost = services.public.BlogPost

PublicBlogPost
  .count({ content: { $exists: true } })
  .then(count => {
    console.log('Number of posts with content:', count)
  })
  .catch(reason => {
    console.error('Error counting posts with content...', reason)
  })
```

__Example (`ContentService`):__
```js
const BlogPost = services.content.BlogPost

BlogPost
  .count(userToken, { content: { $exists: true } })
  .then(count => {
    console.log('Number of posts with content:', count)
  })
  .catch(reason => {
    console.error('Error counting posts with content...', reason)
  })
```

__Helpful Context:__

- [MongoDBQuerySelector](https://docs.mongodb.com/manual/reference/operator/query/#query-selectors)

---

### `find`
> `find: (params?: FindParams) => Promise<Object[]>`

__Description:__

Returns items matching certain criteria.

__Parameters:__
```ts
type FindParams = {
  where?: MongoDBQuerySelector,
  skip?: number,
  limit?: number,
  populate?: MongoosePopulateOptions,
  select?: MongooseSelectOptions,
  sort?: MongooseSortOptions
}
```

__Example (`PublicService`):__
```js
const PublicBlogPost = services.public.BlogPost

PublicBlogPost
  .find({
    populate: 'author',
    limit: 5
  })
  .then(posts => {
    console.log('Posts:', posts)
  })
  .catch(reason => {
    console.error('Error finding posts...', reason)
  })
```

__Example (`ContentService`):__
```js
const BlogPost = services.content.BlogPost

BlogPost
  .find(userToken, {
    populate: 'author',
    limit: 5
  })
  .then(posts => {
    console.log('Posts:', posts)
  })
  .catch(reason => {
    console.error('Error finding posts...', reason)
  })
```

__Helpful Context:__

- [MongoDBQuerySelector](https://docs.mongodb.com/manual/reference/operator/query/#query-selectors)
- [MongoosePopulateOptions](http://mongoosejs.com/docs/api.html#query_Query-populate)
- [MongooseSelectOptions](http://mongoosejs.com/docs/api.html#query_Query-select)
- [MongooseSortOptions](http://mongoosejs.com/docs/api.html#query_Query-sort)

---

### `get`
> `get: (id: string, params?: GetParams) => Promise<Object>`

__Description:__

Returns an item with the specified `id`.

__Parameters:__
```ts
type GetParams = {
  populate?: MongoosePopulateOptions,
  select?: MongooseSelectOptions
}
```

__Example (`PublicService`):__
```js
const PublicAuthor = services.public.Author
const itemId = '507f191e810c19729de860ea'

PublicAuthor
  .get(itemId)
  .then(author => {
    console.log('Author:', author)
  })
  .catch(reason => {
    console.error('Error getting author...', reason)
  })
```

__Example (`ContentService`):__
```js
const Author = services.content.Author
const itemId = '507f191e810c19729de860ea'

Author
  .get(userToken, itemId)
  .then(author => {
    console.log('Author:', author)
  })
  .catch(reason => {
    console.error('Error getting author...', reason)
  })
```

__Helpful Context:__

- [MongoosePopulateOptions](http://mongoosejs.com/docs/api.html#query_Query-populate)
- [MongooseSelectOptions](http://mongoosejs.com/docs/api.html#query_Query-select)

---

### `create`
> `create: (newItem: Item) => Promise<Item>`

__Description:__

Creates a new item in a collection.

__Parameters:__

- `newItem` - the new item we want to create.

__Example (`ContentService`):__
```js
const Author = services.content.Author

const newAuthorItem = {
  name: 'Ryan',
  about: 'Likes nice documentation.'
}

Author
  .create(userToken, newAuthorItem)
  .then(createdAuthorItem => {
    console.log('Author created:', createdAuthorItem)
  })
  .catch(reason => {
    console.error('Could not create author...', reason)
  })
```

---

### `update`
> `update: (id: string, newItem: Item) => Promise<Item>`

__Description:__

Fully replaces an existing item in a collection.

__Parameters:__

- `id` - the id of the item we want to update.

- `newItem` - the new item that will replace the old one.

__Example (`ContentService`):__
```js
const Author = services.content.Author

const updatedAuthorItem = {
  name: 'Ryan',
  about: 'Loves nice documentation.'
}

Author
  .update(userToken, updatedAuthorItem)
  .then(replacedItem => {
    console.log('Previous author item:', replacedItem)
  })
  .catch(reason => {
    console.error('Could not update author...', reason)
  })
```

---

### `patch`
> `patch: (id: string, partialItem: Object) => Promise<Item>`

__Description:__

Updates certain fields on an existing item in a collection.

__Parameters:__

- `id` - the id of the item we want to patch.

- `partialItem` - the changes for the item we want to patch.

__Example (`ContentService`):__
```js
const Author = services.content.Author

const fieldsToUpdate = {
  about: 'Loves great documentation!'
}

Author
  .patch(userToken, fieldsToUpdate)
  .then(oldItem => {
    console.log('Previous author item:', oldItem)
  })
  .catch(reason => {
    console.error('Could not patch author...', reason)
  })
```

---

### `remove`
> `remove: (id: string) => Promise<Item>`

__Description:__

Removes an existing item from a collection.

__Parameters:__

- `id` - the id of the item we want to remove.

__Example (`ContentService`):__
```js
const Author = services.content.Author
const itemId = '507f191e810c19729de860ea'

Author
  .remove(userToken, itemId)
  .then(removedItem => {
    console.log('Previous author item:', removedItem)
  })
  .catch(reason => {
    console.error('Could not remove author...', reason)
  })
```

---

### `publish`
> `publish: (id: string) => Promise<Item>`

__Description:__

Publishes an existing item in a collection.

__Parameters:__

- `id` - the id of the item we want to publish.

__Example (`ContentService`):__
```js
const Author = services.content.Author
const itemId = '507f191e810c19729de860ea'

Author
  .publish(userToken, itemId)
  .then(publishedItem => {
    console.log('Published author item:', publishedItem)
  })
  .catch(reason => {
    console.error('Could not publish author...', reason)
  })
```

---

### `unpublish`
> `unpublish: (id: string) => Promise<Item>`

__Description:__

Unpublishes an existing item from a collection.

__Parameters:__

- `id` - the id of the item we want to unpublish.

__Example (`ContentService`):__
```js
const Author = services.content.Author
const itemId = '507f191e810c19729de860ea'

Author
  .unpublish(userToken, itemId)
  .then(unpublishedItem => {
    console.log('Unpublished author item:', unpublishedItem)
  })
  .catch(reason => {
    console.error('Could not unpublish author...', reason)
  })
```

---

### `history`
> `history: (id: string) => Promise<JangleHistoryItem[]>`

__Description:__

Look at the history of an item in a collection.

__Parameters:__

- `id` - the id of the item whose history should be viewed.

__Example (`ContentService`):__
```js
const Author = services.content.Author
const itemId = '507f191e810c19729de860ea'

Author
  .history(userToken, itemId)
  .then(historyItems => {
    console.log('History for item:', historyItems)
  })
  .catch(reason => {
    console.error('Could not view author history...', reason)
  })
```

---

### `preview`
> `preview: (id: string, version: number) => Promise<Item>`

__Description:__

Preview the result of a `restore` operation before making changes.

__Parameters:__

- `id` - the id of the item whose restore we want to preview.

- `version` - the version to restore.

__Example (`ContentService`):__
```js
const Author = services.content.Author
const itemId = '507f191e810c19729de860ea'
const version = 1

Author
  .preview(userToken, itemId, version)
  .then(previewItem => {
    console.log('Preview for item restore:', previewItem)
  })
  .catch(reason => {
    console.error('Could not preview author...', reason)
  })
```

---

### `restore`
> `restore: (id: string, version: number) => Promise<Item>`

__Description:__

Restore an item to a previous state.

__Parameters:__

- `id` - the id of the item whose version will be restored.

- `version` - the version to restore.

__Example (`ContentService`):__
```js
const Author = services.content.Author
const itemId = '507f191e810c19729de860ea'
const version = 1

Author
  .preview(userToken, itemId, version)
  .then(previewItem => {
    console.log('Preview for item restore:', previewItem)
  })
  .catch(reason => {
    console.error('Could not restore author...', reason)
  })
```

---

### `schema`
> `schema: () => Promise<JangleSchemaItem>`

__Description:__

Provides information about the collection's fields and other useful metadata.

__Example (`ContentService`):__
```js
const Author = services.content.Author

Author
  .schema(userToken)
  .then(authorSchema => {
    console.log('Schema for Author:', authorSchema)
  })
  .catch(reason => {
    console.error('Could not get Author schema...', reason)
  })
```
