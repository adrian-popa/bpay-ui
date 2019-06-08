export class Metadata {
  public category: string;
  public custom: Array<string>;
  public trusted: boolean;

  constructor(metadata: any = {}) {
    this.category = metadata.category;
    this.custom = metadata.custom;
    this.trusted = metadata.trusted;
  }
}
