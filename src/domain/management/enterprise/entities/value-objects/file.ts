export interface FileProps {
  url: string
  type: 'PDF'
}

export class File {
  private constructor(private readonly props: FileProps) {}

  get url(): string {
    return this.props.url
  }

  get type() {
    return this.props.type
  }

  static create(props: FileProps) {
    return new File(props)
  }
}
