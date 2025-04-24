import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { Role } from "../enums/roles.enum";
import { Invoice } from "src/invoices/entities/invoice.entity";

@Entity({ name : 'users' })
export class User {
    @PrimaryColumn({ nullable : false, type : 'varchar' })
    user_ID : string;
    
    @Column({ nullable : false })
    name : string;

    @Column({ unique : true, nullable : false })
    email : string;

    @Column({ unique : false, nullable : false })
    cellphone : string;

    @Column({ nullable : false })
    address : string;

    @Column({ nullable : false })
    password : string;

    @Column({ default : Role.USER })
    role_ID: number;

    @OneToMany(() => Invoice, invoice => invoice.user_ID)
    @JoinColumn({ name : 'user_ID', referencedColumnName : 'user_ID' }) 
    invoices : Invoice[];
}
