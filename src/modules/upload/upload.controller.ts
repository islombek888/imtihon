import {Controller,Post,UploadedFile,UploadedFiles,UseInterceptors,} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('single')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = file.originalname.split('.').pop();
          cb(null, `${uuid()}.${ext}`);
        },
      }),
    }),
  )
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadSingle(file);
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = file.originalname.split('.').pop();
          cb(null, `${uuid()}.${ext}`);
        },
      }),
    }),
  )
  uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadService.uploadMultiple(files);
  }
}