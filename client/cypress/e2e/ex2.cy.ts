//INPUTS
const USERNAME = "automatedUser26@example.com";
const PASSWORD = "4r4nd0mp4ssw0rd";
const CHEAPEST_PHONE = {
  PRICE: Infinity,
  LINK: {} as Element
}

const CHEAPEST_PHONE_CLASS_NAME = 'cheapest-phone';

// SELECTORS
const SELECTORS = {
  WEB_SITE: 'https://www.demoblaze.com/',
  LOGIN_BUTTON: "#login2",
  USERNAME_INPUT: "#loginusername",
  PASSWORD_INPUT: "#loginpassword",
  SUBMIT_BUTTON: "#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary",
  PHONE_CATEGORY: `[onclick="byCat('phone')"]`,
  PHONES_TABLE: "#tbodyid",
  CARD: ".card",
  NEXT_BUTTON: "#next2",
  CHEAPEST_PHONE: "." + CHEAPEST_PHONE_CLASS_NAME,
  ADD_TO_CART: ".col-sm-12 > .btn"
};

describe("Login", () => {
  beforeEach(() => {
    cy.visit(SELECTORS.WEB_SITE);
  });

  it("should login successfully", () => {
    cy.get(SELECTORS.LOGIN_BUTTON).click();
    cy.wait(500);
    cy.get(SELECTORS.USERNAME_INPUT).type(USERNAME);
    cy.get(SELECTORS.PASSWORD_INPUT).type(PASSWORD);
    cy.get(SELECTORS.SUBMIT_BUTTON).click();
  });

  it("should find the cheapest phone and add it to cart", () => {
    cy.get(SELECTORS.PHONE_CATEGORY).click().then(() => {
      cy.wait(500)
      findMinElement();
      cy.wait(500).then(() => {
        CHEAPEST_PHONE.LINK.classList.add(CHEAPEST_PHONE_CLASS_NAME);
        cy.get(SELECTORS.CHEAPEST_PHONE).click();
        cy.get(SELECTORS.ADD_TO_CART).click();

      })
    });
  });
});

export { };

function findMinElement() {
  cy.get(SELECTORS.PHONES_TABLE).then(($phonesList) => {
    $phonesList.each((index, $li) => {
      cy
        .wrap($li)
        .get(SELECTORS.CARD)
        .then((cards) => {
          for (let card of cards) {
            const cheapestPhoneLink = card.children[1].children[0].children[0];
            const cheapestPrice = Number(card.children[1].children[1].innerHTML.split('$')[1]);
            if (cheapestPrice < CHEAPEST_PHONE.PRICE) {
              CHEAPEST_PHONE.PRICE = cheapestPrice;
              CHEAPEST_PHONE.LINK = cheapestPhoneLink;
            }
          }
        })
    });
  })
}
