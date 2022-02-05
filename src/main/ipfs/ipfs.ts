import * as net from 'net';

import Request from './request_json';
import Response from './response_json';
import DaemonRequest from './classes';

class IPFS {
  HOST: string = 'localhost';

  PORT: number = 7777;

  client: net.Socket;

  constructor() {
    this.client = new net.Socket();
    this.init();
  }

  private init() {
    this.client.connect(this.PORT, this.HOST, () => {
      // console.log(`Connected to daemon (${this.HOST}:${this.PORT})`);
    });

    this.client.on('end', () => {
      // console.log('Disconnected from daemon');
    });
  }

  /*
   * Manually exit the connection with the daemon.
   */
  exit() {
    this.client.end();
  }

  /*
   * ping the daemon. Mainly used for testing or verifying that the daemon is
   * running. Returns whether the ping was correctly received.
   */
  ping() {
    return new Promise((resolve, reject) => {
      const request = new Request();
      request.Class = DaemonRequest.PING;

      if (!this.client.write(request.serialize())) {
        reject(new Error('Failed to write request to TCP connection'));
      }

      this.client.on('data', (data) => {
        const response = this.parseResponse(data);
        if (response.Msg === 'Pong') {
          resolve(true);
        } else {
          reject(
            new Error(`Received response '${response.Msg}' and not 'Pong'`)
          );
        }
      });

      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }

  /*
   * add a file or directory to IPFS. The string returned on success is the
   * CID of the added content.
   */
  add(path: string) {
    return new Promise((resolve, reject) => {
      const request = new Request();
      request.Class = DaemonRequest.ADD;
      request.Path = path;

      if (!this.client.write(request.serialize())) {
        reject(new Error('Failed to write request to TCP connection'));
      }

      this.client.on('data', (data) => {
        resolve(this.parseResponse(data).Msg);
      });

      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }

  /*
   * Get a piece of content from IPFS. Given the CID to fetch and the path to
   * the directory to save the content into, the daemon will interact with
   * IPFS and download as needed. Returned will be the path to the content
   */
  get(cid: string, path: string) {
    return new Promise((resolve, reject) => {
      const request = new Request();
      request.Class = DaemonRequest.GET;
      request.Cid = cid;
      request.Path = path;

      if (!this.client.write(request.serialize())) {
        reject(new Error('Failed to write request to TCP connection'));
      }

      this.client.on('data', (data) => {
        resolve(this.parseResponse(data).Msg);
      });

      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }

  parseResponse = (data: Buffer) => {
    const dataStr: string = data.toString();
    return new Response().deserialize(dataStr);
  };
}
