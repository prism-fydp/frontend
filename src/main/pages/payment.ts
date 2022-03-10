import { shell } from 'electron';
import * as http from 'http';

const createPaymentPage = (addr: string) => {
  return `
  <!DOCTYPE html>
    <head lang="eng-us">
      <style>
        body {
          max-width: 50em;
          margin: auto;
          display: flex;
          flex-direction: column;
        }

        input {
          width: 100%;
        }

        .connect-div {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .send-div {
          justify-content: flex-end;
        }

        .row {
          display: flex;
          margin-top: 1em;
        }

        .column {
          flex: 50%;
        }

        .addr {
          margin: auto;
        }

        .footer {
          margin-top: 2em;
        }

        .header {
          margin-top: 1em;
          margin-bottom: 1em;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Prism Author Payment</h1>
      </div>
      <div class="download-div" style="display: none;">
        <p>
          Transactions to authors are done directly on ethereum. Currently,
          wallet support is limited to metamask, with more to come.
        </p>
        <p>
          It appears that you do not have metamask accessible from within your
          browser. To continue with a payment, the metamask extension is
          required.
        </p>
      </div>
      <div class="connect-div">
        <button type="button" class="connect">Connect</button>
        <p>
          Transactions to authors are done directly on ethereum. Currently,
          wallet support is limited to metamask, with more to come.
        </p>
        <p>
          To complete this transaction, click the button above. This will open
          a prompt from your matamask extension, allowing you to login and
          begin the transaction.
        </p>
      </div>
      <div class="payment-div" style="display: none;">
        <div class="row">
          <div class="column">
            Amount (Ether):
          </div>
          <div class="column">
            <input class="amount" type="number" placeholder="Ether amount..." min="0" value="0" required>
          </div>
        </div>
        <div class="row">
          <div class="column">
            Recipient Address:
          </div>
          <div class="column">
            <p class="addr">${addr}</p>
          </div>
        </div>
        <div class="row send-div">
          <button type="submit" class="Send">Send</button>
        </div>
      </div>
      <div class="footer">
        <small>
          Note that this webpage is entirely self-hosted. As always, you are in
          control of your data and transaction information.
        </small>
      </div>
    </body>
    <script>
    if (!ethereum) {
      document.querySelector('.download-div').style.display = "";
      document.querySelector('.connect-div').style.display = "none";
    }

    document.querySelector('.Send').addEventListener('click', () => {
      ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: ethereum.selectedAddress,
              to: '${addr}',
              value: getWeiHex(),
            },
          ],
        })
        .catch((err) => {
          alert(err.message)
        });
    });

    document.querySelector('.connect').addEventListener('click', () => {
      getAccount();
    });

    function getWeiHex() {
      return parseInt(getWei(), 10).toString(16);
    }

    function getWei() {
      const val = document.querySelector('.amount').value + "000000000000000000";
      const idx = val.indexOf(".");
      if (idx === -1) {
        return val;
      }
      return [val.slice(0, idx), val.slice(idx+1, idx+19)].join('');
    }

    async function getAccount() {
      accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        document.querySelector('.payment-div').style.display = "";
        document.querySelector('.connect-div').style.display = "none";
      }
    }
    </script>
  </html>`;
};

const openPaymentPage = (addr: string) => {
  // Generate the webpage contents for the payment to the given eth address
  const paymentPage = createPaymentPage(addr);

  // Generate an HTTP server that will be able to provide the payment page web
  // contents to the browser. We require that this file be opened in the
  // browser since that is where wallet management will occur.
  const server = http.createServer((_, res) => {
    res.writeHead(200, 'Connected');
    res.write(paymentPage);
    res.end();
  });

  // Setup the HTTP server to be single-use. It will only provide the contents
  // of the webpage once.
  server.on('connection', (socket) => {
    socket.on('close', () => {
      server.close();
    });
  });

  // Startup the server, listening on port 8001
  server.listen(8001);

  // Create a connection to the server using the host's default application for
  // HTTP requests. This *should* be a browser, which will allow the user to
  // then login and send their payment.
  shell.openExternal(`http://localhost:8001`);
};

export default openPaymentPage;
