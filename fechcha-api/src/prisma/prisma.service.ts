import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    //instatiate prisma client with its config
    constructor() {
        //super() will call the constructor of the class we are extending
        super({
            datasources: {
                db: {
                    url: 'postgresql://fecha:123@localhost:5434/nest?schema=public',
                }
            }
        })
    }
}
