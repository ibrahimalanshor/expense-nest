import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hash } from 'bcrypt';
import { Balance } from "src/features/balances/entities/balance.entity";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    name: string

    @Column({ select: false })
    password: string

    @OneToMany(() => Balance, balance => balance.user)
    balances: Balance[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10)
    }
}