import { openDB } from "../src/configDB.js";
import bscrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function createTable() {
    openDB().then(async (db) => {
        db.exec(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL, name TEXT NOT NULL, fav_leader TEXT NOT NULL, UNIQUE (username)
        )`);
    })
}

export async function insertUser(username, password, email, name, fav_leader) {
    const userExists = await openDB().then(async (db) => {
        const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email]);
        return user;
    })
    if (userExists) {
       return { message: 'Email already exists', status: 400 };
    }
    const hashedPassword = await bscrypt.hash(password, 10);
    openDB().then(async (db) => {
        await db.run(`INSERT INTO users (username, password, email, name, fav_leader) VALUES (?, ?, ?, ?, ?)`, [username, hashedPassword, email, name, fav_leader])
        return { message: 'User registered successfully', status: 201 };
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

export async function loginUser(email, password) {
    const user = await openDB().then(async (db) => {
        const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email]);
        return user;
    })
    if (!user) {
        return { message: 'Email or password is incorrect', status: 404 };
    }
    const isPasswordValid = await bscrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return { message: 'Email or password is incorrect', status: 401 };
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email, name: user.name, fav_leader: user.fav_leader } };
}

export async function getUserById(id) {
    return openDB().then(async (db) => {
        const user = await db.get(`SELECT * FROM users WHERE id = ?`, [id]);
        return user;
    })
}

export async function getAllUsers() {
    return openDB().then(async (db) => {
        const query = await db.all(`SELECT * FROM users`);
        return query
    })
}