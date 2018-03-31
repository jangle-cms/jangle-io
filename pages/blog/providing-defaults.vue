<template lang="md">
## Making things nice.

Mongoose is a wonderful open-source project that makes building Jangle fun! The schemas they provided are the center of what makes Jangle so easy to use. There are a handful of schema options available. Options like `type`, `required`, and `ref` help make describing your content straightforward.

Today, however, we are going to take a closer look at one called `default`. This one that allows us to provide fallback values in case we don't specify a field.

### Let's look at an example!

Let's say you are making your own blog. Maybe your Jangle setup looks like this:

```js
const { Schema } = require('mongoose')
const jangle = require('@jangle/core')

jangle.start({

  user: {
    email: 'example@jangle.io',
    password: 'password'
  },

  lists: {
    BlogPost: new Schema({
      title: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      }
    })
  }

})
```

Your `BlogPost` schema has two required fields: `title` and `date`.

That means it's up to you to always provide both of these values. Jangle will use Mongoose to make sure you don't forget one, so your data stays valid!

Maybe the `date` field should automatically be set to the current date, so you don't have to enter it manually every time.

For that to work, all we need to do is add the `default` property on the `date` field for your `BlogPost` schema, like this:

```js
{
  BlogPost: new Schema({
    title: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    }
  })
}
```

Now we have the notion of a default value (`Date.now`) for our field.

The following code:

```js
BlogPost.create({
  title: 'Handling Defaults'
})
  .then(item =>
    console.log(item)
  )
```

will result in this output:

```js
{
  _id: '...',
  title: 'Handling Defaults',
  date: '2018-03-29T03:11:57.849Z',
  jangle: { ... }
}
```


### But where should we keep the defaults?

When I first implemented `BlogPost.create`, I used `mongoose.create` behind the scenes. The default behavior for that function is to store the defaults in the database.

When I created the blog post, Jangle stored this is what my `blogposts` collection looked like in the database:

```js
[
  {
    _id: '...',
    title: 'Handling Defaults',
    date: '2018-03-29T03:11:57.849Z',
    jangle: { ... }
  }
]
```

At first glance, I thought this was perfect! I went ahead and created another blog post:

```js
BlogPost.create({
  title: 'What a Nice Day...'
})
```

My `blogposts` collection now looked like this:

```js
[
  {
    _id: '...',
    title: 'Handling Defaults',
    date: '2018-03-29T03:11:57.849Z',
    jangle: { ... }
  },
  {
    _id: '...',
    title: 'Introducing Jangle Items!',
    date: '2018-03-29T03:23:52.710Z',
    jangle: { ... }
  }
]
```

Everything was working as expected.


### Let's try it out on Jangle Items!

I liked using `default` so much, I decided I should try it out with Jangle Items.

Items are just like Jangle Lists, except Jangle makes sure that exactly one of each Item them exists. These are useful for content on a single page, or global settings like "Read More Label".

Sometimes you only want one instance of a particular Mongoose schema!

Here's an example of an Item schema using the `default` properties:

```js
const jangle = require('@jangle/core')
const { Schema } = require('mongoose')

jangle.start({

  user: { ... },

  lists: { ... },

  items: {
    Homepage: new Schema({
      heroTitle: {
        type: String,
        required: true,
        default: 'Jangle'
      },
      heroSubtitle: {
        type: String,
        required: true,
        default: 'a cms for humans.'
      }
    })
  }

})
```

After Jangle spins up, I can use this code:

```js
Homepage.get()
```

...to see what my `Homepage` item looks like!

```js
{
  _id: '...',
  heroTitle: 'Jangle',
  heroSubtitle: 'a cms for humans.',
  jangle: { ... }
}
```

Hooray, the defaults pulled through!

This allows me to provide initial values when I spin up Jangle in a new environment.

### That's it!

Because Mongoose has solved a lot of difficult problems under the hood, Jangle can make it really easy to express the kind of stuff you want to store.

If you want to try out Jangle yourself, check out the [guide](/guide) for more information!

__Thanks for reading!__


</template>

<script>
export default {
  layout: 'blog',
  mixins: [ require('~/mixins/blog-page') ]
}
</script>
