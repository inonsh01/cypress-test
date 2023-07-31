/// <reference types="cypress" />
import { comparePdf } from "./script";

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      comparePdf(filePath1: string, filePath2: string): Chainable<boolean>;
    }
  }
}

Cypress.Commands.add("comparePdf", (filePath1: string, filePath2: string) => {
  return comparePdf(filePath1, filePath2);
});
