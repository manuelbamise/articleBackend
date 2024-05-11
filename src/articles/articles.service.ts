import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { error } from 'console';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({ data: createArticleDto });
  }

  async findPublished() {
    var publishedArticles = await this.prisma.article.findMany({
      where: { published: true },
    });
    //console.clear()
    if (publishedArticles.length < 1) {
      console.log('No articles found');
      return { msg: 'No articles found', Error };
    }
    console.log('Articles found');
    return publishedArticles;
  }

  async findDrafts() {
    var draftedArticles = await this.prisma.article.findMany({
      where: { published: false },
    });
    //console.clear()
    if (draftedArticles.length < 1) {
      console.log('No drafts found');
      return { msg: 'No drafts found', Error };
    }
    console.log('Drafts found');
    return draftedArticles;
  }

  async findOne(id: number) {
    var uniqueId = await this.prisma.article.findUnique({ where: { id } });

    if (uniqueId.id != id) {
      console.log('Id mismatch');
      return {error}
    }

    return uniqueId;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }
}
