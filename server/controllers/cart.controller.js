import Cart from "../schemas/Cart.js";

const addCart = async (req, res) => {
    const { userId, products } = req.body
    try {
        const cart = await Cart.findOne({ userId: userId })
        await Cart.updateOne(
            { _id: cart._id },
            { $push: { products: products } }
        )
        res.status(200).send('카트에 저장되었습니다.')
    } catch (error) {
        console.log(error)
        res.status(500).send('카트에 저장할 수 없습니다.')
    }
}

const changeCart = async (req, res) => {
    const { userId, products } = req.body
    console.log(products)
    try {
        const cart = await Cart.findOne({ userId: userId })
        await Cart.updateOne(
            { _id: cart._id },
            { $set: { products: products } }
        )
        res.send("카트에 체크가 활성화되었습니다")
    } catch (error) {
        res.send("카트 체인지 실패")
    }
}

const showCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.id }).populate({
            path: 'products.productId',
            model: 'Product'
        })
        res.status(200).json(cart.products)
    } catch (error) {
        console.log(error)
        res.status(500).send('쇼핑카트를 불러오지 못했습니다.')
    }
}

const deleteCart = async (req, res) => {
    console.log(req.body)
    const { userId, cartId } = req.body
    try {
        const cart = await Cart.findOneAndUpdate(
            { userId: userId },
            { $pull: { products: { _id: cartId } } },
            { new: true }
        ).populate({
            path: 'products.productId',
            model: 'Product'
        })
        res.json(cart)
    } catch (error) {
        console.log(error)
        res.status(500).send('해당 카트를 삭제하지 못했습니다.')

    }
}
const deleteCart2 = async (req, res) => {
    console.log(req.body)
    const { userId, cartId } = req.body
    try {
        for (let i = 0; i < cartId.length; i++) {
            await Cart.findOneAndUpdate(
                { userId: userId },
                { $pull: { products: { _id: cartId[i] } } },
                { new: true }
            ).populate({
                path: 'products.productId',
                model: 'Product'
            })
        }
        res.send("주문완료 및 쇼핑카트에서 삭제")
    } catch (error) {
        console.log(error)
        res.status(500).send('해당 카트를 삭제하지 못했습니다.')

    }
}

const userById = async (req, res, next, id) => {
    try {
        const cart = await Cart.findOne({ userId: id })
        if (!cart) {
            res.status(404).send("사용자를 찾을 수 없습니다.")
        }
        req.cart = cart
        req.id = id
        next()
    } catch (error) {
        res.status(500).send("사용자 아이디 검색 실패")
    }
}


export default { addCart, changeCart, showCart, deleteCart, deleteCart2, userById }