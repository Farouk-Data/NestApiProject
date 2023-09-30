import { PartialType } from '@nestjs/mapped-types';
import { CreateMatchMakingDto } from './create-match-making.dto';

export class UpdateMatchMakingDto extends PartialType(CreateMatchMakingDto) {
  id: number;
}
