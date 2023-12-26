"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_dto_1 = require("./dto/product.dto");
const product_service_1 = require("./product.service");
const httpResponse_1 = require("../util/httpResponse");
const jwt = require("jsonwebtoken");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async createPost(res, token, createProduct) {
        try {
            const decode = await decodeToken(token);
            if (!decode.userId) {
                throw new Error(decode);
            }
            const product = await this.productService.createProduct(createProduct, decode.userId);
            const response = new httpResponse_1.ApiResponse(common_1.HttpStatus.OK, 'Success', product);
            res.status(response.code).json(response);
        }
        catch (error) {
            const response = new httpResponse_1.ApiResponse(common_1.HttpStatus.BAD_REQUEST, 'Validation Error', error.message);
            res.status(response.code).json(response);
        }
    }
    async getAllProducts(res, token) {
        try {
            const decode = await decodeToken(token);
            if (!decode.userId) {
                throw new Error(decode);
            }
            const products = await this.productService.getAllProducts(decode.userId);
            return res.status(common_1.HttpStatus.OK).json(products);
        }
        catch (error) {
            const response = new httpResponse_1.ApiResponse(common_1.HttpStatus.BAD_REQUEST, 'Validation Error', error.message);
            res.status(response.code).json(response);
        }
    }
    async getProduct(res, token, productId) {
        try {
            const decode = await decodeToken(token);
            if (!decode.userId) {
                throw new Error(decode);
            }
            const products = await this.productService.getProduct(decode.userId, productId);
            return res.status(common_1.HttpStatus.OK).json(products);
        }
        catch (error) {
            const response = new httpResponse_1.ApiResponse(common_1.HttpStatus.BAD_REQUEST, 'Validation Error', error.message);
            res.status(response.code).json(response);
        }
    }
    async deleteProduct(res, token, productId) {
        try {
            const decode = await decodeToken(token);
            if (!decode.userId) {
                throw new Error(decode);
            }
            const products = await this.productService.deleteProduct(decode.userId, productId);
            return res.status(common_1.HttpStatus.OK).json(products);
        }
        catch (error) {
            const response = new httpResponse_1.ApiResponse(common_1.HttpStatus.BAD_REQUEST, 'Validation Error', error.message);
            res.status(response.code).json(response);
        }
    }
    async updateProduct(res, token, createProduct, productId) {
        try {
            const decode = await decodeToken(token);
            if (!decode.userId) {
                throw new Error(decode);
            }
            const products = await this.productService.updateProduct(createProduct, productId);
            return res.status(common_1.HttpStatus.OK).json(products);
        }
        catch (error) {
            const response = new httpResponse_1.ApiResponse(common_1.HttpStatus.BAD_REQUEST, 'Validation Error', error.message);
            res.status(response.code).json(response);
        }
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, product_dto_1.CreateProductDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)('/all'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)('/:productId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Query)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Query)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, product_dto_1.CreateProductDTO, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
async function decodeToken(token) {
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        return decodedToken;
    }
    catch (error) {
        return error.message;
    }
}
//# sourceMappingURL=product.controller.js.map