
import bscrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Models/users.js'
import Leader from '../Models/leaders.js'

dotenv.config();


export async function insertUser(username, password, email, fav_leader) {
    if (!password) {
        return { message: 'Password is required', status: 400 };
    }

    const hashedPassword = await bscrypt.hash(password, 10);
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return { message: 'Email already in use', status: 400 };
    }
    const user = await User.create({ username, password: hashedPassword, email, fav_leader });
    
    try {
        await user.validate()
    } catch(error) {
        return { message: error.message, status: 400 };
    }
     
    try {
        await user.save()

        return { message: 'User created successfully', user };
    } catch(error) {
        return { message: error.message, status: 500 };
    }
}

export async function editUser(id, username, password, email, fav_leader) {
   
    const updates = { username, email, fav_leader };
    if (password) {
        updates.password = await bscrypt.hash(password, 10);
    }

    await User.update(updates, { where: { id } });
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
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '48h' });
    return { message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email, fav_leader: user.fav_leader } };
}

export async function getUserById(id) {
    const user = await User.findByPk(id, { attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }, include: 'leader' });
    
    if (!user) {
        return { message: 'User not found', status: 404 };
    }
    const result = {
        id: user.id,
        username: user.username,
        email: user.email,
        fav_leader: user.leader.name,
        leader_image: user.leader.image
    }

    return result;
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