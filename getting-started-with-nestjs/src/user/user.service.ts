import { Injectable } from '@nestjs/common';
// import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import * as uuid from 'uuid';
import { User } from './entities/user.entity';
import { CreateUserInput, UpdateUserInput } from '../../src/graphql';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async findAll(offset: number, limit: number): Promise<User[]> {
    return await this.userRepository.find({
      order: { createdAt: 'DESC' },
      skip: offset,
      take: limit,
      cache: true,
    });
  }

  async findById(_id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        _id: _id,
      },
    });
  }

  async create(input: CreateUserInput): Promise<User> {
    const { username, password, name } = input;
    // const message = 'Email has already been taken.';

    // const existedUser = await this.userRepository.findOne({
    //   where: {
    //     email: email,
    //   },
    // });

    // if (existedUser) {
    //   throw new Error(message);
    // }

    const user = new User();
    user.username = username;
    user.password = password;
    user.name = name;
    return await this.userRepository.save(user);
  }

  getUser(userId: number) {
    return { userId };
  }

  // create(req: Request) {
  //   return req.body;
  // }

  // update(updateUserDto: UpdateUserDto, userId: number) {
  //   return { body: updateUserDto, userId };
  // }

  async update(_id: string, input: UpdateUserInput): Promise<boolean> {
    const { username, password, name } = input;

    // const updatedUser = await this.userRepository.updateOne({ _id }, { $set: { input } })

    const user = await this.userRepository.findOne({
      where: {
        _id: _id,
      },
    });
    user.username = username;
    user.password = password;
    user.name = name;

    return (await this.userRepository.save(user)) ? true : false;
  }

  async delete(_id: string): Promise<boolean> {
    const user = new User();
    user._id = _id;
    return (await this.userRepository.remove(user)) ? true : false;
  }
}
