const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const dbService = require("./dbService");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create
app.post("/insert", async (request, response) => {
  try {
    const name = request.body.name;
    const pros = request.body.pros;
    const cons = request.body.cons;
    const rating = request.body.rating;
    console.log(request.body);

    const db = dbService.getDbServiceInstance();

    const result = await db.insertNewName(name, pros, cons, rating);

    response.json({ success: true });
  } catch (err) {
    console.log(err);
    response.status(500).json({ data: data, error: "An error occurred." });
  }
});
// read
app.get("/getAll", (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getAllData();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// update

app.get("/search/:name", (request, response) => {
  const { name } = request.params;
  const db = dbService.getDbServiceInstance();

  const result = db.searchByName(name);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => console.log("app is running"));
