
//INPUTS
const FILEPATH = "public/file.pdf";
const EQ_FILEPATH = "public/eqFile.pdf";
const NOT_EQ_FILEPATH = "public/notEqFile.pdf";

describe("Exercise 1 - Compare PDF", () => {
    it("Should be able to verify same PDFs", () => {
        cy.readFile(FILEPATH, "utf-8").then((file1) => {
            cy.readFile(EQ_FILEPATH, "utf-8").then((file2) => {
                expect(file1).to.deep.equal(file2);
            });
        });
    });

    it("Should be able to verify not same PDFs", () => {
        cy.readFile(FILEPATH, "utf-8").then((file1) => {
            cy.readFile(NOT_EQ_FILEPATH, "utf-8").then((file2) => {
                expect(file1).to.not.equal(file2);
            });
        });
    });
});

export { };