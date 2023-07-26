const express = require("express");
const app = express();
const pg = require("pg-promise")();
var cors = require("cors");

const PORT = 3000;
app.use(express.json());
app.use(cors());

const db = pg("postgresql://postgres:12345qwe@localhost:5432/tutorial");

function insertToTable(tablename, values = {}) {
  let columnNames = "(";
  let names = Object.keys(values).join(",");
  columnNames = columnNames + names + ")";

  let valueString = "('";
  let value = Object.values(values).join("','");
  valueString = valueString + value + "')";
  return `INSERT INTO ${tablename} ${columnNames} VALUES ${valueString} `;
}

const setupdb = async function () {
  await db.none(
    "CREATE TABLE IF NOT EXISTS topics (id serial PRIMARY KEY, topicname varchar(50), content varchar(500), author varchar(50))"
  );
  await db.none(
    "CREATE TABLE IF NOT EXISTS links (id serial PRIMARY KEY, topicId int, link varchar(500), author varchar(50))"
  );
};
app.get("/", async (req, res) => {
  res.send("homepage");
});

app.get("/topics", async (req, res) => {
  const topics = await db.any("SELECT * FROM topics");
  res.json(topics);
});

app.get("/topic/:id", async (req, res) => {
  let id = req.params.id;
  const topic = await db.one(`SELECT * FROM topics WHERE id = ${id}`);
  let topicLinks = [];
  try {
    topicLinks = await db.many(`SELECT * FROM links WHERE topicid = ${id}`);
  } catch (error) {}

  res.json({ ...topic, links: topicLinks });
});

app.post("/topic", async (req, res) => {
  console.log(req.body);
  let { topicname, content, author } = req.body;

  try {
    let insert = await db.any(
      insertToTable("topics", { topicname, content, author })
    );
    res.json({ created: true });
  } catch (error) {
    console.log(error);
    res.status(201).send("Error");
  }
  // Creating new Topic
});

app.post("/link", async (req, res) => {
  //Add link to post
  let { topicId, link, author } = req.body;

  try {
    let insert = await db.any(
      insertToTable("links", { topicId, link, author })
    );
    res.json({ created: true });
  } catch (error) {
    console.log(error);
    res.status(201).send("Error");
  }
});

app.delete("/topic/:id", async (req, res) => {
  let id = req.params.id;
  await db.none("DELETE FROM topics WHERE id = " + id);
  res.json({ deleted: true });
});

app.delete("/link/:id", async (req, res) => {
  let id = req.params.id;
  await db.none("DELETE FROM links WHERE id = " + id);
  res.json({ deleted: true });
});
app.listen(PORT, () => {
  //setupdb();

  console.log(`Server up and running on port : ${PORT}`);
});
