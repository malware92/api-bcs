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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const client_dto_1 = require("./dto/client.dto");
const login_dto_1 = require("./dto/login.dto");
const client_service_1 = require("./client.service");
const httpResponse_1 = require("../util/httpResponse");
let ClientController = class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    async createPost(res, createClient) {
        try {
            const client = await this.clientService.createClient(createClient);
            const response = new httpResponse_1.ApiResponse(common_1.HttpStatus.OK, 'Success', client);
            res.status(response.code).json(response);
        }
        catch (error) {
            const response = new httpResponse_1.ApiResponse(common_1.HttpStatus.BAD_REQUEST, 'Validation Error', error.message);
            res.status(response.code).json(response);
        }
    }
    async login(res, loginData) {
        try {
            const token = await this.clientService.login(loginData);
            const response = new httpResponse_1.ApiResponse(common_1.HttpStatus.OK, 'Login Successful', { token });
            res.status(response.code).json(response);
        }
        catch (error) {
            const response = new httpResponse_1.ApiResponse(common_1.HttpStatus.UNAUTHORIZED, 'Authentication Failed', error.message);
            res.status(response.code).json(response);
        }
    }
};
exports.ClientController = ClientController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, client_dto_1.CreateClientDTO]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "createPost", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "login", null);
exports.ClientController = ClientController = __decorate([
    (0, common_1.Controller)('client'),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
//# sourceMappingURL=client.controller.js.map