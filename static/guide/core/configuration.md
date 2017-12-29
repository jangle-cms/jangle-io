

---

### Providing an Application User

If you are not building a [REST API](/docs/api/overview) or a [GraphQL Endpoint](/docs/ql/overview), it might not make sense to pass a token through with every private request.

That's why Jangle Core provides an alternative method: `jangle.startAsUser`.

This method's configuration object adds a `user` property:

```ts
export type JangleConfigAsUser = {
  // ... JangleConfig properties
  user: {
    email: string
    password: string
  }
}
```



In the next section, we'll look at what properties are returned by [`jangle.start`](/docs/core/jangle-start)
