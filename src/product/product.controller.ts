import { Body, Controller, Get, HttpStatus, Headers, Post, Res, Param, Delete, Query, Put } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from "./product.service";
import { ApiResponse } from '../util/httpResponse';
import * as jwt from 'jsonwebtoken';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){}

    @Post('/create')
    async createPost(@Res() res, @Headers('authorization') token: string, @Body() createProduct: CreateProductDTO ){
        try {
            const decode = await decodeToken(token);
            if(!decode.userId){
                throw new Error(decode);
            }
            const product = await this.productService.createProduct(createProduct,decode.userId);
            const response = new ApiResponse(HttpStatus.OK, 'Success', product);
            res.status(response.code).json(response);
        } catch (error) {
            const response = new ApiResponse(HttpStatus.BAD_REQUEST, 'Validation Error', error.message);
            res.status(response.code).json(response);

        }
    }

    @Get('/all')
    async getAllProducts(@Res() res, @Headers('authorization') token: string) {
        try {
            
            const decode = await decodeToken(token);
            if(!decode.userId){
                throw new Error(decode);
            }

            const products = await this.productService.getAllProducts(decode.userId);
            return res.status(HttpStatus.OK).json(products);
        } catch (error) {
            const response = new ApiResponse(HttpStatus.BAD_REQUEST, 'Validation Error', error.message);
            res.status(response.code).json(response);
        }
    }

    @Get('/:productId')
    async getProduct(@Res() res, @Headers('authorization') token: string, @Param('productId') productId) {
        try {
            
            const decode = await decodeToken(token);
            if(!decode.userId){
                throw new Error(decode);
            }

            const products = await this.productService.getProduct(decode.userId, productId);
            return res.status(HttpStatus.OK).json(products);
        } catch (error) {
            const response = new ApiResponse(HttpStatus.BAD_REQUEST, 'Validation Error', error.message);
            res.status(response.code).json(response);
        }
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Headers('authorization') token: string, @Query('productId') productId) {
        try {
            const decode = await decodeToken(token);
            if(!decode.userId){
                throw new Error(decode);
            }

            const products = await this.productService.deleteProduct(decode.userId, productId);
            return res.status(HttpStatus.OK).json(products);
        } catch (error) {
            const response = new ApiResponse(HttpStatus.BAD_REQUEST, 'Validation Error', error.message);
            res.status(response.code).json(response);
        }
    }

    @Put('/update')
    async updateProduct(@Res() res, @Headers('authorization') token: string, @Body() createProduct: CreateProductDTO, @Query('productId') productId) {
        try {
            const decode = await decodeToken(token);
            if(!decode.userId){
                throw new Error(decode);
            }

            const products = await this.productService.updateProduct(createProduct, productId);
            return res.status(HttpStatus.OK).json(products);
        } catch (error) {
            const response = new ApiResponse(HttpStatus.BAD_REQUEST, 'Validation Error', error.message);
            res.status(response.code).json(response);
        }
    }

}

async function decodeToken(token: any) {
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        return decodedToken;
    } catch (error) {
        return error.message;
    }
}