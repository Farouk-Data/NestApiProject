import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { Config } from 'prettier';

@Injectable()
export class PrismaService extends PrismaClient {
    //instatiate prisma client with its config
    constructor(config: ConfigService) {
        //super() will call the constructor of the class we are extending
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),
                }
            }
        })
    }
}
