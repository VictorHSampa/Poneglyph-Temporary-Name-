import { insertUser, editUser, deleteUser, loginUser, getUserById, getAllUsers } from '../controller/User.js';
import express from 'express';
import { Router } from 'express';
const userRouter = Router();

userRouter.post('/register', async (req, res) => {
    const result = insertUser(req.body.username, req.body.password, req.body.email, req.body.name, req.body.fav_leader);
    res.status(result.status || 201).json({result});
})

userRouter.put('/edit/:id', async (req, res) => {
    editUser(req.params.id, req.body.username, req.body.password, req.body.email, req.body.name, req.body.fav_leader);
    res.status(200).json({
        message: 'User updated successfully',
        user: req.body.username,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
        fav_leader: req.body.fav_leader
    });
})

userRouter.delete('/delete/:id', async (req, res) => {
    await deleteUser(req.params.id);
    res.status(200).json({
        message: 'User deleted successfully'
    });
})

userRouter.get('/profile', async (req, res) => {
    const user = await getUserById(req.body.id);
    if (user) {
        res.status(200).json({
            user: user
        });
    } else {
        res.status(404).json({
            message: 'User not found'
        });
    }
})

userRouter.get('/allUsers', async (req, res) => {
    let users = await getAllUsers();
    const result = users.map(user => {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            fav_leader: user.fav_leader
        }
    })
    res.status(200).json({
        result
    });
})

userRouter.get('/login', async (req, res) => {
    const result = await loginUser(req.body.email, req.body.password);
    res.status(result.status || 200).json(result);
})

export default userRouter;