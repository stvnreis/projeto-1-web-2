export interface RepositoryInterface<T> {
  create(entity: T): Promise<void>
  findById(id: string): Promise<T>
  findAll(): Promise<T[]>
  updateOne(entity: T): Promise<void>
}
