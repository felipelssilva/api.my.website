import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  Context,
} from '@nestjs/graphql';

import { UserService } from './user.service';
import { LoginResponse, User } from './entities/user.entity';
import { CreateUserInput, LoginUserInput, UpdateUserInput } from 'src/graphql';

@Resolver('user')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(@Args('offset') offset: number, @Args('limit') limit: number) {
    return await this.userService.findAll(offset, limit);
  }

  @Query(() => User)
  async me(@Context('currentUser') currentUser: User) {
    return await currentUser;
  }

  @Query(() => User)
  async user(@Args('_id') _id: string) {
    return await this.userService.findById(_id);
  }

  @Mutation(() => User, { name: 'register' })
  async createUser(
    @Args('input') input: CreateUserInput,
    @Context('pubSub') pubSub,
  ) {
    const createdUser = await this.userService.create(input);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('_id') _id: string,
    @Args('input') input: UpdateUserInput,
  ) {
    return await this.userService.update(_id, input);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('_id') _id: string) {
    return await this.userService.delete(_id);
  }

  @Mutation(() => LoginResponse)
  async login(@Args('input') input: LoginUserInput) {
    return await this.userService.login(input);
  }

  @Mutation(() => Boolean)
  async setRole(
    @Args('_id') _id: string,
    @Args('role') role: 'MEMBER' | 'MANAGER' | 'ADMIN',
  ) {
    return await this.userService.setRole(_id, role);
  }

  @Subscription()
  userCreated(@Context('pubSub') pubSub: any) {
    return pubSub.asyncIterator('userCreated');
  }
}
