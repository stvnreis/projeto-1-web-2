import { RolesRepository } from '@/domain/management/application/repositories/roles.repository'
import { Role } from '@/domain/management/enterprise/entities/role'
import { Injectable } from '@nestjs/common'
import { RoleMapper } from '../mappers/role.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaRolesRepository implements RolesRepository {
  constructor(private readonly db: PrismaService) {}

  async create(role: Role): Promise<void> {
    const data = RoleMapper.toPrisma(role)

    await this.db.role.create({ data })
  }

  async findAll(): Promise<Role[]> {
    const roles = await this.db.role.findMany()

    return roles.map(RoleMapper.toDomain)
  }

  async findById(roleId: string): Promise<Role> {
    const role = await this.db.role.findFirst({ where: { id: roleId } })
    if (!role) return null

    return RoleMapper.toDomain(role)
  }

  async findByname(roleName: string): Promise<Role> {
    const role = await this.db.role.findFirst({ where: { name: roleName } })
    if (!role) return null

    return RoleMapper.toDomain(role)
  }
}
