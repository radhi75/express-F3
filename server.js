const express = require("express");
const app = express();

const port = 7001;
app.use(express.json());
app.listen(port, console.log(`app is runnig on port ${port}`));

const path = require("path");

app.get("/", function (req, res) {
  res.send("hello world");
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "About.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.get("/Home.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Home.css"));
});

const students = [
  {
    id: 0,
    name: "youssef",
    age: 23,
  },
  {
    id: 1,
    name: "themer",
    age: 25,
  },
  {
    id: 2,
    name: "chedi",
    age: 19,
  },
];
app.get("/students", (req, res) => {
  try {
    res.send({ msg: "list of students", students });
  } catch (error) {
    console.log("could not get students");
  }
});
app.post("/add", (req, res) => {
  try {
    const newstudent = [...students, req.body];
    res.send({ msg: "new student", newstudent });
  } catch (error) {
    console.log("couldn't add students");
  }
});
app.delete("/del/:id", (req, res) => {
  try {
    const deleted = students.filter((student) => student.id != req.params.id);
    res.send({ msg: "deleted student", deleted });
  } catch (error) {
    console.log("couldn't delete student");
  }
});

app.put("/edit/:id", (req, res) => {
  try {
    const edit = students.map((student) =>
      student.id == req.params.id ? { ...student, ...req.body } : student
    );
    res.send({ msg: "student updated", edit });
  } catch (error) {
    console.log("couldn't update");
  }
});
