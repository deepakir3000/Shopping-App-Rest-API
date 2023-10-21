const db = require("../models");

const productModel = db.products
const userModel = db.users

class productService{

    static async createProduct(info){
        try {
           return  productModel.create(info);
        } catch (error) {
            throw error;
        }
    }
    static async getAllProducts(){
        try {
           return  productModel.findAll();
        } catch (error) {
            throw error;
        }
    }
    static async getOneProduct(id){
        try {
           return  productModel.findOne({ where: {id : id}});
        } catch (error) {
            throw error;
        }
    }
    static async updateProduct(data,id){
        try {
           return  productModel.update(data, { where: {id : id}});
        } catch (error) {
            throw error;
        }
    }
    static async deleteProduct(id){
        try {
           return  productModel.destroy({ where: {id : id}});
        } catch (error) {
            throw error;
        }
    }
    static async getPublishedProduct(id){
        try {
           return  productModel.findAll({ where: {published : true}});
        } catch (error) {
            throw error;
        }
    }
    static async registration(data){
        try {
           return  userModel.create(data);
        } catch (error) {
            throw error;
        }
    }
    static async getOneLogin(email){
        try {
           return  userModel.findOne({ where: {email : email}});
        } catch (error) {
            throw error;
        }
    }
}

module.exports=productService;