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

      if (articlePresent) {
        throw new BadRequestException(
          `The article with Title:${title} already exists`,
        );
      }
      const newArticle = await this.prisma.article.create({
        data: createArticleDto,
      });
      return newArticle;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const articles = await this.prisma.article.findMany();
      if (!articles || articles.length === 0) {
        throw new NotFoundException('No articles found');
      }
      console.log('Articles found');
      return articles;
    } catch (error) {
      throw error;
    }
  }

  async findPublished() {
    try {
      const publishedArticles = await this.prisma.article.findMany({
        where: { published: true },
      });

      if (!publishedArticles || publishedArticles.length === 0) {
        throw new NotFoundException('No Published articles found');
      }
      console.log('Articles found');
      return publishedArticles;
    } catch (error) {
      throw error;
    }
  }

  async findDrafts() {
    try {
      const draftedArticles = await this.prisma.article.findMany({
        where: { published: false },
      });

      if (!draftedArticles || draftedArticles.length === 0) {
        return new NotFoundException('No drafts found');
      }
      console.log('Drafts found');
      return draftedArticles;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const uniqueId = await this.prisma.article.findUnique({ where: { id } });

      if (!uniqueId) {
        throw new NotFoundException(`The article with id:${id} does not exist`);
      } else if (typeof id !== 'number') {
        throw new BadRequestException(
          `The id:${id} is supposed to be a number`,
        );
      }

      return uniqueId;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    try {
      const articlePresent = await this.prisma.article.findUnique({
        where: { id },
      });

      if (!articlePresent) {
        throw new NotFoundException(`The article with id:${id} was not found`);
      } else if (typeof id !== 'number') {
        throw new BadRequestException(
          `The id:${id} is supposed to be a number`,
        );
      }
      const article = await this.prisma.article.update({
        where: { id },
        data: updateArticleDto,
      });

      return article;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const articlePresent = await this.prisma.article.findUnique({
        where: { id },
      });

      if (!articlePresent) {
        throw new NotFoundException(`The article with id:${id} does not exist`);
      } else if (typeof id !== 'number') {
        throw new BadRequestException(
          `The id:${id} is supposed to be a number`,
        );
      }
      const article = await this.prisma.article.delete({ where: { id } });

      return {
        msg: `The article with title: ${article.title} has been deleted successfully`,
      };
    } catch (error) {
      throw error;
    }
  }

  async removeAll() {
    try {
      const articlePresent = await this.prisma.article.findMany();

      if (!articlePresent || articlePresent.length === 0) {
        throw new NotFoundException('No articles found');
      }

      await this.prisma.article.deleteMany();

      return {
        msg: `All articles have been deleted successfully`,
      };
    } catch (error) {
      throw error;
    }
  }
}
