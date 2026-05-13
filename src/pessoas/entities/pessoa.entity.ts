import { IsEmail } from "class-validator";
import { Recado } from "src/recados/entities/recado.entitie";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: false, type: 'varchar', length: 180 })
  @IsEmail()
  email: string;

  @Column({nullable: false, type: 'varchar', length: 255 })
  passwordHash: string

  @Column({nullable: false, type: 'varchar', length: 255 })
  nome: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Recado, recado => recado.de)
  recadosEnviados?: Recado[];

  @OneToMany(() => Recado, recado => recado.para)
  recadosRecebidos?: Recado[];

  constructor(id: number, email: string, passwordHash: string, nome: string, createdAt: Date, updatedAt: Date) {
    this.email = email;
    this.passwordHash = passwordHash;
    this.nome = nome;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
