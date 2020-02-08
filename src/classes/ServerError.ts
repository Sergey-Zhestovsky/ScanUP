import { ErrorsList, ServerErrorCodes, OriginError } from "../data/serverErrors";

export { ErrorsList, ServerErrorCodes };

export interface ServerErrorObject {
  id: string;
  code: string;
  name: string;
  date: Date;
  source: any;
  describe: OriginError | null;
};

export default class ServerError {

  public date: Date;
  public describe: OriginError;
  public source: any;

  constructor(public id: string, public code: ServerErrorCodes,
    public name: string, date: number, source?: any) {
    this.date = new Date(date);
    this.describe = ErrorsList[code] ?? ErrorsList[ServerErrorCodes.ERROR_UNKNOWN];
    this.source = source;
  }

  static create({
    id = "",
    code,
    name = ErrorsList[ServerErrorCodes.ERROR_UNKNOWN].message,
    date = Date.now(),
    source
  }: { id: string, code: ServerErrorCodes, name: string, date: string | number, source?: string }) {
    code = ErrorsList[code] ? code : ServerErrorCodes.ERROR_UNKNOWN;

    return new ServerError(id, code, name, Number(date), source);
  }

  get Error(): ServerErrorObject {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      date: this.date,
      source: this.source,
      describe: this.describe
    };
  }

  get Message(): string {
    return this.describe.message;
  }
}