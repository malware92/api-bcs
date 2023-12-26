import { CreateClientDTO } from './dto/client.dto';
import { LoginDTO } from './dto/login.dto';
import { ClientService } from "./client.service";
export declare class ClientController {
    private clientService;
    constructor(clientService: ClientService);
    createPost(res: any, createClient: CreateClientDTO): Promise<void>;
    login(res: any, loginData: LoginDTO): Promise<void>;
}
