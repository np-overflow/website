import Typed from 'typed.js';
import Papa from 'papaparse';
import Handlebars from 'handlebars';

require('handlebars');
require('handlebars/runtime');

document.addEventListener('DOMContentLoaded', () => {
  typed();
  papaparse();
});

// Banner auto-typing text
function typed() {
  const options = {
    strings: ["Welcome to NP's Hack Club", "Welcome to Uniql", "Welcome to Overflow"],
    startDelay: 1000,
    showCursor: true,
    cursorChar: '_',
    autoInsertCss: true,
    smartBackspace: true,
    backSpeed: 80,
    backDelay: 50,
    typeSpeed: 100
  }  
  new Typed(".element", options);
}

// Parsing and displaying of member list
function papaparse() {
  const template = Handlebars.compile(document.getElementById('avatar-template').innerHTML);
  Papa.parse("/members.csv", {
    download: true,
    complete: (res) => {
      document.getElementById('members').innerHTML = res.data.map((data) => {
        const splitted = data[0].split(' ');
        return template({
          name: data[0],
          initial: splitted.length > 1
            ? splitted[0][0].toUpperCase() + splitted[1][0].toUpperCase()
            : data[0][0].toUpperCase(),
        });
      }).join('');
    }
  }); 
}
