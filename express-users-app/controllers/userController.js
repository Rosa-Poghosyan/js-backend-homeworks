const {readFile, writeFile} = require('fs/promises');

const getUsers = async () => {
    const content = await readFile("data/users.json", 'utf-8');
    if(!content) {
        return [];
    } else {
        return JSON.parse(content);
    }
}

const addUser = async (user) => {
    const users = await getUsers();
    users.push(user);
    await writeFile("data/users.json", JSON.stringify(users), 'utf-8');
}

module.exports = {getUsers, addUser}
