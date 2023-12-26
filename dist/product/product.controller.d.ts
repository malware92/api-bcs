import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from "./product.service";
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    createPost(res: any, token: string, createProduct: CreateProductDTO): Promise<void>;
    getAllProducts(res: any, token: string): Promise<any>;
    getProduct(res: any, token: string, productId: any): Promise<any>;
    deleteProduct(res: any, token: string, productId: any): Promise<any>;
    updateProduct(res: any, token: string, createProduct: CreateProductDTO, productId: any): Promise<any>;
}
