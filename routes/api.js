const express = require('express');
const router = express.Router();
const dbUsers = require('../db/dbUsers');
const User = require("../model/User");
const passport = require("passport");

router.get('/login', (req, res)=>{
    const {type}=req.query;
    if(type==='signup'){
        res.render('form', {
            title: 'Регистрация',
            type: 'reg'
        })
        return;
    }
    res.render('form',{
        title: "Авторизация",
        type: 'log'
    })
});

router.get('/me', (req, res)=>{
    console.log('me')
});

router.post('/login',
    passport.authenticate('local', {
        session: true,
        failureRedirect: '/api/user/api'
    }),
    (req, res)=>{
        console.log(req.user)
        res.redirect('/me')
});

router.post('/signup', async (req, res)=>{
    const {name, login, password, confirm} = req.fields;
    const user = dbUsers.findOne('login', login);
    if(user.status){
        return res.status(409).render('modal', {
            title: 'Ошибка',
            message: 'Такой пользователь уже существует'
        })
    }else if(password!==confirm){
        return res.status(409).render('modal', {
            title: 'Ошибка',
            message: 'Пароли должны совпадать'
        })
    }else{
      const newUser = new User(name, login, password);
      await newUser.hashPassword();
      const responseDb = dbUsers.addDB(newUser);
      res.status(201).render('modal', {
          title: 'Успешно',
          message: responseDb.msg
      })
    }
});

module.exports = router;
