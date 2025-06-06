import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./invoice.entity";

@Entity({ name : 'details' })
export class Details {
    @PrimaryGeneratedColumn()
    detail_ID : number;

    @Column({ type : 'decimal', precision : 10, scale : 2 })
    quantity : number;

    @Column({ type : 'decimal', precision : 10, scale : 2 })
    total : number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price : number; 

    @ManyToOne(() => Invoice, invoice => invoice.details, { onDelete : "CASCADE" })
    @JoinColumn({ name : 'invoice_ID', referencedColumnName : 'invoice_ID' })
    invoice_ID : Invoice; // Relación con la entidad Invoice

    @ManyToOne(() => Product, product => product, { onDelete : "CASCADE" })
    @JoinColumn({ name : 'product_ID', referencedColumnName : 'product_ID' })
    product_ID : Product; // Relación con la entidad Product
}