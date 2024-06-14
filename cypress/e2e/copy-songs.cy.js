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

    //* Accept cookies
    cy.get('#onetrust-accept-btn-handler', { timeout: 10000 }).click();

    //* Login
    cy.get('[data-testid="login-button"]').click();
    cy.get('#login-username').type(username);
    cy.get('#login-password').type(password);
    cy.get('#login-button').click();

    //* Go to settings page and change language to English
    cy.get('[data-testid=user-widget-avatar]').click();
    cy.get('a[href="/preferences"]').click();

    // Remove an invisible div over the language dropdown
    cy.get('[data-testid="LayoutResizer__resize-bar"]').parent().invoke('remove');
    cy.get('select > option[value="en"]').parent().select('en');
    cy.get('[data-testid="top-bar-back-button"]').click();

    //* Go to Liked Songs page
    cy.get('[class^=LegacyChip]').contains('Music').click();
    cy.get('a[title="Liked Songs"]').click({ force: true });
  });
});
