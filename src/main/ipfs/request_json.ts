import DaemonRequest from './classes';
import Serializable from './serializable';

export default class Request implements Serializable<Request> {
  Class = DaemonRequest.PING;

  Cid = '';

  Path = '';

  serialize(): string {
    return JSON.stringify(this);
  }

  deserialize(input: string): Request {
    const data = JSON.parse(input);

    this.Class = data.Class;
    this.Cid = data.Cid;
    this.Path = data.Path;

    return this;
  }
}
