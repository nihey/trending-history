var fs = require('fs');
    history = require('../history'),
    Handlebars = require('handlebars');

var getMonth = function(date) {
  date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth() + 1);
};

Object.keys(history).forEach(function(key) {
  var language = history[key];
  var lastMonth = null;

  // Sort the repositories
  var repositories = Object.keys(language).sort(function(a, b) {
    a = language[a];
    b = language[b];
    return a.date.localeCompare(b.date);
  });

  // Prepare the data to be send to Handlebars
  repositories = repositories.map(function(key) {
    var repository = language[key];

    // if the last month differs from the current one, add a 'date' separator
    if (lastMonth !== getMonth(repository.date)) {
      lastMonth = getMonth(repository.date);
      repository.month = lastMonth;
      return repository;
    }
    return repository;
  });

  var template = fs.readFileSync('./templates/list.md').toString();
  template = Handlebars.compile(template);
  fs.writeFileSync('./histories/' + key + '.md', template({
    language: key,
    repositories: repositories,
  }));
});
