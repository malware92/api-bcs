import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateClientDTO } from './dto/client.dto';
import { LoginDTO } from './dto/login.dto'; // Importa el nuevo DTO
import { ClientService } from "./client.service";
import { ApiResponse } from '../util/httpResponse';

@Controller('client')
export class ClientController {

    constructor(private clientService: ClientService){}

    @Post('/create')
    async createPost(@Res() res, @Body() createClient: CreateClientDTO ){
        try {
            const client = await this.clientService.createClient(createClient);
            const response = new ApiResponse(HttpStatus.OK, 'Success', client);
            res.status(response.code).json(response);
        } catch (error) {
            const response = new ApiResponse(HttpStatus.BAD_REQUEST, 'Validation Error', error.message);
            res.status(response.code).json(response);
        }
    }

    @Post('/login')
    async login(@Res() res, @Body() loginData: LoginDTO) {
        try {
            const token = await this.clientService.login(loginData);
            const response = new ApiResponse(HttpStatus.OK, 'Login Successful', { token });
            res.status(response.code).json(response);
        } catch (error) {
            const response = new ApiResponse(HttpStatus.UNAUTHORIZED, 'Authentication Failed', error.message);
            res.status(response.code).json(response);
        }
    }
}
