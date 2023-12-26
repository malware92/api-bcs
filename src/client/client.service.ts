import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ClientInterface } from './interfaces/client.interface';
import { CreateClientDTO } from "./dto/client.dto";
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ClientService {

    constructor(@InjectModel('Client') private readonly clientModel: Model<ClientInterface>){}

    async createClient(createClient: CreateClientDTO) {
        const savedClient = await this.clientModel.create(createClient);
        return savedClient;
    }

    async login(loginData: LoginDTO): Promise<string> {
        const { username, password } = loginData;
        const client = await this.clientModel.findOne({ user: username });

        if (!client) {
            throw new Error('User not found');
        }

        const passwordMatch = (password == client.password);

        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }

        const token = jwt.sign({ userId: client._id }, 'ABC', { expiresIn: '1h' });
        return token;
    }
}
