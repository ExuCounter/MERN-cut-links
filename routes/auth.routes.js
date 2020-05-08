const {Router} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = Router();
const {check, validationResult} = require('express-validator');

function dataRegisterValidation(){
    return [
        check('email', 'Введите корректный email').isEmail(),
        check('password', 'Введите пароль').isLength({min: 6})
    ]
}

function dataLoginValidation(){
    return  [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
            .isLength({min: 6})
    ]
}

// /api/auth/register
router.post(
    '/register',
    dataRegisterValidation(),
    async (req,res)=>{
    try {
        const errors = validationResult(req);
        console.log(errors)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некоректные данные',
            })
        }

        const {email, password} = req.body;

        const candidate = await User.find({ email });

        if(candidate.length){
            return res.status(400).json({message: 'Такой пользователь уже создан'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword})

        await user.save();

        res.status(201).json({message: 'Пользователь создан'})

    } catch (e) {
        res.status(500).json({ message: e.message});
    }
})

router.post(
    '/login',
    dataLoginValidation(),
    async (req,res)=>{
        try {
            const errors = validationResult(req);

            if(!(errors.isEmpty())){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные при входе в систему'
                })
            }

            const {email, password} = req.body;

            const user = await User.findOne({ email });
            console.log(user);

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
})


module.exports = router;
