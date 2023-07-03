import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateKpiTable1688407622880 implements MigrationInterface {
  name = 'CreateKpiTable1688407622880';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "kpis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL DEFAULT '', "value" text, "description" text, CONSTRAINT "PK_96cc541107cdc102a50e2b0ac90" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "kpis"`);
  }
}
