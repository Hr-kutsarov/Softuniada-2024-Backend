// src/index.js
const express = require('express');
const dotenv = require('dotenv');
const PDFDocument = require('pdfkit');
const moment = require('moment')
var bodyParser = require('body-parser');

dotenv.config();

const app = express();

const port = process.env.PORT;

const jsonParser = bodyParser.json()

// get /example
app.get('/example', (req, res) => {
  res.send('Express + TypeScript Server');
});

const x = {
  firstName: "John",
  lastName: "Wick",
  phoneNumber: "+23232323",
  address: "123 Str. LoremIpsum",
  color: "red",
  orientation: "L",
  width: "3",
  height: "3",
  quantity: "3",
  price: "123",
  description: "23",
  drillHoles: "3",
  hinges: "2",
  express: "express" 
}


const dateValue = moment().format('DD/MM/YYYY hh:mm');

const lorem = `As of today, Mr./Mrs. ${x.firstName} ${x.lastName}, with address ${x.address}, phone number: ${x.phoneNumber} has placed the following order.`;
const lorem2 = `Materials with color: ${x.color} ${x.quantity} piece/s with specified width: ${x.width} m. and height ${x.height} m.`
const lorem3 = `Drill holes: ${x.drillHoles}\nCuts: ${Number(x.quantity) * 2}\nHinges: ${x.hinges}\nOrientation: ${x.orientation === "L" ? "lengthwise" : "crosswise"}\n`

const priceCutting = () => {
  const PRICE = 1.49;
  return Number(x.quantity) * 2 * PRICE
}

const priceDrilling = () => {
  const PRICE = 0.99;
  return Number(x.drillHoles) * PRICE
}

const calcArea = () => {
  return Number(x.width) * Number(x.height) * Number(x.quantity)
}

const priceMaterial = () => {
  const area = calcArea()
  const price = area * Number(x.price)
  return !!price ? price : null
}

// TODO laminating service
const priceLamination = () => {
  // unknown yet multiplier for number of sides
  const x = '';
  // 

  return !!x ? x : 0
}

const finalPrice = () => {
  const xx = priceCutting();
  const xy = priceMaterial();
  const xz = priceDrilling();
  const yx = priceLamination();

  return (xx + xy + xz + yx).toFixed(2).toString()
}

// get pdf
app.get('/', (req, res) => {
  
  const doc = new PDFDocument({autoFirstPage: false, size: 'A4', layout: 'portrait', margins: {
      top: 50,
      bottom: 50,
      left: 72,
      right: 72

  }});
  // declare initial font size
  doc.fontSize(12);
  // create the first page
  doc.addPage({ margin: 50 })

  if (x.express === "express") {
    doc
    .polygon([20, 0], [20, 60], [160, 60], [160, 0])
    .fillAndStroke()
  }

  doc
  .fontSize(16)
  .font('Helvetica-Bold')
  .fillColor('#fff')
  .text('EXPRESS', 54, 24, {
    align: 'left',
    width: doc.width
  })

  doc
  .font('Helvetica')
  .fillColor('#666')
  .text(`Date: ${dateValue}`, 24, 24, {
    align: 'right',
    width: doc.width
  }).moveDown(3);
  
  doc
  .fontSize(24)
  .fillColor('#111')
  .text(`Order`, {
    width: doc.width,
    align: 'center'
  }
  );

  doc
  .fontSize(16)
  .fillColor('#666')
  .text(`No: ${x.phoneNumber}`, {
    width: doc.width,
    align: 'center'
  }
  ).moveDown(2)
  ;

  doc
  .fontSize(16)
  .fillColor('black')
  .text(lorem, {

  }
  ).moveDown(2);

  doc
  .fontSize(16)
  .fillColor('black')
  .text(lorem2)
  .moveDown(2);

  doc
  .fontSize(16)
  .fillColor('black')
  .text(lorem3, {
  }
  ).moveDown(5);

  doc
  .fontSize(20)
  .fillColor('black')
  .text(`Total price: ${finalPrice()} BGN`, {
  }
  );

    doc.end();
    doc.pipe(res);
});


// get /blob
app.post('/', jsonParser, (req, res) => {
  const data = req.body
  const doc = new PDFDocument({autoFirstPage: false, size: 'A4', layout: 'portrait', margins: {
    top: 50,
    bottom: 50,
    left: 72,
    right: 72

}});
doc.fontSize(12);
doc.addPage({margin: 50})
doc
.fillColor('#666')
.text(`${data.date}`, 24, 24, {
  align: 'right',
  width: doc.width
}).moveDown(5);

doc
.fontSize(24)
.fillColor('#111')
.text(`${data.name}`, {
  width: doc.width,
  align: 'center'
}
).moveDown(0.2);

doc
.fontSize(16)
.fillColor('#666')
.text(`${data.id}`, {
  width: doc.width,
  align: 'center'
}
)
.moveDown(2);

doc
.fontSize(16)
.fillColor('black')
.text(lorem.slice(0, 555), {
  width: doc.width,
  align: 'left',
  justify: 'end',
  continued: true
}
).moveDown(2)


// END of file
doc.end();
doc.pipe(res);

});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});