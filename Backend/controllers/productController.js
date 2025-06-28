import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js';

//function for add product
const addProduct = async (req, res) => {
    try {

        const { description, category, price } = req.body
        const image = req.files.image && req.files.image[0]

        if (!image) {
            return res.status(400).json({ success: false, message: 'Image is required' });
        }

        const result = await cloudinary.uploader.upload(image.path, {
            resource_type: 'image',
        });

        const imageUrl = result.secure_url;

        const productData = {
            description,
            category,
            price: Number(price),
            image: imageUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData)
        await product.save()

        res.json({ success: true, message: "Product Added", imageUrl });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
//function for list product
const listProducts = async (req, res) => {

    try {
        const products = await productModel.find({});
        res.json({ success: true, products })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }

}

//function for remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }

}

//function for sigle product info
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }

}


export { listProducts, addProduct, removeProduct, singleProduct }