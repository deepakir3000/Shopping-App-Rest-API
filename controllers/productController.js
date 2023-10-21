const ProductService = require("../service/productService");
const { compareSync, genSaltSync, hashSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

class productController {

    static async createProduct(req,res){
        try {
            if (!req.body.title) {
                return res.status(400).json({ message: "Title is required" });
            }
            let body = {
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                published: req.body.published ? req.body.published : false
            }
            console.log(body);
            const product= await ProductService.createProduct(body);
            res.status(200).json(product);
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({message :"Internal Server Error"});
        }
    }
    static async getAllProducts(req,res){
        try {
            const product= await ProductService.getAllProducts();
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({message :"Internal Server Error"});
        }
    }
    static async getOneProduct(req,res){
        try {
            const id = req.params.id
            const product= await ProductService.getOneProduct(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({message :"Internal Server Error"});
        }
    }
    static async updateProduct(req,res){
        try {
            const id = req.params.id
            let body = req.body
            const salt = genSaltSync(10);
            body.password = hashSync(body.password,salt)
            const product= await ProductService.updateProduct(body, id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({message :"Internal Server Error"});
        }
    }
    static async deleteProduct(req,res){
        try {
            const id = req.params.id
            await ProductService.deleteProduct(id);
            res.status(200).json({Message:"Product is Deleted"});
        } catch (error) {
            res.status(500).json({message :"Internal Server Error"});
        }
    }
    static async getPublishedProduct(req,res){
        try {
            const product= await ProductService.getPublishedProduct();
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({message :"Internal Server Error"});
        }
    }
    static async login(req,res){
        try {
            const {email,password} = req.body
            const user= await ProductService.getOneLogin(email);
            if(!user){
                return res.status(401).json({message: "Invalid email or password"})
            }
            const isPasswordValid = compareSync(password,user.password);
            if(!isPasswordValid){
                return res.status(401).json({message: "Invalid email or password"})
            }
            const token = sign({userId:user.id},"key123",{
                expiresIn: '1h'
            })
            return res.json({
                message: "Login Successfully",
                token : token
            })
        } catch (error) {
            res.status(500).json({message :"Internal Server Error"});
        }
    }
    static async registration(req,res){
        try {
            let body = {
                email: req.body.email,
                password: req.body.password
            }
            const salt = genSaltSync(10);
            body.password = hashSync(body.password,salt)
            console.log(body);
            const product= await ProductService.registration(body);
            res.status(200).json(product);
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({message :"Internal Server Error"});
        }
    }
}

module.exports=productController;