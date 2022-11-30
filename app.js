const express = require("express");
const path = require("path");
const app = express();
let data = require('./data.json');
let jsonfile = require('jsonfile');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.use((err, req, res, next) => {
	logger.error(err.stack);
	res.status(500).send("Вы сломали сервер!");
});



app.use((err, req, res, next) => {
	if (error instanceof ForbiddenError) {
		return res.status(403).send({
			status: "forbidden",
			message: error.message,
		});
	}
});

app.get('/book', (req, res) => {
    res.status(200).type('text/plain')
    res.send(JSON.stringify(data, null, '\t'))
  })

  app.get('/book/:id', (req, res) => {
    res.status(200).type('text/plain')
    let id = req.params.id
    res.send(JSON.stringify(data[id], null, '\t'))
  })
  
  app.post('/book', (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const book = {
      id: data.length,
      name: req.body.name,
      author: req.body.author,
      year: req.body.year
    }
    jsonfile.readFile('data.json', (err, obj) => {
      if (err) throw err
      let fileObj = obj;
      fileObj.push(book);
      jsonfile.writeFile('data.json', fileObj, (err) => {
        if (err) throw err;
      })
      res.send(obj)
    })
  })

  app.put('/book/:id', function(req, res) {
    var id = req.params.id;
    var newText = req.body.text;

    jsonfile.readFile('data.json', function(err, obj) {
      var fileObj = obj;
      
      fileObj[id].text = newText;

      jsonfile.writeFile('data.json', fileObj, function(err) {
          if (err) throw err;
      });
    });
	res.json('Все нормально братанчик')
});

app.delete('/book/:id', (req, res) => {
	jsonfile.readFile('data.json', (err, obj) => {
	  if (err) throw err
	  let fileObj = obj;
	  for(let i = 0; i < fileObj.length; i++) {
		if (fileObj[i].id == req.params.id) {
		  fileObj.splice(i, 1)
		}
	  }
	  jsonfile.writeFile('data.json', fileObj, { spaces: 2 }, (err) => {
		if (err) throw err;
	  })
	  res.send(obj)
	})
  })




app.listen(3000)