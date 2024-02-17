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


const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;';

// get pdf
app.get('/', (req, res) => {
  
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
  .text('Date: 01.01.2024', 24, 24, {
    align: 'right',
    width: doc.width
  })
  

  doc.moveDown(5);


  doc
  .fontSize(24)
  .fillColor('#111')
  .text(`Example name of PDF file`, {
    width: doc.width,
    align: 'center'
  }
  ).moveDown(0.2);

  doc
  .fontSize(16)
  .fillColor('#666')
  .text(`123-abC`, {
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
  ).moveDown(0.3);


  // draw bounding rectangle
  // doc.rect(doc.x, doc.x, doc.x, doc.y).stroke();
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
).moveDown(0.3);

doc.end();
doc.pipe(res);

});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});