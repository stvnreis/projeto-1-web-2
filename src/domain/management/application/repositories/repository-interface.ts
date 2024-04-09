export interface findAllOptions {
  ids: string[]
}

export interface RepositoryInterface<T> {
  create(entity: T): Promise<void>
  findById(id: string): Promise<T>
  findAll(options?: findAllOptions): Promise<T[]>
  updateOne(entity: T): Promise<void>
  updateMany(entities: T[]): Promise<void>
}
