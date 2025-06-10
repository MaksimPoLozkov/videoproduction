import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Service } from 'src/services/entities/service.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column()
    address: string;

    @ManyToOne(() => Service)
    @JoinColumn({ name: 'serviceId' })
    service: Service;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}