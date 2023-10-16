import * as AWS from 'aws-sdk';
export declare class S3Service {
    s3: AWS.S3;
    getPresignedUploadUrl(filetype: string, fileId: string): Promise<{
        uploadUrl: string;
        Key: string;
    }>;
    getPresignedDownloadUrl(filename: string, originalFilename: any): Promise<string>;
}
