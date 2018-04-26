// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'js/vendor.js': /^(?!app)/, // Files that are not in `app` dir.
      'js/vendor.js': /^node_modules/,
      'js/app.js': /^app/,
    }
  },
  stylesheets: {joinTo: 'css/app.css'}
};

exports.plugins = {
  babel: {presets: ['latest']}
};
