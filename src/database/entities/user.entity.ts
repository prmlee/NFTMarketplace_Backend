import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "username", nullable: false, unique: true, length: 30 })
  username: string;

  @Column({ name: "wallet", nullable: false, unique: true, length: 50 })
  wallet: string;

  @Column({ name: "email", nullable: true, unique: true, length: 50 })
  email: string;

  @Column({ name: "fullname", nullable: true, length: 50 })
  fullname: string;

  @Column("text", { name: "bio", nullable: true })
  bio: string;

  @Column({ name: "role", nullable: false, length: 5, default: "USER" })
  role: string;

  @Column({ name: "avatar", nullable: true, length: 350 })
  avatar: string;

  @Column({ name: "cover_image", nullable: true, length: 350 })
  coverImage: string;

  @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
