import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clienClientsRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const clienClient = this.clienClientsRepository.create(createClientDto);
    return this.clienClientsRepository.save(clienClient);
  }

  async findAll(): Promise<Client[]> {
    return this.clienClientsRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    const clienClient = await this.clienClientsRepository.findOneBy({ id });
    if (!clienClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return clienClient;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    await this.clienClientsRepository.update(id, updateClientDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.clienClientsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
  }
}
