import { Inject, Injectable } from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { Ad } from './entities/ad.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Kafka } from 'kafkajs';


@Injectable()
export class AdsService {

  // @Client({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: ['localhost:9093'],
  //     },
  //   },
  // })
  // private client: ClientKafka;

  private kafka = new Kafka({
    clientId: 'ad-publisher',
    // brokers: ['localhost:9093'],
    brokers: ['kafka:9093'],
  });

  private producer = this.kafka.producer();

  constructor(
    @InjectModel(Ad.name) private adModel: Model<Ad>,
  ) {
    this.connectProducer();
  }

  private async connectProducer() {
    try {
      await this.producer.connect();
      console.log('Producer Kafka connected');
    } catch (error) {
      console.error('Connection error producer Kafka:', error);
    }
  }

  async create(createAdDto: CreateAdDto) {
    const newAd = new this.adModel(createAdDto);
    const savedAd = await newAd.save();

    try {
      await this.producer.send({
        topic: 'ad-notifications', 
        messages: [
          {
            value: JSON.stringify({
              adId: savedAd._id,
              title: savedAd.title,
              createdAt: new Date(),
            }),
          },
        ],
      });
  
      console.log('Message Kafka', savedAd._id);
    } catch (error) {
      console.error('Error Kafka:', error);
    }

    return savedAd;

    // const newAd = new this.adModel(createAdDto);
    // return newAd.save();
  }

  findAll() {
    return this.adModel.find().exec();
  }

  findOne(id: string) {
    return this.adModel.findById(id).exec();
  }

  update(id: number, updateAdDto: UpdateAdDto) {
    return this.adModel.findByIdAndUpdate(id, updateAdDto, { new: true }).exec();
  }

  remove(id: number) {
    return this.adModel.findByIdAndDelete(id).exec();
  }
}
