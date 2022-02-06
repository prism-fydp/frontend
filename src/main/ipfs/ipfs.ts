import * as net from 'net';

import Request from './request_json';
import Response from './response_json';
import DaemonRequest from './classes';

const HOST = 'localhost';
const PORT = 7777;

const createClient = (reject: (reason?: Error) => void): net.Socket => {
  const client = new net.Socket();

  client.on('error', (err) => {
    reject(err);
  });

  client.connect(PORT, HOST, () => {
    // console.log(`Connected to daemon (${this.HOST}:${this.PORT})`);
  });

  client.on('end', () => {
    // console.log('Disconnected from daemon');
  });
  return client;
};

const parseResponse = (data: Buffer) => {
  const dataStr: string = data.toString();
  return new Response().deserialize(dataStr);
};

/*
 * ping the daemon. Mainly used for testing or verifying that the daemon is
 * running. Returns whether the ping was correctly received.
 */
export function pingIPFS() {
  return new Promise((resolve, reject) => {
    const client = createClient(reject);

    const request = new Request();
    request.Class = DaemonRequest.PING;

    if (!client.write(request.serialize())) {
      reject(new Error('Failed to send request to daemon'));
    }

    client.on('data', (data) => {
      const response = parseResponse(data);
      if (response.Msg === 'Pong') {
        resolve(true);
      } else {
        reject(
          new Error(`Received response '${response.Msg}' and note 'Pong'`)
        );
      }
    });

    client.on('error', (err) => {
      reject(err);
    });
  });
}

/*
 * add a file or directory to IPFS. The string returned on success is the CID
 * of the added content.
 */
export function addIPFS(path: string) {
  return new Promise((resolve, reject) => {
    const client = createClient(reject);

    const request = new Request();
    request.Class = DaemonRequest.ADD;
    request.Path = path;

    if (!client.write(request.serialize())) {
      reject(new Error('Failed to send request to daemon'));
    }

    client.on('data', (data) => {
      resolve(parseResponse(data).Msg);
    });
  });
}

/*
 * Get a piece of content from IPFS. Given the CID to fetch and the path to
 * the directory to save the content into, the daemon will interact with
 * IPFS and download as needed. Returned will be the path to the content
 */
export function getIPFS(cid: string, path: string) {
  return new Promise((resolve, reject) => {
    const client = createClient(reject);

    const request = new Request();
    request.Class = DaemonRequest.GET;
    request.Cid = cid;
    request.Path = path;

    if (!client.write(request.serialize())) {
      reject(new Error('Failed to send request to daemon'));
    }

    client.on('data', (data) => {
      resolve(parseResponse(data).Msg);
    });
  });
}
