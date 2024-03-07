import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AuthorProps {
  name: string
}

export class Author extends Entity<AuthorProps> {
  get name() {
    return this.props.name
  }

  static create(props: AuthorProps, id?: UniqueEntityID) {
    return new Author(props, id)
  }
}
