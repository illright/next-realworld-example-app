it('redirects to the sign-in page when trying to like a post unauthenticated', () => {
  cy.visit('/');
  cy.fixture('articles').then(({ articles }) => {
    const firstPost = articles[0];
    cy.findByRole('article', { name: firstPost.title }).within(() => {
      cy.findByRole('button', { name: /Like/ }).click();
    });
    cy.url().should('include', '/user/login');
  });
});
