import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    if (!process.env.KAFKA_CONSUMER_BROKERS) {
      throw new Error('KAFKA_CONSUMER_BROKERS env variable is missing');
    }

    if (!process.env.KAFKA_CONSUMER_USERNAME) {
      throw new Error('KAFKA_CONSUMER_USERNAME env variable is missing');
    }

    if (!process.env.KAFKA_CONSUMER_PASSWORD) {
      throw new Error('KAFKA_CONSUMER_PASSWORD env variable is missing');
    }

    super({
      client: {
        clientId: 'notifications',
        brokers: [process.env.KAFKA_CONSUMER_BROKERS],
        sasl: {
          mechanism: 'scram-sha-256',
          username: process.env.KAFKA_CONSUMER_USERNAME,
          password: process.env.KAFKA_CONSUMER_PASSWORD,
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
