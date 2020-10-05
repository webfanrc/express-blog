exports.ps = function (request, response) {
  response.set("Content-Type", "application/pdf");
  response.sendFile(__dirname + '/public/pdf/PS-Xie+Ruochen.pdf');
};