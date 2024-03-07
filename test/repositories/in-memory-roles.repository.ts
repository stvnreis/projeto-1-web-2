import { RolesRepository } from '@/domain/management/application/repositories/roles.repository'
import { Role } from '@/domain/management/enterprise/entities/role'

export class InMemoryRolesRepository implements RolesRepository {
  items: Role[] = []

  async create(role: Role): Promise<void> {
    this.items.push(role)
  }

  async findById(roleId: string): Promise<Role> {
    const role = this.items.find((item) => item.id.toString() === roleId)
    if (!role) return null

    return role
  }

  async findByname(roleName: string): Promise<Role> {
    const role = this.items.find((item) => item.name === roleName)
    if (!role) return null

    return role
  }
}
