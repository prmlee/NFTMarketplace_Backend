import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1656816769478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS users ( 
      id char(36) DEFAULT (uuid()), 
      username varchar(30) NOT NULL, 
      email varchar(50) DEFAULT NULL, 
      wallet varchar(50) NOT NULL, 
      fullname varchar(50) DEFAULT NULL, 
      bio text DEFAULT NULL, 
      role varchar(5) NOT NULL DEFAULT 'USER', 
      avatar varchar(350) DEFAULT NULL, 
      cover_image varchar(350) DEFAULT NULL, 
      created_at timestamp NOT NULL DEFAULT current_timestamp(),
      updated_at timestamp NOT NULL DEFAULT current_timestamp(),
      PRIMARY KEY (id), 
      UNIQUE KEY IDX_074a1f262efaca6aba16f7ed92 (username), 
      UNIQUE KEY IDX_c5a97c2e62b0c759e2c16d411c (wallet), 
      UNIQUE KEY IDX_97672ac88f789774dd47f7c8be (email)
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
  }
}
