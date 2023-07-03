import { Column, Entity } from 'typeorm';

import { AbstractEntity } from 'src/core/entities/abstract.entity';

@Entity('kpis')
export class KpiEntity extends AbstractEntity {
  @Column({ type: 'varchar', default: '' })
  name: string;

  @Column({ type: 'text', nullable: true })
  value: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
