import { BadRequestException, HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entitie';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { PaginationDto } from 'src/app/common/dto/pagination.dto';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadosRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService
  ) { }

  async findAll(pagination?: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination ?? {}

    const recados = await this.recadosRepository.find({
      take: limit,
      skip: offset,
      relations: ['de', 'para'],
      order: {
        id: 'ASC'
      },
      select: {
        de: {
          id: true,
          nome: true
        },
        para: {
          id: true,
          nome: true
        }
      }
    })

    return recados
  }

  async findOne(id: number) {
    const recado = await this.recadosRepository.findOne({
      where: { id },
      relations: ['de', 'para'],
      order: {
        id: 'ASC'
      },
      select: {
        de: {
          id: true,
          nome: true
        },
        para: {
          id: true,
          nome: true
        }
      }
    })

    if (!recado) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Recado não encontrado',
        date: Date.now()
      }, HttpStatus.NOT_FOUND)
    }

    return recado
  }

  async create(recado: CreateRecadoDto) {
    const { deId, paraId } = recado;
    const de = await this.pessoasService.findOne(deId);
    const para = await this.pessoasService.findOne(paraId);

    const novoRecado = {
      ...recado,
      de,
      para,
      lido: false,
      createdAt: new Date()
    }


    const recadoCriado = await this.recadosRepository.save(novoRecado)

    return {
      ...recadoCriado,
      de: {
        id: recadoCriado.de.id,
      },
      para: {
        id: recadoCriado.para.id,
      },
    };
  }

  async update(id: number, recado: UpdateRecadoDto) {
    const rec = await this.findOne(id)
  
    rec.texto = recado?.texto ?? rec.texto
    rec.lido = recado?.lido ?? rec.lido
  
    await this.recadosRepository.save(rec)

    return rec
  }


  async delete(id: number) {
    await this.findOne(id)

    return await this.recadosRepository.delete(id)
  }
}
