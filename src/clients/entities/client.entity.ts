import { Column, Entity, PrimaryColumn } from 'typeorm';

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

    @Column()
    cellphone : string;
}
