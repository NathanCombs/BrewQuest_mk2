require('dotenv').config();
var express = require("express");
var app = express();
var bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
var path = require("path");
var pg = require("pg");
var bodyParser = require("body-parser");
var conString = `postgres://whzthtsd:557eQz7GEjpsuuHh9iJxk9netuEFsXP9@baasu.db.elephantsql.com:5432/whzthtsd`;

app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

var client = new pg.Client(conString);

Array.prototype.asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    try {
      await callback(array[index], index, array)
    } catch (err) {
      throw (err)
    }
  }
}

var apostropheEscaper = (string) => {
  var output;
  var outputArray = []
  string.split("").forEach((value, index) => {
      if (value !== "'") {
          outputArray.push(value)
      }
      // why doesn't this work?
      // } else {
      //     outputArray.push("\\'")
      // }
  })
  output = outputArray.join("")
  return (output)
}

client.connect(function (err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  } else {
    console.log("DB connection successful");
    app.listen(5000, () => {
      console.log(`Server started on port ${5000}`)
    })
  }
});

app.post("/signup", (req, res) => {
  if (req.body.username.length && req.body.password.length) {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      client.query(`INSERT INTO users (username, password) VALUES ('${req.body.username}', '${hash}')`)
        .then(i => {
          var token = jwt.sign(req.body.username, ('Secret'), {
          });
          res.json({
            message: "Account Created",
            token: token
          })
        }).catch(error => {
          res.json({
            message: 'Error creating account'
          })
        });
    })
  } else {
    res.json({
      message: 'Must enter username and password'
    })
  }
})

app.post("/signin", (req, res) => {
  client.query(`SELECT password FROM users WHERE username='${req.body.username}'`)
    .then(result => {
      bcrypt.compare(req.body.password, result.rows[0].password, (err, success) => {
        if (success) {
          var token = jwt.sign(req.body.username, ('Secret'), {
          });
          res.json({
            message: "Welcome Back!",
            token: token
          })
        } else {
          res.json({
            message: 'Login Failed'
          })
        }
      })
    }).catch(error => { res.json({ message: 'Login Failed' }) });
})

app.post("/addBrewData", async (req, res) => {
  console.log(req.body.data.length)
  try {
    await req.body.data.asyncForEach(req.body.data, (brewery) => {
      if (brewery.isClosed === 'N' && brewery.openToPublic === 'Y' && brewery.brewery.images) {
        let breweryName = apostropheEscaper(brewery.brewery.name)
        client.query(`INSERT INTO breweries VALUES (
        '${brewery.id}', 
        '${breweryName}', 
        '${brewery.streetAddress}', 
        '${brewery.locality}', 
        '${brewery.region}', 
        '${brewery.brewery.images.icon}'
        ) ON CONFLICT DO NOTHING`);
      }
    })
    res.json({
      message: 'success'
    })
  } catch (err) {
    console.log(err)
    res.json(err)
  }
});

app.post("/fetchBrewData", (req, res) => {
  client.query(`SELECT * FROM breweries WHERE locality='${req.body.locality}' AND region='${req.body.region}'`).then((result) => {
    res.json(result.rows)
  })
})

app.post("/fetchUserData", (req, res) => {
  let decoded = jwt.verify(req.body.token, "Secret")
  client.query(`SELECT breweries_visited FROM users WHERE username='${decoded}'`).then((result) => {
    res.json(result.rows)
  })
})

app.post("/updateUserData", async (req, res) => {
  try {
    let decoded = await jwt.verify(req.body.token, "Secret")
    await client.query(`UPDATE users SET breweries_visited=array_append(breweries_visited, '${req.body.id}') WHERE username='${decoded}'`)
    let userData = await client.query(`SELECT breweries_visited FROM users where username='${decoded}'`)
    console.log(userData.rows)
    await res.json(userData.rows)
  } catch (err) {
    res.json(err)
  }
})