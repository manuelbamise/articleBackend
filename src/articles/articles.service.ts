import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { isEmpty } from 'rxjs';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto, title: string) {
    try {
      const articlePresent = await this.prisma.article.findUnique({
        where: { title },
      });
      if (!articlePresent) {
        const newArticle = await this.prisma.article.create({
          data: createArticleDto,
        });
        return newArticle;
      }
      throw new BadRequestException();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findPublished() {
    try {
      var publishedArticles = await this.prisma.article.findMany({
        where: { published: true },
      });
      if (!publishedArticles) {
        throw new NotFoundException();
      }
      console.log('Articles found');
      return publishedArticles;
    } catch (error) {
      // console.log(error);
      throw new NotFoundException(error.message);
    }
  }

  async findDrafts() {
    try {
      var draftedArticles = await this.prisma.article.findMany({
        where: { published: false },
      });

      if (!draftedArticles || !draftedArticles.values) {
        return new NotFoundException();
      }
      console.log('Drafts found');
      return draftedArticles;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: number) {
    var uniqueId = await this.prisma.article.findUnique({ where: { id } });

    try {
      if (!uniqueId) {
        throw new NotFoundException();
      }

      return uniqueId;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    try {
      const articlePresent = await this.prisma.article.findUnique({
        where: { id },
      });

      const article = await this.prisma.article.update({
        where: { id },
        data: updateArticleDto,
      });

      if (!articlePresent) {
        throw new NotFoundException();
      }

      return article;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const articlePresent = await this.prisma.article.findUnique({
        where: { id },
      });

      if (!articlePresent) {
        throw new NotFoundException();
      }
      const article = await this.prisma.article.delete({ where: { id } });
      return {
        msg: `The article with title: ${article.title} has been deleted successfully`,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
