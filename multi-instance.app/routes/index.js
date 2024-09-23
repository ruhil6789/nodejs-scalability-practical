const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');
const UserRepository = require('../repositories/userRepository');

const userService = new UserService(new UserRepository());


router.get('/users/:id', async (req, res) => {
    const user = await userService.getUser(req.params.id);
    res.json(user);
});

module.exports = router;