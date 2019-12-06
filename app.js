const express = require('express');
const fs = require('fs');
// const body_parser = require('body-parser');
const port = process.env.PORT;
const app = express();
const dataPath = './dane.json';
const historyPath = './history.json';
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('witamy, api działa');
});

app.get("/data", (req, res) => {
  // let label = req.query.label;
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const parsedArr = JSON.parse(data).records;
    if (Object.keys(req.query).length !== 0) {
      let artist = req.query.artist;
      const artistResult = parsedArr.filter(record => record.artist.includes(artist));
      if (artistResult) {
        res.json(artistResult);
      } else {
        res.json({ message: `item ${artist} doesn't exist` })
      }
    }
    else {
      res.send(parsedArr);
    }
  });

});

app.get("/data/:id", (req, res) => {
  const recId = req.params.id;
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    };
    const parsedArr = JSON.parse(data).records;
    const recordResult = parsedArr.find(record => record.id == recId);
    if (recordResult) {
      res.json(recordResult);
    } else {
      res.json({ message: `item ${recId} doesn't exist` })
    }
  });
});

app.get("/history", (req, res) => {
  fs.readFile(historyPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    };
    const parsedHistory = JSON.parse(data);
    res.json(parsedHistory);
  });
});

app.post('/history', (req, res) => {
  const item = req.body;
  fs.readFile('./history.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      obj = JSON.parse(data);
      obj.history.push(item);
      json = JSON.stringify(obj);
      fs.writeFile('./history.json', json, 'utf8', () => {
        res.send('written');
      });
    }
  });
});

app.delete("/history/:id", (req, res) => {
  const historyId = req.params.id;
  console.log("Delete item with id: ", historyId);
  fs.readFile('./history.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      const parsedArr = JSON.parse(data).history;
      const filtered_list = parsedArr.filter(history => history.id !== historyId);
      parsedArr = filtered_list;
      if (historyResult) {
        json = JSON.stringify(historyResult);
        fs.writeFile('./history.json', json, 'utf8', () => {
          res.json('deleted');
        });
      } else {
        res.json({ message: `item ${itemId} doesn't exist` })
      }

    }
  });

});





app.listen(port, () => {
  console.log(`running on port ${port}`);
})

