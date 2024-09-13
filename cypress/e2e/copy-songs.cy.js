/// <reference types="Cypress" />

describe('Track songs from Spotify', () => {
  it('Track liked songs from Spotify', () => {
    const username = Cypress.env('spotifyUsername');
    const password = Cypress.env('spotifyPassword');

    if (!username || !password) {
      throw new Error(
        'The Spotify username and password are required to track songs. Please refer to the readme.md for instructions.'
      );
    }

    cy.intercept('GET', 'https://spclient.wg.spotify.com/ads/v2/config?market=PT', {});
    cy.intercept('GET', 'https://open.spotify.com/undefined/api/v1/config/undefined', {});

    cy.visit('https://open.spotify.com/');

    // Accept cookies
    cy.get('#onetrust-accept-btn-handler').click();

    // Login
    cy.get('[data-testid="login-button"]').click();
    cy.get('#login-username').type(username);
    cy.get('#login-password').type(password);
    cy.get('#login-button').click();

    // Go to settings page and change language to English
    cy.get('[data-testid=user-widget-avatar]').click();
    cy.get('a[href="/preferences"]').click();

    // Remove an invisible div over the language dropdown
    cy.get('[data-testid="LayoutResizer__resize-bar"]').parent().invoke('remove');

    cy.get('.encore-announcement-set button').click();
    cy.get('select > option[value="en"]').parent().select('en', { force: true });
    cy.get('svg').contains('Spotify').first().click({ force: true });

    // Go to Liked Songs page
    cy.get('[class^=LegacyChip]').contains('Music').click();
    cy.get('a[title="Liked Songs"]').click({ force: true });

    // Get the amount of liked songs
    cy.contains('songs')
      .invoke('text')
      .then((text) => {
        const amountOfSongs = parseInt(text);
        let accumulatedScroll = 270;

        cy.get('[data-testid="top-sentinel"]').next().as('trackList');

        // For some reason, the list of songs in Spotify starts in 2
        for (let i = 1; i <= amountOfSongs; i++) {
          // For each row of the track list, get the text of the second column, containing song name and artist
          cy.get('@trackList')
            .find(`[aria-rowindex=${i + 1}] > [data-testid="tracklist-row"] > [aria-colindex="2"]`)
            .as('song')
            .find('[data-testid="internal-track-link"]')
            .as('songName')
            .invoke('text')
            .then(($songName) => {
              // To the artist, it is not possible to find the next element from the song, because, in the case of explicit content,
              // the 'E' icon is presented before the artist
              cy.get('@song')
                .find('a')
                .eq(1)
                .invoke('text')
                .then(($artist) => {
                  console.log(`${$songName} - ${$artist}`);
                });

              // Slowly scroll down the list, to load more songs while gets the song names
              const pixelsToScrollDown = 55;
              accumulatedScroll += pixelsToScrollDown;

              if (i % 5 === 0) {
                cy.get('div[data-overlayscrollbars-viewport*=overflowYScroll]').scrollTo(0, accumulatedScroll);
              }
            });
        }
      });
  });
});
