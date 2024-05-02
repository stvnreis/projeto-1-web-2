import { Author } from '@/domain/management/enterprise/entities/author'

export class AuthorPresenter {
  static toHttp(entity: Author) {
    return {
      id: entity.id.toString(),
      name: entity.name,
    }
  }
}
