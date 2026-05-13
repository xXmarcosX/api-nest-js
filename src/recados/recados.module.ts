import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entitie';
import { PessoasModule } from 'src/pessoas/pessoas.module';

@Module({
  controllers: [RecadosController],
  providers: [RecadosService],
  imports: [TypeOrmModule.forFeature([Recado]), PessoasModule],
})
export class RecadosModule {}
