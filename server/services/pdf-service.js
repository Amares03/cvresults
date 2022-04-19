const PDFDocument = require("pdfkit");
const fs = require("fs");

const data = { fullName: "Amir" };

function buldPdf() {
  const pdf = new PDFDocument({ size: "A4" });

  pdf.pipe(fs.createWriteStream("output.pdf"));

  const fullWidth = 595.28;
  const fullHeight = 841.89;
  // fs.readFileSync(`${__dirname}./public/`);

  // pdf header content
  pdf.image(fs.readFileSync(`${__dirname}/public/header-img.png`), 0, 0, {
    height: 80,
    width: fullWidth,
  });

  pdf.fontSize(16).text("Laboratory eReport", 0, 150, {
    align: "center",
    width: fullWidth,
  });
  pdf
    .image(fs.readFileSync(`${__dirname}/public/men1.jpg`), 10, 180, {
      height: 130,
    })
    .fontSize(8)
    .text("*Photo not taken during sample collection", 20, 300);
  pdf
    .image(fs.readFileSync(`${__dirname}/public/rq_link.jpg`), 462, 185, {
      width: 110,
      height: 110,
    })
    .fontSize(8)
    .text("*Scan the code to verify result", 470, 300, {
      width: 120,
    });

  // Table -1 ***************************************************
  pdf.moveTo(380, 330).lineTo(380, 390).lineWidth(0);
  pdf.rect(20, 310, 555, 80).lineWidth(0).stroke();
  pdf.rect(20, 310, 555, 20).lineWidth(0).fillAndStroke("#0054A7");

  // ***************************************************
  pdf
    .font("Times-Bold")
    .fontSize(12)
    .fillColor("#fff")
    .text("Client Information", 25, 315);
  pdf.font("Times-Roman").fontSize(10).fillColor("#000").text("Name", 25, 335);
  pdf.fontSize(10).fillColor("#000").text("Passport", 25, 355);
  pdf.fontSize(10).fillColor("#000").text("Nationality", 25, 375);

  // ***************************************************
  pdf.font("Times-Bold").fontSize(12).text(data.fullName, 150, 335, {
    width: 120,
  });
  pdf.fontSize(12).text(data.passportNum, 150, 355, {
    width: 120,
  });
  pdf.fontSize(12).text(data.nationality, 150, 375, {
    width: 120,
  });
  // ***************************************************

  pdf.font("Times-Roman").fontSize(10).fillColor("#000").text("DOB", 385, 335);
  pdf.fontSize(10).fillColor("#000").text("Sex", 385, 355);
  pdf.fontSize(10).fillColor("#000").text("Phone", 385, 375);

  // ***************************************************
  pdf.font("Times-Bold").fontSize(12).text(data.dbo, 450, 335, {
    width: 120,
  });
  pdf.fontSize(12).text(data.sex, 450, 355, {
    width: 120,
  });
  pdf.fontSize(12).text(data.phone, 450, 375, {
    width: 120,
  });

  // Table -2 ***************************************************

  pdf
    .moveTo(380, 430)
    .lineTo(380, 470)
    .strokeColor("#000")
    .lineWidth(0)
    .stroke();
  pdf.rect(20, 410, 555, 60).lineWidth(0).stroke();
  pdf.rect(20, 410, 555, 20).lineWidth(0).fillAndStroke("#0054A7");

  // *********************************************************
  pdf
    .font("Times-Bold")
    .fontSize(12)
    .fillColor("#fff")
    .text("Specimen Information", 25, 415);

  pdf
    .font("Times-Roman")
    .fontSize(10)
    .fillColor("#000")
    .text("Specimen Type", 25, 435);
  pdf.fontSize(10).fillColor("#000").text("Collected location", 25, 455);
  // ***************************************************
  pdf
    .font("Times-Bold")
    .fillColor("#000")
    .fontSize(12)
    .text(data.specimenType, 150, 435, {
      width: 120,
    });
  pdf.fontSize(12).text(data.collectedLocation, 150, 455, {
    width: 120,
  });

  // ***************************************************

  pdf
    .font("Times-Roman")
    .fontSize(10)
    .fillColor("#000")
    .text("Sample ID", 385, 435);
  pdf.fontSize(10).fillColor("#000").text("Collected", 385, 455);

  // ***************************************************
  pdf
    .font("Times-Bold")
    .fillColor("#000")
    .fontSize(12)
    .text(data.sampleId, 450, 435, {
      width: 120,
    });
  pdf.fontSize(12).text(data.collectedDate, 450, 455, {
    width: 120,
  });

  // Table -3 *********************************************
  pdf.rect(20, 490, 555, 60).lineWidth(0).strokeColor("#000").stroke();
  pdf.rect(20, 490, 555, 20).lineWidth(0).fillAndStroke("#0054A7");
  // *********************************************************
  pdf
    .font("Times-Bold")
    .fontSize(12)
    .fillColor("#fff")
    .text("Test Result", 25, 495);

  pdf
    .font("Times-Roman")
    .fontSize(10)
    .fillColor("#000")
    .text("SARS COV-2 (RT-PCR)", 25, 515);
  pdf.fontSize(10).fillColor("#000").text("Reported time (GMT+3)", 25, 535);
  // ***************************************************
  pdf
    .font("Times-Bold")
    .fillColor("#000")
    .fontSize(12)
    .text(data.result, 200, 515, {
      width: 120,
    });
  pdf.fontSize(12).text(data.resultDate, 200, 535, {
    width: 120,
  });
  // Table -4 ***************************************************

  pdf.rect(20, 570, 555, 80).lineWidth(0).strokeColor("#000").stroke();
  pdf.rect(20, 570, 555, 20).lineWidth(0).fillAndStroke("#0054A7");

  // ***************************************************
  pdf
    .font("Times-Bold")
    .fontSize(12)
    .fillColor("#fff")
    .text("Test Information", 25, 575);
  pdf
    .font("Times-Roman")
    .fontSize(10)
    .fillColor("#000")
    .text("Test Performed By", 25, 595);
  pdf.fontSize(10).fillColor("#000").text("Result Reviewed By", 25, 615);
  pdf.fontSize(10).fillColor("#000").text("Test Method", 25, 635);

  // ***************************************************
  pdf.font("Times-Bold").fontSize(12).text(data.testPerformedBy, 200, 595, {
    width: 200,
  });
  pdf.fontSize(12).text(data.reviewedBy, 200, 615, {
    width: 200,
  });
  pdf.fontSize(12).text(data.testMethod, 200, 635, {
    width: 400,
  });
  // ***************************************************

  // Footer ********************************************
  pdf.image(fs.readFileSync(`${__dirname}/public/footer.png`), 10, 720, {
    height: 100,
    width: fullWidth - 25,
  });
  pdf
    .moveTo(0, fullHeight - 10)
    .lineTo(440, fullHeight - 10)
    .strokeColor("#0054A7")
    .lineWidth(10)
    .stroke();
  pdf
    .font("Times-Italic")
    .fontSize(12)
    .fillColor("#0054A7")
    .text("Turning Science to Care", 450, fullHeight - 15, {
      width: 150,
      height: 0,
    });
  pdf.end();

  // doc.on("data", dataCallback);
  // doc.on("end", endCallback);
}

module.exports = { buldPdf };
