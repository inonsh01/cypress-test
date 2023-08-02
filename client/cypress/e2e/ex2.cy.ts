//INPUTS
const USERNAME = "automatedUser26@example.com";
const PASSWORD = "4r4nd0mp4ssw0rd";
const CHEAPEST_PHONE_CLASS_NAME = 'cheapest-phone';
const CHEAPEST_PHONE = {
  PRICE: Infinity,
  LINK: {} as Element
}

// SELECTORS
const LOGIN_SELECTORS = {
  LOGIN_BUTTON: "#login2",
  USERNAME_INPUT: "#loginusername",
  PASSWORD_INPUT: "#loginpassword",
  SUBMIT_BUTTON: "#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary",
}

const CHEAPEST_PHONE_SELECTORS = {
  WEB_SITE: 'https://www.demoblaze.com/',
  PHONE_CATEGORY: `[onclick="byCat('phone')"]`,
  PHONES_TABLE: "#tbodyid",
  CARD: ".card",
  NEXT_BUTTON: "#next2",
  CHEAPEST_PHONE: "." + CHEAPEST_PHONE_CLASS_NAME,
  ADD_TO_CART: ".col-sm-12 > .btn",
  CART: "#cartur",
};

//TESTS
describe("Exercise 2 - login & add to cart the cheapest phone", () => {
  beforeEach(() => {
    cy.visit(CHEAPEST_PHONE_SELECTORS.WEB_SITE);
  });

  it("should login successfully", () => {
    cy.get(LOGIN_SELECTORS.LOGIN_BUTTON).click();
    cy.wait(500);
    cy.get(LOGIN_SELECTORS.USERNAME_INPUT).type(USERNAME);
    cy.get(LOGIN_SELECTORS.PASSWORD_INPUT).type(PASSWORD);
    cy.get(LOGIN_SELECTORS.SUBMIT_BUTTON).click();
  });

  it("should find the cheapest phone and add it to cart", () => {
    //Enter to phones category
    cy.get(CHEAPEST_PHONE_SELECTORS.PHONE_CATEGORY).click().then(() => {
      cy.wait(500)

      //Find the cheapest phone in the list
      findMinElement();
      cy.wait(500).then(() => {

        //Add className to the cheapest phone link and click on it.
        CHEAPEST_PHONE.LINK.classList.add(CHEAPEST_PHONE_CLASS_NAME);
        cy.get(CHEAPEST_PHONE_SELECTORS.CHEAPEST_PHONE).click();

        //Add the cheapest phone to cart and get in it.
        cy.get(CHEAPEST_PHONE_SELECTORS.ADD_TO_CART).click();
        cy.get(CHEAPEST_PHONE_SELECTORS.CART).click();
      })
    });
  });
});

export { };

function findMinElement() {
  //Get the list of all the phones
  cy.get(CHEAPEST_PHONE_SELECTORS.PHONES_TABLE).then(($phonesList) => {
    $phonesList.each((index, $li) => {
      cy
        .wrap($li)
        .get(CHEAPEST_PHONE_SELECTORS.CARD)
        .then((cards) => {
          for (let card of cards) {
            //Get the href of the phone card
            const cheapestPhoneLink = card.children[1].children[0].children[0];

            //Get the price of the phone card
            const cheapestPrice = Number(card.children[1].children[1].innerHTML.split('$')[1]);

            //Save the cheapest phone card by price
            if (cheapestPrice < CHEAPEST_PHONE.PRICE) {
              CHEAPEST_PHONE.PRICE = cheapestPrice;
              CHEAPEST_PHONE.LINK = cheapestPhoneLink;
            }
          }
        })
    });
  })
}
