import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreatePessoaDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, {message: 'A senha deve ter no mínimo 5 caracteres'})
  password: string

  @IsString()
  @IsNotEmpty()
  nome: string;

  constructor(email: string, password: string, nome: string) {
    this.email = email;
    this.password = password;
    this.nome = nome;
  }
}
