import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/api/users')
      getAll(): any {
        return this.usersService.getAll();
    }

    @Get('api/users/:id')
      async getById(@Param('id', new ParseUUIDPipe()) id: string) {
      const user = await this.usersService.getById(id);
      if (!user) throw new NotFoundException('User not found');
      return user;
    }

}
