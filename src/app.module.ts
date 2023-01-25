import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ComprehendModule } from './comprehend/comprehend.module';

@Module({
  imports: [CommonModule, ComprehendModule],
})
export class AppModule {}
