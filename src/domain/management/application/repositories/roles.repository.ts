import { Role } from '../../enterprise/entities/role'

export abstract class RolesRepository {
  abstract create(role: Role): Promise<void>
  abstract findById(roleId: string): Promise<Role>
  abstract findByname(roleName: string): Promise<Role>
}
