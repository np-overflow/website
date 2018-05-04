import Typed from 'typed.js';
import Papa from 'papaparse';
import Handlebars from 'handlebars';

require('handlebars');
require('handlebars/runtime');

var fs = require('fs');

// https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
String.prototype.toProperCase = function() {
  return this.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  typed();
  members();
});

function typed() {
  const options = {
    strings: [
      "Welcome to NP's Hack Club",
      'Welcome to Uniql',
      'Welcome to Overflow'
    ],
    startDelay: 1000,
    showCursor: true,
    cursorChar: '_',
    autoInsertCss: true,
    smartBackspace: true,
    backSpeed: 80,
    backDelay: 50,
    typeSpeed: 100
  };
  new Typed('.element', options);
}

function members() {
  var template = Handlebars.compile(
    document.getElementById('avatar-template').innerHTML
  );

  Papa.parse('/members.csv', {
    download: true,
    complete: res => {
      console.log(res);
      let foo = res.data
        .map(data => {
          return template({
            name: data[0]
              .replace('_', ' ')
              .replace('.md', '')
              .toProperCase(),
            path: data[0],
            initial:
              data[0].split('_').length > 1
                ? data[0].split('_')[0][0].toUpperCase() +
                  data[0].split('_')[1][0].toUpperCase()
                : data[0][0].toUpperCase()
          });
        })
        .join('');
      document.getElementById('members').innerHTML = foo;
    }
  });
}
