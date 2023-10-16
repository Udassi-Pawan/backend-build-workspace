import { S3Service } from './s3.service';
export declare class S3Controller {
    private readonly s3service;
    constructor(s3service: S3Service);
    downloadFile(filename: string, originalFilename: string): Promise<string>;
    uploadFile(filetype: string): Promise<{
        uploadUrl: string;
        videoId: string;
    }>;
}
