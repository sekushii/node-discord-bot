# ts-discord-bot-framework

A small Discord bot framework I made to serve as a basis for my future bots.
It contains event/command handlers and some examples of database access and external requests.

## Technology stack

- TypeScript: I like type safety and use it whenever I can in projects.
- InversifyJS: Provides dependency injection. Easily swappable dependencies depending on the purpose of the bot.
- Discordjs: Library for communicating with the Discord API. A must have.
- Mongoose: I chose MongoDB because of the flexible schema. Mongoose adds a lot of convenience when handling models.
- Redis: My go-to in-memory store for the cache layer. 
- Axios: HTTP client that provides a lot of utility over other choices.
- Jest: Preferred testing framework.
- Winston: Preferred logging library.

## To-do list
- [ ] Implement some tests
- [ ] Add a service layer to better handle external requests and repository access