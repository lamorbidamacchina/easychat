# easychat
A basic chat with socket.io

# live demo
https://easychat.fly.dev/

# deploy on fly
This app is deployed on Fly and the repository now includes `fly.toml` so the deployment configuration is tracked.

Use the following npm scripts if you have `flyctl` installed:

- `npm run fly:scale:down` — scale the app to zero instances
- `npm run fly:scale:up` — scale the app back to one instance
- `npm run fly:status` — show current app status

# deploy on heroku
- create new app
- login to heroku cli ("heroku login")
- "heroku features:enable http-session-affinity -a NAME_OF_THE_APP"
- deploy

# todo
- rooms
- fix main chatboard height with js
- add a splash screen with some instructions, and a form for nickname and room, for first time users
- nickname storage and display in chat instead of random num
