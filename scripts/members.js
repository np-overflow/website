const fs = require('fs');
const path = require('path');

const showdown = require('showdown');
const converter = new showdown.Converter();

const markdownDir = 'markdown_submissions';
const htmlDir = 'members';
const csvFile = 'members';

// https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
String.prototype.toProperCase = function() {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

function isMarkdown(file) {
  const ext = path.extname(file).toLowerCase();
  return ext == '.md';
}

function generateHtml(file) {
  fs.readFile(`markdown_submissions/${file}`, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const html = `
      <link rel="stylesheet" href="../../css/app.css">
      <div class="member-canvas">
      <a href="../../">&crarr;</a>
      ${converter.makeHtml(data)}
      </div>
    `;

    fs.mkdir(`public/${htmlDir}`, err => {
      if (err) {
        console.error(err);
        return;
      }

      const name = file.replace('.md', '');

      fs.mkdir(`public/${htmlDir}/${name}`, err => {
        if (err) {
          console.error(err);
          return;
        }

        fs.writeFile(`public/${htmlDir}/${name}/index.html`, html, err => {
            if (err) console.error(err);
        });
      });
    });
  });
}

function generateCsv(files) {
  const names = files
    .map(file => file.replace('_', ' '))
    .map(name => name.toProperCase());

  fs.writeFile(`public/${csvFile}.csv`, names.join('\n'), err => {
    if (err) console.error(err);
  });
}

fs.readdir(markdownDir, (err, files) => {
  files = files.filter(isMarkdown);
  files.forEach(generateHtml);
  generateCsv(files);
});
