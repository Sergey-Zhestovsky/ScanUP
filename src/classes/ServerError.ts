import { ErrorsList, ServerErrorCodes, OriginError } from "../data/serverErrors";

export { ErrorsList, ServerErrorCodes };

export interface ServerError {
  id: string;
  code: string;
  name: string;
  date: Date;
  source: any;
  describe: OriginError | null;
};

class ServerErrorBuilder {

  public date: Date;
  public describe: OriginError | null;
  public source: any;

  constructor(public id: string, public code: string,
    public name: string, date: string | number, source?: any) {
    this.date = new Date(date);
    this.describe = ErrorsList[code] ?? null;
    this.source = source;
  }

  get Error(): ServerError {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      date: this.date,
      source: this.source,
      describe: this.describe
    };
  }

}

export default ServerErrorBuilder;