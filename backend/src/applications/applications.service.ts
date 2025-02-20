// import { Injectable } from '@nestjs/common';
// import { CreateApplicationDto } from './dto/create-application.dto';
// import { UpdateApplicationDto } from './dto/update-application.dto';
// import { Application } from './entities/application.entity';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';

// @Injectable()
// export class ApplicationsService {

//   constructor(@InjectModel(Application.name) private applicationModel: Model<Application>) {}

//   create(createApplicationDto: CreateApplicationDto) {
//     const newApplication = new this.applicationModel(createApplicationDto);
//     return newApplication.save();
//   }

//   findAll() {
//     return this.applicationModel.find().exec();
//   }

//   findOne(id: number) {
//     return this.applicationModel.findById(id).exec();
//   }

//   update(id: number, updateApplicationDto: UpdateApplicationDto) {
//     return this.applicationModel.findByIdAndUpdate(id, UpdateApplicationDto, { new: true }).exec();
//   }

//   remove(id: number) {
//     return this.applicationModel.findByIdAndDelete(id).exec();
//   }
// }
