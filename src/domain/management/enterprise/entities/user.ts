import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface UserProps {
  name: string
  email: string
  password: string
  roleId: UniqueEntityID
}

export class User extends Entity<UserProps> {
  get name(): string {
    return this.props.name
  }

  get roleId(): UniqueEntityID {
    return this.props.roleId
  }

  get password(): string {
    return this.props.password
  }

  get email(): string {
    return this.props.email
  }

  changeName(name: string): void {
    this.props.name = name
  }

  changeRole(roleId: UniqueEntityID): void {
    this.props.roleId = roleId
  }

  static create(props: UserProps, id?: UniqueEntityID): User {
    return new User(props, id)
  }
}
