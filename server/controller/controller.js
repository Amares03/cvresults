var userdb = require("../model/model");
var path = require("path");
const pdfService = require("../services/pdf-service");

var options = {
  base: "http://localhost:8080", // or use: req.protocol + '://' + req.get('host')
  format: "A4",
  orientation: "portrait",
  border: "5mm",
};

let pdfDocument = {
  html: "",
  data: {},
  type: "buffer", // "stream" || "buffer" || "" ("" defaults to pdf)
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "user cannot be emity" });
  }
  const user = new userdb({
    fullName: req.body.fullName,
    passportNum: req.body.passportNum,
    requestedDate: req.body.requestedDate,
    collectedDate: req.body.collectedDate,
    dbo: req.body.dbo,
    nationality: req.body.nationality,
    phone: req.body.phone,
    resultDate: req.body.resultDate,
    reviewedBy: req.body.reviewedBy,
    sampleId: req.body.sampleId,
    sex: req.body.sex,
  });

  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "error while saving" + err });
    });
};

exports.find = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "user cannot be emity" });
  }
  const id = req.params.id;
  userdb
    .findById(id)
    .then((data) => {
      res.render("index", { user: data });
    })
    .catch((err) => {
      res.status(500).render("errorpage" + err);
    });
};

exports.detail = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "user cannot be emity" });
  }
  const id = req.params.id;
  userdb
    .findById(id)
    .then((data) => {
      res.render("detail", { user: data });
    })
    .catch((err) => {
      res.status(500).render("errorpage" + err);
    });
};

exports.findSample = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "user cannot be emity" });
  }
  const id = req.params.id;
  userdb
    .find({ sampleId: id })
    .then((data) => {
      res.render("index", { user: data[0] });
    })
    .catch((err) => {
      res.status(500).render("errorpage" + err);
    });
};

exports.pdfGenerate = (req, res, next) => {
  if (!req.body) {
    res.status(400).send({ message: "user cannot be emity" });
  }
  const id = req.params.id;
  userdb
    .findById(id)
    .then((data) => {
      //   res.setHeader("Content-Type", "application/pdf");
      //   res.setHeader("Content-Disposition", "attachment;filename=invoice.pdf");
      //   res.writeHead(200, {
      //     "Content-Type": "application/pdf",
      //     "Content-Disposition": "attachment;filename=invoice.pdf",
      //   });
      console.log("gettted here");
      pdfService.buldPdf();
      console.log("pdf generated");
    })
    .catch((err) => {
      res.status(500).render("errorpage");
      pdfService.buldPdf();
    });
};
