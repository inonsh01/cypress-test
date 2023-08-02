
//INPUTS
const FILEPATH = "public/newFile1.pdf";
const EQ_FILEPATH = "public/newFile2.pdf";
const NOT_EQ_FILEPATH = "public/notEqFile.pdf";

describe("Compare PDF", () => {
    it("Should be able to verify same PDFs", () => {
        cy.readFile(FILEPATH, "base64").then((file1) => {
            cy.readFile(EQ_FILEPATH, "base64").then((file2) => {
                expect(file1).to.deep.equal(file2);
            });
        });
    });

    it("Should be able to verify not same PDFs", () => {
        cy.readFile(FILEPATH, "base64").then((file1) => {
            cy.readFile(NOT_EQ_FILEPATH, "base64").then((file2) => {
                expect(file1).to.not.equal(file2);
            });
        });
    });
});

export { };