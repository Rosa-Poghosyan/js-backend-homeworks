const express = require("express");
const {getUsers, addUser} = require("./controllers/userController");

const app = express();
app.set("view engine", "pug")
app.set("views", "./views")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(4002, () => {
    console.log("Server is running on http://localhost:4002");
});

app.get('/', async (req, res) => {
    const users = await getUsers();
    res.render('home', {users})
});

app.get('/add', (req, res) => {
    res.render('add-user')
});

app.get('/users', async (req, res) => {
    const users = await getUsers();
    res.render('users',  {users});
});

app.post('/add', async (req, res) => {
    await addUser({id: Date.now(), ...req.body});
    res.redirect('/users');
});