beforeEach(() => {
  cy.intercept('GET', /\/articles$/, { fixture: 'articles' });
})

it('lists all posts on the main page', () => {
  cy.visit('/');
  cy.fixture('articles').then(({ articles }) => {
    for (const article of articles) {
      cy.findByRole('article', { name: article.title });
    }
  });
});

it('allows going to the page of a post from the main feed', () => {
  cy.visit('/');
  cy.fixture('articles').then(({ articles }) => {
    cy.findByRole('article', { name: articles[0].title }).within(() => {
      cy.findByRole('link', { name: /Read more/ }).click();
      cy.url().should('include', `/article/${articles[0].slug}`);
    });
  });
});

it('presents the title and the content of the post on its page', () => {
  cy.fixture('articles').then(({ articles }) => {
    cy.intercept('GET', `/articles/${articles[0].slug}`, articles[0]);

    cy.visit(`/article/${articles[0].slug}`);
    cy.findByRole('heading', { name: articles[0].title });
    cy.findByText(articles[0].body);
  });
});
