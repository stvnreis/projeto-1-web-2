import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { File } from './value-objects/file'

export interface ArticleProps {
  title: string
  sinopse: string
  file: File
  authorsId: UniqueEntityID[]
}

export class Article extends Entity<ArticleProps> {
  get title(): string {
    return this.props.title
  }

  get sinopse(): string {
    return this.props.sinopse
  }

  get file(): File {
    return this.props.file
  }

  get authorsId(): UniqueEntityID[] {
    return this.props.authorsId
  }

  set title(title: string) {
    this.props.title = title
  }

  set sinopse(sinopse: string) {
    this.props.sinopse = sinopse
  }

  changeAuthorsId(authorsId: UniqueEntityID[]): void {
    this.props.authorsId = authorsId
  }

  changeFile(file: File): void {
    this.props.file = file
  }

  static create(props: ArticleProps, id?: UniqueEntityID) {
    return new Article(props, id)
  }
}
