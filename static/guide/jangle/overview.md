> Jangle isn't one, monolithic package.

We can take whichever parts we need, and can opt out of the rest.

---

### [Jangle Core](/docs/core/overview)
> a lightweight layer of javascript services.

Jangle Core provides a layer of services so we can focus on the important part: __Defining our content and the rules around it.__

This adds three features top of the popular [Mongoose ODM](http://mongoosejs.com/):

- __Authentication__ - Control who has access to private content.
- __History__ - Easily track changes and undo mistakes.
- __Publishing__ - Decide what content should be publicly visible.

Feel free to check out [Jangle Core on Github](https://github.com/jangle-cms/jangle-core).

---

### [Jangle API](/docs/api/overview)
> a RESTful API for our content.

Jangle API automatically generates API endpoints for accessing our content.

Jangle Core was built with this API in mind, making endpoints easy to implement.

Creating this as a different layer will allow the Jangle community to build a GraphQL endpoint later on!

_Jangle API is a work in progress, check back soon!_

---

### [Jangle CMS](/docs/cms/overview)
> a CMS UI for our users.

Jangle CMS is the admin interface that intends to simplify the user experience.

Jangle was built with the perspective that a content management system is only as good as it's usability.

Helpful error messages, allowing undos, and presenting the minimum amount of clutter is Jangle's priority.

Leveraging the Jangle API and Jangle Core layers, Jangle CMS can focus on a delightful user experience.

_Jangle CMS is a work in progress, check back soon!_
