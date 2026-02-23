import { openDB } from "../src/configDB.js";

export async function createTable() {
    openDB().then(async (db) => {
        db.exec(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL, name TEXT NOT NULL, fav_leader TEXT NOT NULL, UNIQUE (username)
        )`);
    })
}

export async function insertUser(username, password, email, name, fav_leader) {
    openDB().then(async (db) => {
        await db.run(`INSERT INTO users (username, password, email, name, fav_leader) VALUES (?, ?, ?, ?, ?)`, [username, password, email, name, fav_leader]);
    })
}

export async function editUser(id, username, password, email, name, fav_leader) {
    openDB().then(async (db) => {
        await db.run(`UPDATE users SET username = ?, password = ?, email = ?, name = ?, fav_leader = ? WHERE id = ?`, [username, password, email, name, fav_leader, id]);
    })
}

export async function deleteUser(id) {
    openDB().then(async (db) => {
        await db.get(`DELETE FROM users WHERE id = ?`, [id]);
    })
}

export async function loginUser(username, password) {
    return openDB().then(async (db) => {
        const user = await db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password]);
        return user;
    })
}

export async function getUserById(id) {
    return openDB().then(async (db) => {
        const user = await db.get(`SELECT * FROM users WHERE id = ?`, [id]);
        return user;
    })
}

export async function getAllUsers() {
    return openDB().then(async (db) => {
        const query = await db.get(`SELECT * FROM users`);
        return query
    })
}