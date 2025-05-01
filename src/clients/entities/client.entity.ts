import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name : 'clients' })
export class Client {
    @PrimaryColumn()
    client_ID : string;

    @Column()
    document_type : string;

    @Column()
    name : string;

    @Column()
    city : string;

    @Column()
    zone : string;

    @Column()
    neighborhood : string;

    @Column()
    address : string;

    @Column({ unique : true })
    cellphone : string;

    @OneToMany(() => Invoice, invoice => invoice.client_ID)
    @JoinColumn({ name : 'client_ID', referencedColumnName : 'client_ID' })
    invoices : Invoice[]; // Relación con la entidad Invoice
}
