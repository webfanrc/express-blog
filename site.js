exports.index = function(req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + '/' + '</small>'
  res.send(responseText)
};