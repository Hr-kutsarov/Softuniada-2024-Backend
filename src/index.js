// src/index.js
const express = require('express');
const dotenv = require('dotenv');
const PDFDocument = require('pdfkit');
var bodyParser = require('body-parser')

dotenv.config();

const app = express();

const port = process.env.PORT;

const jsonParser = bodyParser.json()

// get /example
app.get('/example', (req, res) => {
  res.send('Express + TypeScript Server');
});

// get pdf
app.get('/', (req, res) => {
  const lorem = "Lorem ipsum dolor si amet."
  
  const doc = new PDFDocument();
  doc.fontSize(20);
  doc.text('Hello world!', 24, 24, {align: 'right'})
  

  doc.moveDown();
  doc.text(`This text is centered. ${lorem}`, {
    width: 410,
    align: 'center'
  }
  );

  doc
  .fillColor('green')
  .text(`This text is centered. ${lorem}`, {
    width: 666,
    align: 'right',
    justify: 'start'
  }
  );


// draw bounding rectangle
  doc.rect(doc.x, doc.x, doc.x, doc.y).stroke();
    doc.end();
    doc.pipe(res);
});


// get /blob
app.post('/', jsonParser, (req, res) => {
  const data = req.body
  console.log(data)

  const doc = new PDFDocument();
  doc.fontSize(24);
  doc.text(`${data.id} - ${data.name}`, 100, 100)
  doc.end();
  doc.pipe(res);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});