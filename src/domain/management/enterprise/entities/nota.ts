import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Entity } from '@/core/entities/entity'

export interface NotaProps {
  evaluatorId: UniqueEntityID
  n1Value: number
  n2Value: number
  totalValue?: number
}

export class Nota extends Entity<NotaProps> {
  get evaluatorId(): UniqueEntityID {
    return this.props.evaluatorId
  }

  get n1Value(): number {
    return this.props.n1Value
  }

  get n2Value(): number {
    return this.props.n2Value
  }

  get totalValue(): number {
    return this.props.totalValue
  }

  public static create(props: NotaProps, id?: UniqueEntityID) {
    return new Nota(
      {
        ...props,
        totalValue: props.totalValue ?? props.n1Value * props.n2Value,
      },
      id,
    )
  }
}
