import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HEROES_SERVICE',
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
      },
    ]),
  ],
  providers: [HeroesService, HeroesController],
})
export class HeroesModule {}
