import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
@ApiTags('Articles CRUD Endpoints')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('createArticle')
  @ApiCreatedResponse({type: ArticleEntity})
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get('getPublishedArticles')
  @ApiOkResponse({type: ArticleEntity, isArray:true})
  findAll() {
    return this.articlesService.findAll();
  }

  @Get('getDraftedArticles')
  @ApiOkResponse({type:ArticleEntity})
  findDrafts(){
    return this.articlesService.findDrafts();
  }

  @Get(':id')
  @ApiOkResponse({type:ArticleEntity})
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch('update:id')
  @ApiOkResponse({type:ArticleEntity})
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete('delete:id')
  @ApiOkResponse({type:ArticleEntity})
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}