import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {

  async uploadSingle(file: {
    originalname: string;
    buffer: Buffer;
  }): Promise<{ url: string; fileName: string }> {
    return {
      url: `https://cdn.example.com/uploads/${file.originalname}`,
      fileName: file.originalname,
    };
  }

  async uploadMultiple(
    files: { originalname: string; buffer: Buffer }[],
  ): Promise<{ url: string; fileName: string }[]> {
    return files.map((file) => ({
      url: `https://cdn.example.com/uploads/${file.originalname}`,
      fileName: file.originalname,
    }));
  }

  async deleteFile(fileName: string): Promise<{ deleted: boolean }> {
    return { deleted: true };
  }
}
