import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entities/User';

@Resolver(User)
export class RegisterResolver {
  // we have a field for querying
  @Query(() => String, { name: 'helloworld', nullable: true }) // uppercase string because we need to pass the class of the string
  // name of the function is the name of the query
  async hello() {
    return 'Hello World!!';
  }

  // not stored in the database but just in our schema
  // the field doesnt have the column decorator in the

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Mutation(() => User)
  async register(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
}
