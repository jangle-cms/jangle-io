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

### What happens when I change a default?

Since I was so hyped that Jangle filled in my defaults for me, I decided to update the default subtitle:


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
        default: 'a cms for winners!'
      }
    })
  }

})
```

When doing another `Homepage.get()`, this is what I got back:

```js
{
  _id: '...',
  heroTitle: 'Jangle',
  heroSubtitle: 'a cms for humans.',
  jangle: { ... }
}
```

...wait. Is that what a user would expect?


## Let's find out!

Whenever I run into a potential issue designing Jangle, I like to ask:

> "What would a normal human expect?"

It turns out there are a lot of normal people out there, so I need to explore a few options:

#### 1. Don't store defaults at all.

If you want an update to `heroTitle`'s default value to show as a fallback, don't store any defaults in the database.

If the user has the same `Homepage` schema from before:

```js
[
  {
    _id: '...',
    jangle: { ... }
  }
]
```

I tried this approach out first, and created a function called `provideDefaultValues` that merged the items with their defaults (for any blank fields).

This worked great, and returned the most recent `default` every time.

But it brought up a few interesting questions:

1. What if I query for "Jangle" in the database? Should the results be blank?

1.  Mongoose allows the use of functions to provide defaults. Should I really run those everytime?

For the second question, I thought back to the `BlogPost` default value: `Date.now`. The whole benefit of that was it allowed new blog posts to set a default date on the fly. Setting the date to `Date.now()` on every query doesn't really make sense.

And I know for a fact that `date` is an _incredibly_ valuable option when querying blog posts. So that answers my first question: I should't keep that information out of the database.

#### 2. Only do it for default functions?

What if I only stored the result of default operations if the user gave me a function? Would that prevent weird issues? Or would it cause confusion?

Whenever I introduce divergence by creating another rule for people to remember, I feel really bad about it. I need to make sure that the result of the divergence is actually helpful, so I don't end up making someone make a misguided decision.

#### 3. Leave it alone!

Mongoose obviously made that decision for a good reason, so I might end up introducing unnecessary complexity without adding much value!

Another important thing is that reimplementing the definition of `default` would mislead anyone familiar with it's usage the Mongoose community. It's not cool to confuse people.


## The game is hard.

The best thing to do when I am faced with a weird problem like this, is talk it over with my nerdy friends. The best parts of Jangle have come from hearing their experiences and including their perspectives in the decision-making process.

So stay tuned for another post explaining what the heck I'm going to do.

__Thanks for reading!__


</template>

<script>
export default {
  layout: 'blog',
  mixins: [ require('~/mixins/blog-page') ]
}
</script>
