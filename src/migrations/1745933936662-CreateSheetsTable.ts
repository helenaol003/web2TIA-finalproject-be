import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSheetsTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE sheets (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        composer VARCHAR(100),
        difficulty VARCHAR(50),
        file_url TEXT NOT NULL,
        price INTEGER DEFAULT 0,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE sheets;`);
  }
}
