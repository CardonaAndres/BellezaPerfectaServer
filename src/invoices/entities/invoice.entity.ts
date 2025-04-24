import { Client } from "src/clients/entities/client.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Details } from "./details.entity";

@Entity({ name: 'invoices' })
export class Invoice {
    @PrimaryGeneratedColumn()
    invoice_ID: number;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    date_invoice: Date;

    @Column({ type: 'date' })
    date_end: Date;

    @Column({ type: 'varchar', length: 100 })
    type_payment: string; // Tipo de pago (Contado, Crédito, etc.)

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    IVA: number; // Impuesto al valor agregado

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    retefuente: number; // Retención en la fuente

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    reteiva: number; // Retención de IVA

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    total: number;

    @ManyToOne(() => Client, client => client.client_ID, { eager: true })
    @JoinColumn({ name: 'client_ID' })
    client_ID : Client

    @ManyToOne(() => User, user => user.user_ID, { eager: true })
    @JoinColumn({ name: 'user_ID' })
    user_ID : User;

    @OneToMany(() => Details, details => details.invoice_ID)
    @JoinColumn({ name: 'invoice_ID' })
    details: Details[]; // Relación con la entidad Details
}
