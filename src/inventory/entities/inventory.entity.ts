import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'inventories' })
export class Inventory {
    @PrimaryGeneratedColumn()
    inventory_ID: number;

    @Column({ type : 'varchar', length : 200 })
    type : string;

    @Column()
    quantity: number;

    @Column({ type: 'text', nullable: true })
    reason: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Product, product => product.product_ID, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'product_ID', referencedColumnName: 'product_ID' })
    product: Product; 
}
