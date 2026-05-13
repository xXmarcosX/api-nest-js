import { PartialType } from "@nestjs/mapped-types"
import { CreateRecadoDto } from "./create-recado.dto"
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateRecadoDto extends PartialType(CreateRecadoDto) {
  @IsString()
  readonly texto?: string
  
  @IsBoolean()
  @IsOptional()
  readonly lido?: boolean;

  constructor(texto: string) {
    super(texto)
  }
}
