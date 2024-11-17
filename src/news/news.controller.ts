import { Controller, Get, Param, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll(@Query('page') page: number = 1) {
    return this.newsService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }
}
