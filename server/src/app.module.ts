import { Module } from '@nestjs/common';
import { ProcedureModule } from './procedure/procedure.module';
import { ConfigModule } from '@nestjs/config';
import { HanaModule } from './hana/hana.module';
import { UploadModule } from './upload/upload.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProcedureModule,
    HanaModule,
    UploadModule,
    MailerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
