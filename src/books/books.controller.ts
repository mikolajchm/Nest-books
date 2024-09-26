import { Controller, Get, Param, Delete, Body, Post, Put} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get('/')
      getAll(): any {
        return this.booksService.getAll();
    }

    @Get('/:id')
      async getById(@Param('id', new ParseUUIDPipe()) id: string) {
      const book = await this.booksService.getById(id);
      if (!book) throw new NotFoundException('404 not found');
      return book;
    }
    
    @Post('/')
    create(@Body() bookData: CreateBookDTO) {
        return this.booksService.create(bookData);
    } 
    
    @Put('/:id')
    async update(
      @Param('id', new ParseUUIDPipe()) id: string,
      @Body() bookData: UpdateBookDTO,
    ) {
      if (!(await this.booksService.getById(id)))
        throw new NotFoundException('Book not found');

      await this.booksService.updateById(id, bookData);
      return { success: true };
    }

    @Delete('/:id')
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
      if (!(await this.booksService.getById(id)))
        throw new NotFoundException('404 not found');
      await this.booksService.deleteById(id);
      return { success: true };
    }

}
