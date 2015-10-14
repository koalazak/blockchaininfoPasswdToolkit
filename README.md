# blockchain.info recovery password toolkit

A script to off-line test passwords in a blockchain.info wallet.
If you forgot your password, with this script you can try and re-try passwords, indefinitely.
And even better, you can bruteforce passwords using a dictionary file.

### Requirements

  - Node >= 0.12
  - Your identifier/alias OR your encrypted wallet payload string in base64 **(you don't need a backup file)**
  - if you think use the bruteforce option, you need a dictionary file in UTF-8 format


### Installation

```sh
$ git clone [git-repo-url] blockchaininfoPasswdToolkit
$ cd blockchaininfoPasswdToolkit
$ npm install
```

### Run

```sh
$ node app.js
```

### Usage

```sh

  Usage: node app.js (-p <file ...> | -i <identifier>) [options]

  A tool for test passwords on a blockchain.info wallet

  Options:

    -h, --help                     output usage information
    -V, --version                  output the version number
    -p, --payload <file ...>       read payload from a file
    -i, --identifier <identifier>  get payload via API for that identifier
    -d, --dictionary <file ...>    check each password on this file
    -n, --iterations <number>      fix number of pbkdf2/iso7816 iterations. By Default check 1 to 20 and 5000

  Examples:

    $ node app.js -p mypayload.txt
    $ node app.js -i "8ea09594-830c-4681-9d9e-6fe4fe7d8be6"
    $ node app.js -i "8ea09594-830c-4681-9d9e-6fe4fe7d8be6" -d words.txt
    $ node app.js -i pepito -d words.txt
    $ node app.js -p mypayload.txt -n 5000
    $ node app.js -p mypayload.txt -n 5000 -d wordlist.txt

```

### TODO
  - ~~Get identifier's payload via API~~
  - ~~Load payload from a file~~
  - ~~Bruteforce mode~~
  - ~~Infinite re-try mode~~
  

### Lectures and more info

  - https://blockchain.info/wallet/wallet-format
  - https://blockchain.info/wallet/technical-faq
  - https://blockchain.info/wallet/wallet-faq
  - https://github.com/blockchain/My-Wallet
  - https://blockchain.info/wallet/security

### License

MIT

### Author

  - [Facu ZAK](https://github.com/koalazak) 
