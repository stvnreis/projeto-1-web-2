export interface userRequest {
  id: string
  role: {
    id: string
    type: 'ADMIN' | 'AUTOR' | 'AVALIADOR'
  }
}
