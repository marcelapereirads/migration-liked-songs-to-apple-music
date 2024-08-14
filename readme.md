# Migration liked songs from Spotify to Apple Music

The objective of this project is to facilitate a smooth transition from Spotify to Apple Music. The plan is to compile a list of all the names of my "Liked Songs" on Spotify, including the songs and artists. Once the list is generated, it will access Apple Music to locate and add these songs to my library.

## Getting Started

To initiate the migration, please execute the following script, replacing "{{my-spotify-username}}" with your email or Spotify username and "{{my-spotify-password}}" with your Spotify password.

> npm run start -- --env spotifyUsername={{my-spotify-username}},spotifyPassword={{my-spotify-password}}

## Limitations

This is an experimental study project. I aim only to validate my knowledge and learn more about Cypress. Cypress is a testing framework, not a solution to automate different things, but I am having so fun while doing this project. Another obvious issue is I don't have control of Spotify selectors, so my automation can be broken on each Spotify webpage update. I used the few "data-testid" that I found every time it was possible, but a lot of the selections are get with classes, ids, elements and texts. You can find the Cypress recommendations for selecting elements [here](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements).

Additionally, this initial version does not include support for running Cypress in headless mode.
