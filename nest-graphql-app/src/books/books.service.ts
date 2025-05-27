import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  create(input: CreateBookInput): Promise<Book> {
    const book = this.booksRepository.create(input);
    return this.booksRepository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.booksRepository.findOneBy({ id });
  }

  async update(input: UpdateBookInput): Promise<Book> {
    await this.booksRepository.update(input.id, input);
    return this.findOne(input.id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.booksRepository.delete(id);
    return result.affected > 0;
  }
}
