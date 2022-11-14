import mongoose from "mongoose";
import DBMongoDB from "./DBMongoDB.js";

// Esquema del documento Product
const productSchema = mongoose.Schema(
    {
        image: String,
        name: String,
        brand: String,
        category: String,
        shortdescription: String,
        longdescription: String,
        freeshipping: String,
        agetype: String,
        minage: Number,
        maxage: Number,
        price: Number,
        stock: Number,
        quantity: Number
    }
);

// Modelo del documento almacenado en una colección
const ProductsModel = mongoose.model('products', productSchema);

class ProductModelMongoDB {

    // CRUD - C: CREATE
    async createProduct(product) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const newProduct = new ProductsModel(product);
            await newProduct.save();
            return DBMongoDB.getObjectWithId(newProduct.toObject());
        } catch (error) {
            console.error(`Error al intentar dar de alta el producto: ${error.message}`);
            return {};
        }
    }

    // CRUD - R: READ
    async readProducts() {
        if (! await DBMongoDB.connectDB()) {
            return [];
        }
        try {
            const products = await ProductsModel.find({}).lean();
            return DBMongoDB.getObjectWithId(products);
        } catch (error) {
            console.error(`Error al intentar obtener los productos: ${error.message}`);
            return [];
        }
    }

    async readProduct(id) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const product = await ProductsModel.findOne({idProduct: id}).lean() || {};
            console.log(DBMongoDB.getObjectWithId(product))
            return DBMongoDB.getObjectWithId(product);
        } catch (error) {
            console.error(`Error al intentar obtener el producto: ${error.message}`);
            return {};
        }
    }

    // CRUD - U: UPDATE
    async updateProduct(id, product) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const updatedProduct = await ProductsModel.findByIdAndUpdate(id, {$set: product}, {
                returnDocument: 'after'
            }).lean();
            return DBMongoDB.getObjectWithId(updatedProduct);
        } catch (error) {
            console.error(`Error al intentar actualizar el producto: ${error.message}`);
            return {};
        }
    }

    // CRUD - D: DELETE
    async deleteProduct(id) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const deletedProduct = await ProductsModel.findByIdAndDelete(id).lean();
            return DBMongoDB.getObjectWithId(deletedProduct);
        } catch (error) {
            console.error(`Error al intentar eliminar el producto: ${error.message}`);
            return {};
        }
    }

}

export default ProductModelMongoDB;
