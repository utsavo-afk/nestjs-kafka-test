import { Controller, OnModuleInit } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';

@Controller()
export class HeroesController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'hero',
        brokers: ['localhost:9093'],
      },
      consumer: {
        groupId: 'hero-consumer',
      },
    },
  })
  client: ClientKafka;

  onModuleInit() {
    this.client.subscribeToResponseOf('hero');
  }

  @MessagePattern('hero')
  hero(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log(`Topic: ${context.getTopic()}`);
  }
}
