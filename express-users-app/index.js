const express = require("express");

const app = express();
app.set("view engine", "pug")
app.set("views", "./views")

app.listen(4002, () => {
    console.log("Server is running on http://localhost:4002");
});

app.get('/', (req, res) => {
    const users = ["Rosa"]
    res.render('home', {users})
});

app.get('/add', (req, res) => {
    res.render('add-user')
});

app.get('/users', (req, res) => {
    const users = [
  { id: 1, name: "Alice", surname: "Johnson", email: "alice.johnson@example.com" },
  { id: 2, name: "Bob", surname: "Smith", email: "bob.smith@example.com" },
  { id: 3, name: "Charlie", surname: "Brown", email: "charlie.brown@example.com" },
  { id: 4, name: "Diana", surname: "Evans", email: "diana.evans@example.com" },
  { id: 5, name: "Ethan", surname: "Williams", email: "ethan.williams@example.com" }
]
    res.render('users',  {users})
});