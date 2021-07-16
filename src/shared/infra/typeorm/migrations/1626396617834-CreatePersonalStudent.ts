import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePersonalStudent1626396617834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'personal_student',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'student_id',
            type: 'uuid',
          },
          {
            name: 'personal_id',
            type: 'uuid',
          },
          {
            name: 'status',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'PersonalStudent',
            columnNames: ['personal_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'personals',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'StudentPersonal',
            columnNames: ['student_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'students',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('personal_student');
  }
}
