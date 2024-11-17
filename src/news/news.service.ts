import { Injectable } from '@nestjs/common';
import { News } from './entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>,
  ) {}

  async findAll(page: number = 1): Promise<{
    data: News[];
    totalPages: number;
    page: number;
    total: number;
  }> {
    const limit = 10;
    let effectivePage = Math.max(1, page);

    const [data, total] = await this.newsRepository.findAndCount({
      skip: (effectivePage - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    if (data.length === 0 && effectivePage > totalPages) {
      effectivePage = 1;
      const [firstPageData, firstPageTotal] =
        await this.newsRepository.findAndCount({
          skip: 0,
          take: limit,
        });
      return {
        data: firstPageData,
        totalPages: Math.ceil(firstPageTotal / limit),
        page: effectivePage,
        total: firstPageTotal,
      };
    }

    return { data, totalPages, page: effectivePage, total };
  }

  async findOne(id: number): Promise<News | null> {
    return await this.newsRepository.findOne({ where: { id } });
  }
}
