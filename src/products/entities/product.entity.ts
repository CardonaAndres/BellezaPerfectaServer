import { Inventory } from "src/inventory/entities/inventory.entity";
import { Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Inventory, inventory => inventory.inventory_ID)
    inventories: Inventory[]; // Un producto puede tener muchos registros de inventario
    
}
