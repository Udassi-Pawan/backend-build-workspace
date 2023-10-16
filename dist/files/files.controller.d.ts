import { FilesService } from './files.service';
import { UsersService } from 'src/schemas/users/users.service';
import { S3Service } from 'src/s3/s3.service';
import { GroupsRepository } from 'src/schemas/groups/groups.repository';
import { UsersRepository } from 'src/schemas/users/users.repository';
declare class Request {
    user: any;
}
export declare class FilesController {
    private readonly filesService;
    private readonly usersService;
    private readonly s3Service;
    private readonly groupsRepository;
    private readonly usersRepository;
    constructor(filesService: FilesService, usersService: UsersService, s3Service: S3Service, groupsRepository: GroupsRepository, usersRepository: UsersRepository);
    createFile(req: Request, filetype: string, name: string, groups: [string]): Promise<{
        uploadUrl: string;
        Key: string;
    }>;
    downloadFile(req: Request, filename: string, originalFilename: string): Promise<string>;
}
export {};
