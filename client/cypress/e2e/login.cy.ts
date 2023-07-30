// SELECTORS
const SELECTORS = {
  USERNAME_INPUT: "[data-cy=USERNAME]",
  PASSWORD_INPUT: "[data-cy=PASSWORD]",
  LOGIN_BUTTON: "[data-cy=LOGIN_BUTTON]",
};

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should login successfully", () => {
    cy.get(SELECTORS.USERNAME_INPUT).type("bar");
    cy.get(SELECTORS.PASSWORD_INPUT).type("gay");
    cy.get(SELECTORS.LOGIN_BUTTON).click();
    cy.url().should("contain", "logged-in");
  });

  it("should not login", () => {
    cy.get(SELECTORS.USERNAME_INPUT).type("bar");
    cy.get(SELECTORS.PASSWORD_INPUT).type("mzabal");
    cy.get(SELECTORS.LOGIN_BUTTON).click();
    cy.url().should("contain", "not");
  });
});

export {};
