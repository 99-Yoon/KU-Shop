import Cart from "../schemas/Cart.js";
import User from "../schemas/User.js";
import isLength from 'validator/lib/isLength.js';
import bcrypt from 'bcryptjs';
import multer from "multer";
import Order from "../schemas/Order.js";

const uploadimg = multer({ dest: 'uploads/' });

const imgUpload = uploadimg.fields([
    { name: 'avatar', maxCount: 1 }
])

const username = (req, res) => {
    res.json(req.account)
}

const userById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).send('사용자를 찾을 수 없습니다')
        }
        req.account = user
        next()
    } catch (error) {
        console.log(error);
        res.status(500).send('사용자 아이디 검색 실패')
    }
}

const signup = async (req, res) => {
    const { name, birth, sex, id, password, tel, email } = req.body
    try {
        if (!isLength(password, { min: 8, max: 15 })) {
            return res.status(422).send('비밀번호는 8-15자리로 입력해주세요.')
        }
        const user = await User.findOne({ id })
        if (user) {
            return res.status(422).send(`${id}가 이미 사용중입니다.`)
        }
        const hash = await bcrypt.hash(password, 10)
        const newUser = await new User({
            name,
            birth,
            sex,
            id,
            password: hash,
            tel,
            email
        }).save()
        await new Cart({ userId: newUser._id }).save()
        console.log(newUser)
        res.json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).send('죄송합니다. 다시 입력해 주십시오.')
    }
}

const update = async (req, res) => {
    try {
        if (req.body.avatar == '') {
            const user = req.account
            user.avatarUrl = req.body.avatar
            const updateUser = await user.save()
            res.json(updateUser)
        } else {
            const avatar = req.files['avatar'][0]
            const user = req.account
            user.avatarUrl = avatar.filename
            const updateUser = await user.save()
            res.json(updateUser)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('이미지 업데이트 실패')
    }
}

const addorder = async (req, res) => {
    const { userId } = req.body
    try {
        const order = await Order.find({ userId: userId }).populate({
            path: 'products.productId',
            model: 'Product'
        })
        res.status(200).json(order)
    } catch (error) {
        console.log(error)
        res.status(500).send('주문현황을 불러오지 못했습니다.')
    }
}

export default { signup, username, imgUpload, userById, update, addorder }