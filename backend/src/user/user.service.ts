// src/user/user.service.ts

import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as validator from 'validator';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<{ message: string; user_id: string }> {
    console.log('Signup USERSERVICE - Received data:', createUserDto);

    if (!validator.isEmail(createUserDto.email)) {
      throw new BadRequestException({ type: 'email', message: "E-mail isn't in a valid format" });
    }

    const existingUser = await this.userModel.findOne({ email: createUserDto.email });

    if (existingUser) {
      throw new BadRequestException({ type: 'email', message: `E-mail ${createUserDto.email} already exists` });
    }

    const hashedPassword = await bcrypt.hashSync(createUserDto.password, 10);

    const newUser = new this.userModel({
      email: createUserDto.email,
      password: hashedPassword,
    });

    try {
      const savedUser = await newUser.save();
      return { message: 'User created !', user_id: savedUser._id.toString() };
    } catch (error) {
      throw new InternalServerErrorException('Error while saving the user');
    }
  }

  async login(createUserDto: CreateUserDto): Promise<{ message: string; user_id: string }> {
    console.log('Login USERSERVICE - Received data:', createUserDto.email, createUserDto.password);

    // Check if the email is in a valid format
    if (!validator.isEmail(createUserDto.email)) {
      throw new BadRequestException({ type: 'email', message: "E-mail isn't in a valid format" });
    }

    // Check if the user exists
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });

    if (!existingUser) {
      throw new BadRequestException({ type: 'email', message: `E-mail ${createUserDto.email} doesn't exist` });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compareSync(createUserDto.password, existingUser.password);

    if (!isPasswordValid) {
      throw new BadRequestException({ type: 'password', message: 'Password is incorrect' });
    }

    return { message: 'User logged in !', user_id: existingUser._id.toString() };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
