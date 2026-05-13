import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/app/common/dto/pagination.dto';
import { TimingConnectionInterceptor } from 'src/app/common/interceptors/timing-connection.interceptor';
import { SimpleCacheInterceptor } from 'src/app/common/interceptors/simple-cache-interceptor.interceptor';
import { ChangeDataInterceptor } from 'src/app/common/interceptors/change-data.interceptor';

@Controller('recados')
export class RecadosController {

  constructor(private readonly service: RecadosService) { }
  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.service.findAll(pagination)
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() recado: CreateRecadoDto) {
    return this.service.create(recado)
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() recado: UpdateRecadoDto) {
    return this.service.update(id, recado)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.service.delete(id)
  }
}
