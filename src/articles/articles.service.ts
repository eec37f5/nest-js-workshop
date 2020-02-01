import { Injectable } from '@nestjs/common';
import { ArticlesQuery } from './articles.query';
import { CreateArticleInput } from './create-article.input';
import { UpdateArticleInput } from './update-article.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesService {

  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>
  ){}


  findAll(query: ArticlesQuery){
    return this.articleRepository.find(query);
    // return this.articles.filter(article => article.title === query.title);
  }

  findOne(id: string) {
    return this.articleRepository.findOne(id)
    // return this.articles.find(article => article.id === id);
  }

  create(input: CreateArticleInput) {
    const article = this.articleRepository.create(input)  // ทำการ return entity == บรรทัด 32-34
    this.articleRepository.save(article)

    // const article = new Article()
    // article.title = input.title
    // article.body = input.body
  }
    // const article = { ...input, id: `${+new Date()}` };
// 
    // this.articles.push(article);
// 
    // return article;
  // }
// 
  async update(id: string, input: UpdateArticleInput) {
    let article = await this.articleRepository.findOne(id)
    article = this.articleRepository.merge(article, input)  //.merge(ข้อมูลตั้งต้น,entity) ->  เอาตัวหลังทับตัวหน้า
    this.articleRepository.save(article)
  }
    // let article = this.articles.find(article => article.id === id);
// 
    // for (let key in input) {
      // article[key] = input[key];
    // }
// 
    // return article;
  // }
// 
  delete(id: string) { 
    return this.articleRepository.delete(id)
  }
    // this.articles = this.articles.filter(article => article.id !== id);
  // }
}
 