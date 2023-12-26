import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductInterface } from './interfaces/product.interface'
import { CreateProductDTO } from "./dto/product.dto";

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel: Model<ProductInterface>){}

    async createProduct(createProduct: CreateProductDTO, clientId: any) {
        createProduct.client = clientId;
        const savedProduct = await this.productModel.create(createProduct);
        return savedProduct;
    }

    async getAllProducts(clientId: any) {
        const products = await this.productModel.find({client: clientId});
        return products;
    }

    async getProduct(clientId: string, productId: string) {
        const products = await this.productModel.find({client: clientId, _id: productId});
        return products;
    }

    async deleteProduct(clientId: string, productId: string) {
        const deletedProduct = await this.productModel.findOneAndDelete({client: clientId, _id: productId});
        return deletedProduct;
    }

    async updateProduct(createProduct: CreateProductDTO, productId: string) {
        const updatedProduct = await this.productModel.findByIdAndUpdate(productId, createProduct, {new: true});
        return updatedProduct;
    }

}
