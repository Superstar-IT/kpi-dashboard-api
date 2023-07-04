import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { KpisService } from './kpis.service';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
import { PaginatorDto } from 'src/core/types/paginator.dto';
import { KpiEntity } from './entities/kpi.entity';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { getFromDto } from 'src/utils/repository.utils';

@ApiTags('KPIs')
@Controller({
  path: 'kpis',
  version: '1',
})
export class KpisController {
  constructor(private readonly kpisService: KpisService) {}

  @Post()
  create(@Body() createKpiDto: CreateKpiDto) {
    return this.kpisService.create(createKpiDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PaginatorDto<KpiEntity> })
  @ApiQuery({ name: 'page', required: false, type: String, example: '1' })
  @ApiQuery({ name: 'limit', required: false, type: String, example: '10' })
  async findAllKpis(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginatorDto<KpiEntity>> {
    if (limit > 50) {
      limit = 50;
    }

    const [data, count] = await this.kpisService.findManyKpisWithPagination({
      page,
      limit,
    });
    return infinityPagination<KpiEntity>(data, { page, limit }, count);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    example: '33fe6172-6a04-40b2-acec-ee6ac78b7b74',
  })
  @ApiOkResponse({ type: KpiEntity })
  async findOneKpi(@Param('id') id: string): Promise<KpiEntity> {
    return await this.getSingleKPI(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    example: '33fe6172-6a04-40b2-acec-ee6ac78b7b74',
  })
  @ApiOkResponse({ type: KpiEntity })
  async update(
    @Param('id') id: string,
    @Body() updateKpiDto: UpdateKpiDto,
  ): Promise<KpiEntity> {
    const kpi = await this.getSingleKPI(id);
    await this.kpisService.update(kpi.id, updateKpiDto).catch((error) => {
      throw new InternalServerErrorException(
        `Failed to update KPI. ${error.message}`,
      );
    });

    return getFromDto<KpiEntity>(updateKpiDto, kpi);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    example: '33fe6172-6a04-40b2-acec-ee6ac78b7b74',
  })
  async remove(@Param('id') id: string): Promise<void> {
    const kpi = await this.getSingleKPI(id);
    return await this.kpisService.softDeleteRoom(kpi.id).catch((error) => {
      throw new InternalServerErrorException(
        `Failed to remove KPI. ${error.message}`,
      );
    });
  }

  async getSingleKPI(id: string): Promise<KpiEntity> {
    const kpi = await this.kpisService.findOne({ id }).catch((error) => {
      throw new InternalServerErrorException(
        `Failed to get KPI by id. ${error.message}`,
      );
    });

    if (!kpi) throw new NotFoundException(`Chat room not found`);
    return kpi;
  }
}
