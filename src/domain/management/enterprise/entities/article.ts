import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { File } from './value-objects/file'
import { Nota } from './nota'

export interface ArticleProps {
  title: string
  sinopse: string
  file: File
  isPublished?: boolean
  authorsId: UniqueEntityID[]
  grades?: Nota[]
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

  get isPublished(): boolean {
    return this.props.isPublished
  }

  get grades(): Nota[] {
    return this.props.grades
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

  publish(): void {
    this.props.isPublished = true
  }

  evaluate(grade: Nota): void {
    const hasEvaluated = this.grades.find((item) =>
      item.evaluatorId.equals(grade.evaluatorId),
    )

    if (!hasEvaluated) {
      this.props.grades.push(grade)
    } else {
      throw new Error('Article has already been evaluated by user.')
    }
  }

  static create(props: ArticleProps, id?: UniqueEntityID) {
    return new Article(
      {
        ...props,
        isPublished: props.isPublished ?? false,
        grades: props.grades ?? [],
      },
      id,
    )
  }
}
