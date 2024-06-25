const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

port = 5000;
hostName = "localhost";

var dataBase = [];

app.get("/data", (req, res, next) => {
  try {
    res.status(200).send(dataBase);
  } catch (err) {
    next(err);
  }
});

app.post("/data", (req, res, next) => {
  try {
    const bodyData = req.body;
    dataBase.push(bodyData);
    res.status(200).send(bodyData);
  } catch (err) {
    next(err);
  }
});

app.put("/data/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const updateddata = req.body;
    dataBase[id] = updateddata;
    res.status(200).send({
        message: 'Data Updated Successfully',
        id: id,
        updateddata : [updateddata]
    });
  } catch (err) {
    next(err);
  }
});

app.delete('/data/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        dataBase.splice(id, 1);
        res.status(200).send({
            message: `Data of id : ${id} deleted successfully`,
            deletedData: [dataBase[id]]
        })
    } catch(err) {
        next(err);
    }
})

app.use((req, res, next) => {
    res.status(404).send(`404 - Not Found. The endpoint ${req.method} ${req.originalUrl} does not exist.`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("internal server error");
});

app.listen(port, hostName, () =>
  console.log(`Server is running on http://${hostName}:${port}`)
);
