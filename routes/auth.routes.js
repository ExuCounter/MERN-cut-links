const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некоректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({min: 6})
    ],
    async (req,res)=>{
    try {
        const errors = validationResult(req);

        if(!(errors.isEmpty)){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некоректные данные'
            })
        }

        const {email, password} = req.body;
        const candidate = await User.find({ email:email });

        if(candidate){
            return res.status(400).json({message: 'Такой пользователь уже создан'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword})

        await user.save();

        res.status(201).json({message: 'Пользователь создан'})

    } catch (e) {
        res.status(500).json({ message: `Something goes wrong`});
    }
})

router.post('/login', async (req,res)=>{
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
            .isLength({min: 6})
    ],
    async (req,res)=>{
        try {
            const errors = validationResult(req);

            if(!(errors.isEmpty)){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные при входе в систему'
                })
            }

            const {email, password} = req.body;

            const user = await User.findOne({ email });
            if(!user){
                return res.status(400).json({message: 'Пользователь не найден'})
            }

            const isMatch = bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({message: 'Неверный пароль'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так'})
        }
    }
})


module.exports = router;
