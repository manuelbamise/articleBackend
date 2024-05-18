import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {  ApiTags } from '@nestjs/swagger';
//import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
@ApiTags('Articles CRUD Endpoints')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('create')
  //@ApiCreatedResponse({type: ArticleEntity})
  create(@Body() createArticleDto: CreateArticleDto,@Body('title') title:string) {
    return this.articlesService.create(createArticleDto, title);
  }

  @Get('getAll')
  //@ApiOkResponse({type: ArticleEntity})
  getAll(){
    return this.articlesService.getAll();
  }


  @Get('getPublished')
  //@ApiOkResponse({type: ArticleEntity, isArray:true})
  findPublished() {
    return this.articlesService.findPublished();
  }

  @Get('getDrafts')
 // @ApiOkResponse({type:ArticleEntity})
  findDrafts(){
    return this.articlesService.findDrafts();
  }

  @Get('get/:id')
 // @ApiOkResponse({type:ArticleEntity})
  findOne(@Param('id') id: number) {
    return this.articlesService.findOne(+id);
  }

  @Patch('update/:id')
 // @ApiOkResponse({type:ArticleEntity})
  update(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete('delete/:id')
 // @ApiOkResponse({type:ArticleEntity})
  remove(@Param('id') id: number) {
    return this.articlesService.remove(+id);
  }

//   @Delete('deleteAll')
//  // @ApiOkResponse({type:ArticleEntity})
//   removeAll() {
//     return this.articlesService.removeAll();
//   }
}
