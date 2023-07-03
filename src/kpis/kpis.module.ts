import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KpisService } from './kpis.service';
import { KpisController } from './kpis.controller';
import { KpiEntity } from './entities/kpi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KpiEntity])],
  controllers: [KpisController],
  providers: [KpisService],
})
export class KpisModule {}
