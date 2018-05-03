import Typed from 'typed.js';
import Papa from 'papaparse';
import Handlebars from 'handlebars';

require('handlebars');
require('handlebars/runtime');

var fs = require('fs');

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
            name: data[0].replace('.md', ''),
            initial:
              data[0].split(' ').length > 1
                ? data[0].split(' ')[0][0].toUpperCase() +
                  data[0].split(' ')[1][0].toUpperCase()
                : data[0][0].toUpperCase()
          });
        })
        .join('');
      document.getElementById('members').innerHTML = foo;
    }
  });
}
