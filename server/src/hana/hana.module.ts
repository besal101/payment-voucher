import { Global, Module } from '@nestjs/common';
import { HanaService } from './hana.service';

@Global()
@Module({
  providers: [HanaService],
  exports: [HanaService],
})
export class HanaModule {}
