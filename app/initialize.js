import Typed from 'typed.js';

document.addEventListener('DOMContentLoaded', () => {
  // do your setup here
  console.log('Initialized app');

  var options = {
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

  var typed = new Typed(".element", options);
});
