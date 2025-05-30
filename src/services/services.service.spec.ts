import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

async create(createServiceDto: CreateServiceDto): Promise<Service> {
  console.log('Получены данные для создания:', createServiceDto);
  
  try {
    const service = this.serviceRepository.create(createServiceDto);
    const result = await this.serviceRepository.save(service);
    console.log('Сохранённая запись:', result);
    return result;
  } catch (error) {
    console.error('Ошибка сохранения:', error);
    throw new InternalServerErrorException('Не удалось сохранить услугу');
  }
}

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.serviceRepository.findOneBy({ id });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {
    const service = await this.findOne(id);
    Object.assign(service, updateServiceDto);
    return this.serviceRepository.save(service);
  }

  async remove(id: number): Promise<void> {
    await this.serviceRepository.delete(id);
  }
}