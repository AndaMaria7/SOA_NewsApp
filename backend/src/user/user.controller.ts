// src/user/user.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/signup")
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("/login")
  async login(@Body() createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/all')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id);
  }
}
