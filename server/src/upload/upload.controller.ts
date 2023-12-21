import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerUploadConfig } from 'src/config/multer-upload.config';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, multerUploadConfig))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const filenames = files.map((file) => file.filename);
    return { message: 'Files uploaded successfully', filenames };
  }
}
