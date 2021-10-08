# React Query

This repo serves as a playground environment to try out [React Query](https://react-query.tanstack.com/)

## Talking points

- How do we usually handle remote data in react?

  - fetch, axios, state, redux, caching, swr

- React query uses mental model _Client state_ vs _Server state_.

  - How are these different? sync, async, local, remote

- Staying in sync

---

## React Query proposition

- Unlike Redux or your own solution™️, is _actually_ made for handling server state
- Deduplicates requests
- Easy and flexible automatic caching
- All data is 'immutable' (has referential equality across consumers)
- Separates server state from client state

## React Query technical concepts

**Q**: What is Stale time?  
**A**: It's the amount of time until your data is considered stale, and triggers a background fetch. Defaults to 0.

**Q**: What is Cache time?  
**A**: It's the amount of time until your query is cleared, data cleared, and allocated memory is garbage collected. Defaults to 5 minutes.
