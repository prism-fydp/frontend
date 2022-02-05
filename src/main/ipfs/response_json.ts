import { DaemonRequest } from "./classes";
import { Serializable } from "./serializable";

export class Response implements Serializable<Response> {
    Class = DaemonRequest.PING;
    Msg   = "";

    serialize(): string {
        return JSON.stringify(this)
    }

    deserialize(input: string): Response {
        var data = JSON.parse(input);
        
        this.Class = data.Class;
        this.Msg   = data.Msg;

        return this;
    }
}
