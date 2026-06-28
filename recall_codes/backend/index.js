const express = require("express");
const cors = require("cors");
const connectDB = require("./db")


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    msg: "simple get call example",
  });
});

app.post("/add", (req, res) => {
  const { numbers } = req.body;
  const [a, b] = numbers
  console.log("body data :", req.body, "numberrs", numbers);
  return res.status(200).json({
    addition_is: a + b,
    msg: "sucessfull",
  });
});

app.get("/get_todos", async (req, res) => {
  const db = await connectDB();
  const sql = "select * from todos"
  const db_result= await db.execute(sql)
  console.log("all todos areee: ", db_result[0])
  return res.status(200).json(db_result[0])
})

app.listen(3000, () => {
  console.log("server is listening on 3000");
});
