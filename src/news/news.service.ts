import { Injectable } from '@nestjs/common';
import { News } from './entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>,
  ) {}

  async findAll() {
    return await this.newsRepository.find();
  }

  async findOne(id: number): Promise<News | null> {
    return await this.newsRepository.findOne({ where: { id } });
  }
}
