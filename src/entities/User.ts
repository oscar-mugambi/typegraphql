import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column('text', {
    unique: true,
  })
  email: string;

  @Field()
  name: string;

  @Column()
  password: string;
}

//the field attribute exposes the column to the graphql schema
//the password is a db field and not a graphql field. so its not visible in the schema
