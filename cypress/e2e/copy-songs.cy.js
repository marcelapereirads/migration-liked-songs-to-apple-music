/// <reference types="Cypress" />

describe('Track songs from Spotify', () => {
  it('Track liked songs from Spotify', () => {
    const spotifyUsername = Cypress.env('spotifyUsername');

    if (!spotifyUsername) {
      throw new Error(
        'The Spotify username is required to track songs. Please refer to the readme.md for instructions.'
      );
    }

    cy.intercept('https://spclient.wg.spotify.com/ads/v2/config?market=PT', {});
    cy.visit('https://open.spotify.com/');

    cy.get('[data-testid="login-button"]').click();

    cy.get('#login-username').type(spotifyUsername);
  });
});
