import { Controller, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
// import { Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
// import { Observable, of } from 'rxjs';

@Controller({})
@UseFilters(new HttpExceptionFilter())
export class AppController {
  // @Get('/:userId')
  // getUser(@Param() userId: number) {
  //   return userId;
  // }
  // @Get()
  // findAll(): Observable<any[]> {
  //   return of([]);
  // }
  // @Post()
  // store(@Req() req: Request) {
  //   return req.body;
  // }
  // @Patch('/:userId')
  // update(@Req() req: Request) {
  //   return req.body;
  // }
}
