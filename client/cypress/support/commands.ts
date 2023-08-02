/// <reference types="cypress" />

const { PDFExtract } = require("pdf.js-extract");

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            extractTextFromPDF(filePath: string): Chainable<string>;
        }
    }
}


Cypress.Commands.add("extractTextFromPDF", (filePath: string) => {
    return cy.readFile(filePath, "binary").then((fileContent) => {
        const pdfExtract = new PDFExtract();
        return pdfExtract.extract(fileContent, {}).then((data: any) => {
            const text = data.pages.map((page: any) => page.content).join(" ");
            return text;
        });
    });
});

export { }
