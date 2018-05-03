var showdown = require('showdown'),
  fs = require('fs'),
  path = require('path'),
  converter = new showdown.Converter();

var targetFiles = fs.readdir('markdown_submissions/', (err, files) => {
  files.filter(file => path.extname(file).toLowerCase() == '.md').map(mapFile);
  fs.writeFile('public/members.csv', files.join('\n'));
});

var mapFile = x => {
  fs.readFile(`markdown_submissions/${x}`, 'utf-8', (err, data) => {
    if (err) console.log(err);
    var html =
      '<link rel="stylesheet" href="../../css/app.css"> <div class="member-canvas">' +
      '<a href="../../">&crarr;</a>' +
      converter.makeHtml(data) +
      '</div>';
    fs.mkdir('public/members', err => {
      fs.mkdir(`public/members/${x.replace('.md', '')}`, err => {
        // if (err) console.log(err);
        fs.writeFile(
          `public/members/${x.replace('.md', '')}/index.html`,
          html,
          err => {
            if (err) console.log(err);
          }
        );
      });
    });
  });
};
