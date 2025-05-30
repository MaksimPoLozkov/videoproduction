// import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
// export class Project {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @OneToOne(() => Order)
//   @JoinColumn()
//   order: Order; // Какой заказ выполнен

//   @Column()
//   deliveryDate: Date;

//   @Column('text', { array: true })
//   files: string[]; // Ссылки на видео в S3

//   @Column({ nullable: true })
//   previewUrl: string; // Превью
// }