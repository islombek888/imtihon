import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  uploadSuccess(file: Express.Multer.File) {
    return {
      url: `/uploads/${file.filename}`,
      filename: file.filename,
    };
  }

  uploadMultiple(files: Express.Multer.File[]) {
    return files.map((f) => ({
      url: `/uploads/${f.filename}`,
      filename: f.filename,
    }));
  }
}