import * as fs from "fs";
import axios from "axios";
export async function comparePdf(filePath1: string, filePath2: string) {
  console.log("sss");
  const data1 = await fetch(filePath1).then((response) =>
    response.arrayBuffer()
  );
  console.log("data1: ", data1);
  const data2 = await axios(filePath2);
  console.log("data2: ", data2);

  const dataBuffer1 = fs.readFileSync(filePath1);
  const dataBuffer2 = fs.readFileSync(filePath2);

  const isEqual = Buffer.compare(dataBuffer1, dataBuffer2) === 0;
  console.log("isEqual: ", isEqual);
  cy.log("isEqual: ", isEqual);
}
