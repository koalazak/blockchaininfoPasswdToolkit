# blockchain.info Password toolkit

A script to off-line test passwords in a blockchain.info wallet.

## TODO
  - Get identifier's payload via API
  - Bruteforce mode
  - Infinite re-try mode

### Installation

```sh
$ git clone [git-repo-url] blockchaininfoPasswdToolkit
$ cd blockchaininfoPasswdToolkit
$ npm install
```

### Run

- Search your identifier payload here: https://blockchain.info/wallet/[[your_identifier]]?format=json
- Edit app.js to put your password and payload and then:

```sh
$ node app.js
```

### License

MIT

