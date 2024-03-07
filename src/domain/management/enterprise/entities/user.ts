import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface UserProps {
  name: string
  roleId: UniqueEntityID
}

export class User extends Entity<UserProps> {
  get name(): string {
    return this.props.name
  }

  get roleId(): UniqueEntityID {
    return this.props.roleId
  }

  static create(props: UserProps, id?: UniqueEntityID): User {
    return new User(props, id)
  }
}
