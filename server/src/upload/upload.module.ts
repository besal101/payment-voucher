import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerUploadConfig } from 'src/config/multer-upload.config';

@Module({
  controllers: [UploadController],
  imports: [MulterModule.register(multerUploadConfig)],
})
export class UploadModule {}
