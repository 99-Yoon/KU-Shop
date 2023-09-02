import Product from "../schemas/Product.js";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' })

const imageUpload = upload.fields([
    { name: 'main_image' },
    { name: 'detail_image' }
])

const regist = async (req, res) => {
    try {
        const { pro_name, price, stock, main_category, sub_category, description, colors, sizes } = req.body
        const main_img = req.files['main_image'][0]
        const detail_img = req.files['detail_image']
        const main_imgUrl = main_img.filename
        const detail_imgUrls = []
        detail_img.forEach(file => {
            detail_imgUrls.push(file.filename)
        })
        const newProduct = await new Product({
            pro_name, price, stock, main_category, sub_category, description, main_imgUrl, detail_imgUrls, colors, sizes
        }).save()
        res.json(newProduct)
    } catch (error) {
        res.status(500).send('제품 정보 등록에 실패하였습니다. 다시 진행해 주십시오.')
    }
}

const getToHome = async (req, res) => {
    try {
        const bestProduct = await Product.find({}).sort({ purchase: -1 }).limit(6)
        const newProduct = await Product.find({}).sort({ createdAt: -1 }).limit(6)
        res.json({ bestProduct, newProduct })
    } catch {
        res.status(500).send('상품을 불러오지 못했습니다.')
    }
}

const getAll = async (req, res) => {
    const per = 9;
    try {
        // 상품 검색
        if (req.query.product) {
            const totalCount = await Product.find({ pro_name: { $regex: new RegExp(req.query.product) } }).count()
            const productPiece = await Product.find({ pro_name: { $regex: new RegExp(req.query.product) } }).sort({ createdAt: -1 }).skip((req.query.page - 1) * per).limit(per)
            if (totalCount == 0) {
                res.status(404).send('상품을 찾을 수 없습니다.')
            } else {
                res.json({ productPiece, totalCount })
            }
        } else {
            const totalCount = await Product.find({}).count()
            const productPiece = await Product.find({}).sort({ createdAt: -1 }).skip((req.query.page - 1) * per).limit(per)
            res.json({ productPiece, totalCount })
        }
    } catch (error) {
        res.status(500).send('상품을 불러오지 못했습니다.')
    }
}

const getlist = (req, res) => {
    try {
        const productsPiece = req.productsPiece
        const length = req.length
        res.json({ productsPiece, length })
    } catch (error) {
        res.status(500).send('상품을 불러오지 못했습니다.')
    }
}


const categoryId = async (req, res, next, category) => {
    const per = 9;
    try {
        if (req.query.product) {
            const totalCount = await Product.find({ main_category: category, pro_name: { $regex: new RegExp(req.query.product) } }).count()
            const productsPiece = await Product.find({ main_category: category, pro_name: { $regex: new RegExp(req.query.product) } }).skip((req.query.page - 1) * per).limit(per)
            if (totalCount == 0) {
                res.status(404).send('상품을 찾을 수 없습니다.')
            } else {
                req.length = totalCount
                req.productsPiece = productsPiece
            }
        } else {
            const totalCount = await Product.find({ main_category: category }).count()
            req.length = totalCount
            const productsPiece = await Product.find({ main_category: category }).skip((req.query.page - 1) * per).limit(per)
            req.productsPiece = productsPiece
        }
        next()
    } catch (error) {
        res.status(500).send('상품을 불러오지 못했습니다.')
    }
}

const subname = async (req, res) => {
    const per = 9;
    try {
        const totalCount = await Product.find({ sub_category: req.query.subname }).count()
        const productsPiece = await Product.find({ sub_category: req.query.subname }).skip((req.query.page - 1) * per).limit(per)
        res.send({ productsPiece, totalCount })
    } catch (error) {
        res.status(500).send('상품을 불러오지 못했습니다.')
    }
}

const plusPurchase = async (req, res) => {
    const { products } = req.body
    try {
        for (let i = 0; i < products.length; i++) {
            const count = products[i].count
            const product = await Product.findOne(
                { _id: products[i].productId._id }
            )
            const purchase = product.purchase
            const stock = product.stock
            await Product.updateOne(
                { _id: products[i].productId._id },
                {
                    $set:
                    {
                        purchase: count + purchase,
                        stock: stock - count
                    }
                }
            )
        }
        res.send("구매수 늘리기, 재고수 줄이기 성공")
    } catch (error) {
        res.status(500).send('구매숫자를 늘리지 못함')
    }
}

const deletePro = async (req, res) => {
    const pro_id = req.query.pro_id
    try {
        const productOne = await Product.findById(pro_id)
        if (productOne) {
            await Product.remove({ _id: pro_id })
        }
        res.send('삭제 성공')
    } catch (error) {
        res.status(500).send('삭제할 상품을 찾지 못하거나 삭제 중 문제가 발생했습니다.')
    }
}

export default { imageUpload, regist, getToHome, getAll, categoryId, getlist, subname, plusPurchase, deletePro }