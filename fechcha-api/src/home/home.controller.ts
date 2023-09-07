import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller()
export class HomeController {
  constructor(private readonly HomeService: HomeService) {} //Inject the Service

  @Get()
  getHello(): string {
    return this.HomeService.getHello() ;
  }
}