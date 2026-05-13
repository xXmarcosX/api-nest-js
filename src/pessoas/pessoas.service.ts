import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/app/common/dto/pagination.dto';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoasRepository: Repository<Pessoa>
  ) { }

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const pessoaData = {
        nome: createPessoaDto.nome,
        email: createPessoaDto.email,
        passwordHash: createPessoaDto.password
      }

      const novaPessoa = this.pessoasRepository.create(pessoaData)
      await this.pessoasRepository.save(novaPessoa)

      return novaPessoa
    } catch (e: any) {
      if (e.code === '23505') throw new ConflictException(`Email ${createPessoaDto.email} já cadastrado`)

      throw e
    }
  }

  async findAll(pagination?: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination ?? {}
    
    return await this.pessoasRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'ASC'
      },
      select: {
        id: true,
        nome: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async findOne(id: number) {
    const pessoa = await this.pessoasRepository.findOneBy({ id })

    if (!pessoa) throw new Error('Pessoa não encontrada')

    return pessoa
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const dadosPessoa = {
      nome: updatePessoaDto?.nome,
      passwordHash: updatePessoaDto?.password,
    };

    const pessoa = await this.pessoasRepository.preload({
      id: id,
      ...dadosPessoa
    })

    await this.pessoasRepository.update(id, dadosPessoa)

    return pessoa
  }

  async remove(id: number) {
    const pessoa = await this.findOne(id)

    await this.pessoasRepository.delete(pessoa.id)
  }
}
