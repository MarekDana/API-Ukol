const bodyParser = require("body-parser");
const request = require("request");
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  var formular = "<form action='/' method='post'>";
  formular += "<input type='text' name='mnozstvi' value='1' />";
  formular += "<select name='Mena1'>";
  formular += "<option value='USD'>Dolar</option>";
  formular += "<option value='GBP'>Libra</option>";
  formular += "<option value='EUR'>Euro</option>";
  formular += "<option value='ZAR'>Jihoafricky rand</option>";
  formular += "<option value='LTL'>Litevsky litas</option>";
  formular += "</select>";
  formular += "<select name='Mena2'>";
  formular += "<option value='GBP'>Libra</option>";
  formular += "<option value='USD'>Dolar</option>";
  formular += "<option value='EUR'>Euro</option>";
  formular += "<option value='ZAR'>Jihoafricky rand</option>";
  formular += "<option value='LTL'>Litevsky litas</option>";
  formular += "</select>";
  formular += "<select name='Rok'>";
  formular += "<option value='2000'>2000</option>";
  formular += "<option value='2001'>2001</option>";
  formular += "<option value='2004'>2004</option>";
  formular += "<option value='2008'>2008</option>";
  formular += "<option value='2010'>2010</option>";
  formular += "<option value='2012'>2012</option>";
  formular += "</select>";
  formular += "<button type='submit' name='button'>Prevod</button>";
  formular += "</form>";
  res.send("<h1>Konvertor men roku</h1>" + "Mnozstvi:" + formular);
});

app.post("/", function(req, res) {
  // urci hodnotu daneho mnozstvi dane meny v danem roce v mene jine
  // https://api.ratesapi.io/api/2008-01-01?base=USD
  var url = "https://api.ratesapi.io/api/";
  var mnozstvi = req.body.mnozstvi;
  var Mena1 = req.body.Mena1;
  var Mena2 = req.body.Mena2;
  var Rok = req.body.Rok;
  url += Rok;
  url += "-01-01?base=";
  url += Mena1;

  var options = {
    url: url,
    method: "GET"
  };

  request(url, function(error, response, body) {
    var data = JSON.parse(body);
    var cena;
    cena = data.rates[Mena2] * mnozstvi;
    cena = cena.toFixed(2);

    res.send(
      "<h1>Konvertor men roku</h1>" +
        "Hodnota " +
        mnozstvi +
        " " +
        Mena1 +
        " v roce " +
        Rok +
        " byla " +
        cena +
        " " +
        Mena2
    );
  });
});

app.listen(8080, function() {
  console.log("Server běží na portu 8080.");
});
