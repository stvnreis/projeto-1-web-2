import { Role } from '@/domain/management/enterprise/entities/role'

export class RolePresenter {
  static toHttp(role: Role) {
    return {
      id: role.id.toString(),
      name: role.name,
      type: role.type.toString(),
    }
  }
}
