const sampleUsername = 'username';
const sampleEmail = 'sample@email.com';
const samplePassword = 'password';
const sampleToken = 'sample-token';

it('allows signing up with a username, e-mail and password', () => {
  cy.intercept({
    url: 'https://conduit.productionready.io/api/users',
    method: 'POST',
  }, {
    user: {
      bio: null,
      email: sampleEmail,
      image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
      token: sampleToken,
      username: sampleUsername,
    }
  }).as('signUpRoute');

  cy.visit('/');
  cy.findByRole('link', { name: /Sign up/ }).click();
  cy.url().should('include', '/user/register');

  cy.findByRole('textbox', { name: 'Username' }).type(sampleUsername);
  cy.findByRole('textbox', { name: 'Email' }).type(sampleEmail);
  // See https://github.com/testing-library/dom-testing-library/issues/567
  cy.findByLabelText('Password').type(samplePassword);

  cy.findByRole('button', { name: 'Sign up' }).click();

  cy.wait('@signUpRoute').then(({ request }) => {
    expect(request.body).to.have.property('user');
    expect(request.body.user.username).to.be.equal(sampleUsername);
    expect(request.body.user.email).to.be.equal(sampleEmail);
    expect(request.body.user.password).to.be.equal(samplePassword);
  });
  cy.url().should('not.include', '/user/register');
});
