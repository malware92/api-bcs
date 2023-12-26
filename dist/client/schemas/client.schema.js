"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ClientSchema = new mongoose_1.Schema({
    name: String,
    user: String,
    password: String
});
//# sourceMappingURL=client.schema.js.map