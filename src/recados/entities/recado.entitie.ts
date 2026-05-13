import { Pessoa } from "src/pessoas/entities/pessoa.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Recado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 255, type: 'varchar'})
  texto: string;

  @ManyToOne(() => Pessoa, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'de'})
  de: Pessoa;

  @ManyToOne(() => Pessoa, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'para'})
  para: Pessoa;

  @Column({default: false, type: 'boolean'})
  lido: boolean;

  data: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    id: number,
    texto: string,
    de: Pessoa,
    para: Pessoa,
    lido: boolean,
    data: Date,
    createdAt: Date,
    updatedAt: Date
  ) {
      this.id = id;
      this.texto = texto;
      this.de = de;
      this.para = para;
      this.lido = lido;
      this.data = data;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
  }
}