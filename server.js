const sqlite3 = require('sqlite3').verbose()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const db = new sqlite3.Database('db.sqlite3')

db.serialize( () => {
	// инфо по событиям
	db.run("CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, place TEXT NOT NULL, date TEXT NOT NULL)")
})

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
app.use(express.static('html'))

// добавление события
app.put('/put', function (req, res) {
	console.log(req.body)
	db.run("INSERT INTO events (name, description, place, date) VALUES (?, ?, ?, ?) ", req.body.name, req.body.description, req.body.place, req.body.date)
	res.end()
})

app.post('/get', function (req, res) {
	let json = []
	db.each("SELECT * FROM events", (e, r) => {
		if(typeof r === undefined) return
		json.push(r)

	}, (err, count) => {
		if (err) 
			console.log(err)
		else{
			res.json(json)
		}
	})
})

app.listen(80, function () {
	console.log('Example app listening on port 80!');
})








/* //Пример запроса на добавление
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/put",
  "method": "PUT",
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  "data": {
    "name": "Карнавальная вечеринка мясников",
    "description": "далекие далеки",
    "date": "сегодня",
    "place": "в парке"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response)
})

*/

/*
// Получение
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/get",
  "method": "POST"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

*/