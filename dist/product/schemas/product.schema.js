"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
    name: String,
    client: String,
    price: Number,
    category: String
});
//# sourceMappingURL=product.schema.js.map