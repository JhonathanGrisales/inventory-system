import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Roles } from './entities/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [RolesController],
  providers: [RolesService],
  exports:[RolesService],
  imports:[TypeOrmModule.forFeature([Roles])]
})
export class RolesModule {}
