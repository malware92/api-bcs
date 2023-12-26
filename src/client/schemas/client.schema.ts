import { Schema } from 'mongoose';

export const ClientSchema = new Schema({
    name: String,
    user: String,
    password: String
});