import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
import { KpiEntity } from './entities/kpi.entity';
import { IPaginationOptions } from 'src/core/types/pagination-options';
import { EntityCondition } from 'src/core/types/entity-condition.type';

@Injectable()
export class KpisService {
  constructor(
    @InjectRepository(KpiEntity)
    private kpiRepository: Repository<KpiEntity>,
  ) {}

  async create(createKpiDto: CreateKpiDto): Promise<KpiEntity> {
    return await this.kpiRepository.save(
      this.kpiRepository.create(createKpiDto),
    );
  }

  async findOne(fields: EntityCondition<KpiEntity>): Promise<KpiEntity> {
    return await this.kpiRepository.findOne({
      where: fields,
    });
  }

  async findManyKpisWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<[KpiEntity[], number]> {
    return await this.kpiRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async update(id: string, updateKpiDto: UpdateKpiDto): Promise<KpiEntity> {
    return this.kpiRepository.save(
      this.kpiRepository.create({
        id,
        ...updateKpiDto,
      }),
    );
  }

  async softDeleteRoom(id: string): Promise<void> {
    await this.kpiRepository.softDelete(id);
  }
}
