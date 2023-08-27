import { User } from "src/features/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'balances' })
export class Balance {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        default: 0
    })
    balance: number

    @Column()
    user_id: number

    @ManyToOne(() => User, user => user.balances, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user: User

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}