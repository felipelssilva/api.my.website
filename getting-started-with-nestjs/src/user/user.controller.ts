import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
// import { Request } from 'express';
import { Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { User } from './entities/user.entity';

@Controller('user')
@UseFilters(new HttpExceptionFilter())
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // @ApiOkResponse({ description: 'Retrieved successfully.' })
  // @ApiNotFoundResponse({ description: 'Not found.' })
  // @Query(() => [User])
  // getUsers() {
  //   return this.userService.findAll();
  // }

  @Get('/:userId')
  @ApiOkResponse({ description: 'Retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Not found.' })
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getUser(userId);
  }

  // @Post()
  // @ApiOkResponse({ description: 'Retrieved successfully.' })
  // @ApiNotFoundResponse({ description: 'Not found.' })
  // store(@Req() req: Request) {
  //   return this.userService.create(req);
  // }

  // @Post()
  // @ApiOkResponse({ description: 'Retrieved successfully.' })
  // @ApiNotFoundResponse({ description: 'Not found.' })
  // @Mutation(() => User)
  // async createUser(@Args('input') input: UserInput) {
  //   return await this.userService.create(input);
  // }

  // @Patch('/:userId')
  // @ApiOkResponse({ description: 'Retrieved successfully.' })
  // @ApiNotFoundResponse({ description: 'Not found.' })
  // update(
  //   @Body() updateUserDto: { name: string; email: string },
  //   @Param('userId', ParseIntPipe) userId: number,
  // ) {
  //   return this.userService.update(updateUserDto, userId);
  // }

  // @Delete()
  // @ApiOkResponse({ description: 'Retrieved successfully.' })
  // @ApiNotFoundResponse({ description: 'Not found.' })
  // delete(@Param('userId', ParseIntPipe) userId: number) {
  //   return this.userService.delete(userId);
  // }
}
