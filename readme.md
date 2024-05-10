# Migration liked songs from Spotify to Apple Music

The objective of this project is to facilitate a smooth transition from Spotify to Apple Music. The plan is to compile a list of all the names of my "Liked Songs" on Spotify, including the songs and artists. Once the list is generated, it will access Apple Music to locate and add these songs to my library.

## Getting Started

To initiate the migration, please execute the following script, replacing "{{my-username}}" with your email or Spotify username.

> npm run start spotifyUsername={{my-username}}

## Limitations

In the initial version of the application, logging in to Spotify requires using an email and password. Authentication via Google, Facebook, or Apple accounts will not be supported in this release. Future updates may introduce support for additional login methods.
Additionally, this initial version does not include support for running Cypress in headless mode.
