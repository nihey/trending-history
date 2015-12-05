var fs = require('fs'),
    trending = require('github-trending');

trending(function(err, repositories) {
  if (err) {
    return console.error(err);
  }

  var history = require('../history');

  repositories.forEach(function(repository) {
    var language = repository.language || 'None';
    history[language] = history[language] || {};

    // If the repo is already on the history, return
    if (history[language][repository.url]) {
      return;
    }

    // Else add it
    history[language][repository.url] = {
      title: repository.title,
      owner: repository.owner,
      url: repository.url,
      description: repository.description,
      date: new Date(),
    };
  });

  // FIXME: Fix relative paths to a project-root-based path
  fs.writeFileSync('./history.json', JSON.stringify(history));
});
