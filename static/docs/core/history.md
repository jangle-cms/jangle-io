> tracking changes and undoing mistakes

---

### Overview

For every item we create in Jangle, users are able to make updates.

Every now and then, one of those updates might need to be reverted.

That's where Jangle's History API comes in.

Let's go through an example with a `Puppy` schema:

```js
const Puppy = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  }
})
```

After we pass this via `schemas` to the `jangle.start` function, two collections are created:

- `puppies` - stores the latest versions of all puppies.

- `jangle.history.puppies` - stores the history for all puppies.

---

### How History Works

Let's imagine we add a new puppy, named "Jangle":

```js
Puppy.create(
  userToken,
  {
    name: 'Jangle',
    owner: 'Ryan'
  }
)
```

Here's a snapshot of our database at this point in time:

```js
const db = {
  'puppies': [
    {
      _id: '<jangles-mongo-id>',
      name: 'Jangle',
      owner: 'Ryan',
      jangle: {
        version: 1,
        status: 'visible',
        created: {
          by: '<our-users-id>',
          at: '<timestamp-1>'
        },
        updated: {
          by: '<our-users-id>',
          at: '<timestamp-1>'
        }
      }
    }
  ],
  'jangle.history.puppies': []
}
```

At this point, our `History` collection is empty. Let's change that.


```js
Puppy.patch(
  userToken,
  '<jangles-mongo-id>',
  {
    owner: 'Jimmy'
  }
)
```

This is what our database will look like after a `patch` update:

```js
const db = {
  'puppies': [
    {
      _id: '<jangles-mongo-id>',
      name: 'Jangle',
      owner: 'Jimmy',
      jangle: {
        version: 2,
        status: 'visible',
        created: {
          by: '<our-users-id>',
          at: '<timestamp-1>'
        },
        updated: {
          by: '<our-users-id>',
          at: '<timestamp-2>'
        }
      }
    }
  ],
  'jangle.history.puppies': [
    {
      _id: '<some-mongo-id>',
      version: 1,
      itemId: '<jangles-mongo-id>',
      updated: {
        by: '<our-users-id>',
        at: '<timestamp-1>'
      }
      changes: [
        {
          field: 'owner',
          oldValue: 'Ryan'
        }
      ]
    }
  ]
}
```

If we decided to remove Jangle, here's what our history would look like:

```js
Puppy.remove(
  userToken,
  '<jangles-mongo-id>'
)
```


```js
const db = {
  'puppies': [
    {
      _id: '<jangles-mongo-id>',
      name: 'Jangle',
      owner: 'Jimmy',
      jangle: {
        version: 3,
        status: 'hidden',
        created: {
          by: '<our-users-id>',
          at: '<timestamp-1>'
        },
        updated: {
          by: '<our-users-id>',
          at: '<timestamp-3>'
        }
      }
    }
  ],
  'jangle.history.puppies': [
    {
      _id: '<some-mongo-id>',
      version: 1,
      itemId: '<jangles-mongo-id>',
      updated: {
        by: '<our-users-id>',
        at: '<timestamp-1>'
      }
      changes: [
        {
          field: 'owner',
          oldValue: 'Ryan'
        }
      ]
    },
    {
      _id: '<some-other-mongo-id>',
      version: 2,
      itemId: '<jangles-mongo-id>',
      updated: {
        by: '<our-users-id>',
        at: '<timestamp-2>'
      }
      changes: [
        {
          field: 'jangle.status',
          oldValue: 'visible'
        }
      ]
    }
  ]
}
```

The `jangle.status` property was changed, so a new history item was created.

Also, note the record was not actually deleted, only hidden.

This makes it possible to undo accidental item deletions:

```js
Puppy.restore(userToken, '<jangles-mongo-id>', 2)
```

```js
const db = {
  'puppies': [
    {
      _id: '<jangles-mongo-id>',
      name: 'Jangle',
      owner: 'Jimmy',
      jangle: {
        version: 4,
        status: 'visible',
        created: {
          by: '<our-users-id>',
          at: '<timestamp-1>'
        },
        updated: {
          by: '<our-users-id>',
          at: '<timestamp-4>'
        }
      }
    }
  ],
  'jangle.history.puppies': [
    {
      _id: '<some-mongo-id>',
      version: 1,
      itemId: '<jangles-mongo-id>',
      updated: {
        by: '<our-users-id>',
        at: '<timestamp-1>'
      }
      changes: [
        {
          field: 'owner',
          oldValue: 'Ryan'
        }
      ]
    },
    {
      _id: '<some-other-mongo-id>',
      version: 2,
      itemId: '<jangles-mongo-id>',
      updated: {
        by: '<our-users-id>',
        at: '<timestamp-2>'
      }
      changes: [
        {
          field: 'jangle.status',
          oldValue: 'visible'
        }
      ]
    },
    {
      _id: '<yet-another-mongo-id>',
      version: 3,
      itemId: '<jangles-mongo-id>',
      updated: {
        by: '<our-users-id>',
        at: '<timestamp-3>'
      }
      changes: [
        {
          field: 'jangle.status',
          oldValue: 'hidden'
        }
      ]
    }
  ]
}
```
