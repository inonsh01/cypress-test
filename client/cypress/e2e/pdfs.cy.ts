const FILEPATH = "public/file.pdf";
const EQ_FILEPATH = "public/eqFile.pdf";
const NOT_EQ_FILEPATH = "public/notEqFile.pdf";

describe("Login", () => {
  it("Should be able to verify same PDFs", async () => {
    cy.readFile(FILEPATH, "utf8").then((file1) => {
      cy.readFile(EQ_FILEPATH, "utf8").then((file2) => {
        const buffer1 = Buffer.from(file1, "utf8");
        const buffer2 = Buffer.from(file2, "utf8");

        const isEqual = areArrayBuffersEqual(buffer1, buffer2);
        cy.log(`The files are ${isEqual ? "equal" : "not equal"}`);
      });
    });
  });
});

export {};

function areArrayBuffersEqual(buffer1: Buffer, buffer2: Buffer) {
  if (!(buffer1 instanceof Buffer && buffer2 instanceof Buffer)) {
    throw new Error("Arguments must be Buffer objects.");
  }

  if (buffer1.length !== buffer2.length) {
    return false;
  }

  for (let i = 0; i < buffer1.length; i++) {
    if (buffer1[i] !== buffer2[i]) {
      return false;
    }
  }

  return true;
}
