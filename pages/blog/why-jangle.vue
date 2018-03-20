<template lang="md">
## Hey there.

Welcome to Jangle's first blog post. My name is Ryan, and I'm glad you're interested in learning more about my open-source CMS! Jangle has gone through a lot of iterations, and drew its inspiration from many other projects and communities.

Hopefully this blog post will help you learn more about the decisions I've made, and why they made sense at the time.

## Storytime!

Jangle wouldn't even exist if I didn't have the opportunity to work at [One North Interactive](https://www.onenorth.com). It was there I was exposed to a multitude of different content management systems.

My favorite of those systems was [KeystoneJS](http://keystonejs.com/), a free and open-source CMS built on top of NodeJS, by a guy called Jed Watson. KeystoneJS was fast and simple. As a developer, I was able to get up to speed and start creating websites quickly.

Another popular offering at One North was [Sitecore](https://www.sitecore.com), a feature-rich platform built on top of .NET MVC. Sitecore was big and bloated, and as a minimalist web developer, I despised it.

But if I truly believed Sitecore was such a bad thing, then why was everyone buying it? Why didn't our clients want to use KeystoneJS?

## The answer was simple.

__Sitecore solved a lot of problems that KeystoneJS couldn't.__

KeystoneJS was free, open-source, and easy-to-use. But it didn't have any way to save a working draft of a blog post, or undo a simple mistake after submitting. It was pretty much just a clean UI on top of a MongoDB.

After I came to terms with the fact that KeystoneJS would never take over the world like I hoped it would, to shift my focus to less depressing areas.

On a train ride home, I read an article about a language called [Elm](http://elm-lang.org). When I got back home, I watched a Youtube video called ["Let's be Mainstream!"](https://www.youtube.com/watch?v=oYk8CKH7OhE) that introduced me to Evan Czaplicki.

Evan identified a problem that he was passionate about solving. After the talk, I was inspired to learn more about Elm, and (like many people who have tried it out) I immediately fell in love with it.

__It had a huge focus on:__

- Providing helpful errors and feedback.
- Completely eliminating entire kinds of issues.
- Creating a friendly and helpful community.

Evan had a fresh perspective on how to build UIs for the web, rooted in delightful experiences he had with other languages and tools. He brought his perspective to the language, and created something that I really love.

And the whole time, he wasn't focused on bashing other languages. He just cared about sharing what he loved with the web development community.

## A closer look at the problem.

I realized that if I apply that same focus and user-focused design to the content management community, then I can do some pretty great stuff.

__Content management is supposed to be for everyone.__

At the end of the day, our users are just normal people. If they need training on how to use their content management system, then maybe the system lost perspective on the problem it's trying to solve.

Jangle is out there to make content management free and accessible.

</template>

<script>
import highlightjs from 'highlight.js'

export default {
  layout: 'blog',
  mounted () {
    document.querySelectorAll('pre code').forEach(block => highlightjs.highlightBlock(block))
  }
}
</script>
