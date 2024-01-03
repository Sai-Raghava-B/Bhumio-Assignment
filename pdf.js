const fs = require('fs');
const PDFParser = require('pdf-parse');

async function comparePDFs(file1Path, file2Path) {
  const file1Data = await parsePDF(file1Path);
  const file2Data = await parsePDF(file2Path);

//   if (arePDFsIdentical(file1Data, file2Data)) {
//     console.log('Files are identical');
//   } else {
//     console.log('Files are different');
//     const diffLines = findDifference(file1Data.text, file2Data.text);
//     console.log('Difference of lines:', diffLines);
//   }
  if (file1Data.text === file2Data.text) {
    console.log('Files are identical');
  } else {
    console.log('Files are different');
    const lines1 = file1Data.text.split('\n');
    const lines2 = file2Data.text.split('\n');
    const diffLines = [];
    for (let i = 0; i < Math.min(lines1.length, lines2.length); i++) {
        if (lines1[i] !== lines2[i]) {
          diffLines.push(`Line ${i + 1}: ${lines1[i]} !==   ${lines2[i]}`);
        }
      }
    
    // const diffLines = findDifference(file1Data.text, file2Data.text);
    console.log('Difference of lines:', diffLines);
  }
}

async function parsePDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await PDFParser(dataBuffer);
  return data;
}

// function arePDFsIdentical(pdf1, pdf2) {
//   return pdf1.text === pdf2.text;
// }

// function findDifference(text1, text2) {
//   const lines1 = text1.split('\n');
//   const lines2 = text2.split('\n');

//   const diffLines = [];

//   for (let i = 0; i < Math.min(lines1.length, lines2.length); i++) {
//     if (lines1[i] !== lines2[i]) {
//       diffLines.push(`Line ${i + 1}: ${lines1[i]} !== ${lines2[i]}`);
//     }
//   }

//   return diffLines;
// }


const file1 = '1.pdf';
const file2 = '2.pdf';

comparePDFs(file1, file2);
