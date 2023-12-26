import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
    name: String,
    client: String,
    price: Number,
    category: String
});