import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoaDto } from './create-pessoa.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePessoaDto extends PartialType(CreatePessoaDto) {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'A senha deve ter no mínimo 5 caracteres' })
  password: string

  @IsString()
  @IsNotEmpty()
  nome: string;

  constructor(password: string, nome: string) {
    super();
    this.password = password;
    this.nome = nome;
  }
}
