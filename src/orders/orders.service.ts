import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Service } from '../services/entities/service.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Находим услугу
    const service = await this.serviceRepository.findOneBy({ 
      id: createOrderDto.serviceId 
    });
    
    if (!service) {
    throw new NotFoundException('Service not found');
}

// Создаем заказ с данными из формы
const order = this.orderRepository.create({
    name: createOrderDto.name,
    phoneNumber: createOrderDto.phoneNumber,
    address: createOrderDto.address,
    service,
    description: createOrderDto.description,
});

    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['service'], // Теперь загружаем только связанную услугу
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['service'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    
    // Если обновляется serviceId, находим новую услугу
    if (updateOrderDto.serviceId) {
      const service = await this.serviceRepository.findOneBy({ 
        id: updateOrderDto.serviceId 
      });
      
      if (!service) {
        throw new NotFoundException('Service not found');
      }
      order.service = service;
    }

    // Обновляем остальные поля
    Object.assign(order, updateOrderDto);
    
    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}