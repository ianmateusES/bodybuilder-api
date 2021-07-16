import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateNutritionistStudent1626396664916
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'nutritionist_student',
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
            name: 'nutritionist_id',
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
            name: 'NutritionistStudent',
            columnNames: ['nutritionist_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'nutritionists',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'StudentNutritionist',
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
    await queryRunner.dropTable('nutritionist_student');
  }
}
