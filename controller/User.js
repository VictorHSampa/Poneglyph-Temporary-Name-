
import bscrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Models/users.js'

dotenv.config();


export async function insertUser(username, password, email, fav_leader) {
    const hashedPassword = await bscrypt.hash(password, 10);
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return { message: 'Email already in use', status: 400 };
    }
    const user = await User.create({ username, password: hashedPassword, email, fav_leader });
    
    try {
        await user.validate()
    } catch(error) {
        return res.status(400).json({ message: error.message })
    }
     
    try {
        await user.save()

        return { message: 'User created successfully', user };
    } catch(error) {
        return { message: error.message, status: 500 };
    }
}

export async function editUser(id, username, password, email, fav_leader) {
    
        const hashedPassword = await bscrypt.hash(password, 10);
        User.update({ username, password: hashedPassword, email, fav_leader }, { where: { id } });
        return { message: 'User updated successfully' };
}

export async function deleteUser(id) {
    const deletedUser = await User.destroy({ where: { id } });
    if (!deletedUser) {
        return { message: 'User not found', status: 404 };
    }
    return { message: 'User deleted successfully' };
}

export async function loginUser(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return { message: 'Email or password is incorrect', status: 404 };
    }
    const isPasswordValid = await bscrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return { message: 'Email or password is incorrect', status: 401 };
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email, fav_leader: user.fav_leader } };
}

export async function getUserById(id) {
    const user = await User.findByPk(id, { attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } });
    if (!user) {
        return { message: 'User not found', status: 404 };
    }
    return user;
}

export async function getAllUsers(req, res) {
    const { username, email, fav_leader, order } = req.query;
    const query = {};
    if (username) query.username = username;
    if (email) query.email = email;
    if (fav_leader) query.fav_leader = fav_leader;
    const users = await User.findAll({ where: query, order: order ? [[ order, 'ASC' ]] : undefined});
    return users;
}