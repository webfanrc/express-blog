exports.ps = function (request, response) {
  response.set("Content-Type", "application/pdf");
  response.sendFile(__dirname + '/public/pdf/PS-Xie+Ruochen.pdf');
};


exports.singleNew = function(request, response) {

  let file = request.files.file;

  console.log(file.name);
  file.mv('./public/' + file.name, function(err) {
    if (err)
      return response.status(500).send(err);

    response.send('File uploaded!');
  });

};