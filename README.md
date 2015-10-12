# blockchain.info recovery password toolkit

A script to off-line test passwords in a blockchain.info wallet.
If you forgot your password, with this script you can try and re-try passwords, indefinitely.
In the near future, the script will bruteforce passwords.

## TODO
  - Get identifier's payload via API
  - Bruteforce mode
  - ~~Infinite re-try mode~~

### Installation

```sh
$ git clone [git-repo-url] blockchaininfoPasswdToolkit
$ cd blockchaininfoPasswdToolkit
$ npm install
```

### Run

- Search your identifier payload here: https://blockchain.info/wallet/[[your_identifier]]?format=json
- Edit app.js to fill your payload and then run:

```sh
$ node app.js
```

### License

MIT

