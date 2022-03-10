import * as net from 'net';

import Request from './request_json';
import Response from './response_json';
import DaemonRequest from './classes';

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 7777;

/*
 * Creates a client connection to the server and defines how to respond when
 * this connection exits. Connected socket is returned
 */
const createClient = (
  port: number,
  host: string,
  reject: (reason?: Error) => void
): net.Socket => {
  const client = new net.Socket();

  client.on('error', (err) => {
    reject(err);
  });

  client.connect(port, host, () => {
    // console.log(`Connected to daemon (${this.HOST}:${this.PORT})`);
  });

  client.on('end', () => {
    // console.log('Disconnected from daemon');
  });
  return client;
};

/*
 *
 */
const issueRequest = (
  client: net.Socket,
  request: Request,
  reject: (reason?: Error) => void
) => {
  if (!client.write(request.serialize())) {
    reject(new Error('Failed to send request to daemon'));
  }
};

/*
 * Parses a response from the server into a typescript response structure
 */
const parseResponse = (data: Buffer) => {
  const dataStr: string = data.toString();
  return new Response().deserialize(dataStr);
};

/*
 * ping the daemon. Mainly used for testing or verifying that the daemon is
 * running. Returns whether the ping was correctly received.
 */
export function pingIPFS(port = DEFAULT_PORT, host = DEFAULT_HOST) {
  return new Promise((resolve, reject) => {
    const client = createClient(port, host, reject);

    const request = new Request();
    request.Class = DaemonRequest.PING;
    issueRequest(client, request, reject);

    client.on('data', (data) => {
      const response = parseResponse(data);
      client.end();
      if (response.Msg === 'Pong') {
        resolve(true);
      } else {
        reject(new Error(`Received response '${response.Msg}' and not 'Pong'`));
      }
      client.end();
    });
  });
}

/*
 * add a file or directory to IPFS. The string returned on success is the CID
 * of the added content.
 */
export function addIPFS(
  path: string,
  port = DEFAULT_PORT,
  host = DEFAULT_HOST
) {
  return new Promise((resolve, reject) => {
    const client = createClient(port, host, reject);

    const request = new Request();
    request.Class = DaemonRequest.ADD;
    request.Path = path;
    issueRequest(client, request, reject);

    client.on('data', (data) => {
      resolve(parseResponse(data).Msg);
      client.end();
    });
  });
}

/*
 * Get a piece of content from IPFS. Given the CID to fetch and the path to
 * the directory to save the content into, the daemon will interact with
 * IPFS and download as needed. Returned will be the path to the content
 */
export function getIPFS(
  cid: string,
  path: string,
  port = DEFAULT_PORT,
  host = DEFAULT_HOST
) {
  return new Promise((resolve, reject) => {
    const client = createClient(port, host, reject);

    const request = new Request();
    request.Class = DaemonRequest.GET;
    request.Cid = cid;
    request.Path = path;
    issueRequest(client, request, reject);

    client.on('data', (data) => {
      resolve(parseResponse(data).Msg);
      client.end();
    });
  });
}

/*
 * Sets the specified setting to the given value within the IPFS daemon. Upon
 * changing this setting, the daemon will restart to apply said setting.
 */
export function setIPFS(
  setting: string,
  value: string,
  port = DEFAULT_PORT,
  host = DEFAULT_HOST
) {
  return new Promise((resolve, reject) => {
    const client = createClient(port, host, reject);

    const request = new Request();
    request.Class = DaemonRequest.SETTING;
    request.Cid = setting;
    request.Path = value;
    issueRequest(client, request, reject);

    client.end();
    resolve(true);
  });
}
