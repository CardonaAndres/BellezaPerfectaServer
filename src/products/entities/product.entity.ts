import { Inventory } from "src/inventory/entities/inventory.entity";
import { Details } from "src/invoices/entities/details.entity";
import { Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn, JoinColumn } from "typeorm";

@Entity({ name : 'products' })
export class Product {
    @PrimaryColumn()
    product_ID : string;

    @Column({ type: 'varchar', length: 100 })
    name : string;

    @Column({ type: 'text', nullable: true })
    description : string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price : number;

    @Column()
    stock : number;

    @Column({ default : 0 })
    stock_min : number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default : 0 })
    iva : number; // Impuesto al valor agregado

    @Column()
    unit_measure : string; // Unidad de medida (kg, g, lb, etc.)

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Inventory, inventory => inventory.inventory_ID)
    @JoinColumn({ name: 'inventory_ID' })
    inventories: Inventory[]; // Un producto puede tener muchos registros de inventario
    
    @OneToMany(() => Details, detail => detail.product_ID)
    @JoinColumn({ name: 'product_ID' })
    details: Details[]; // Un producto puede estar en muchos detalles de factura
}
