# blockchain.info recovery password toolkit
[![npm version](https://badge.fury.io/js/bciptk.svg)](http://badge.fury.io/js/bciptk)
[![npm dependency status](https://david-dm.org/koalazak/blockchaininfoPasswdToolkit.png)](https://david-dm.org/koalazak/blockchaininfoPasswdToolkit)

A script to off-line test passwords in a blockchain.info wallet.
If you forgot your password, with this script you can try and re-try passwords, indefinitely.
And even better, you can bruteforce passwords using a dictionary file.

### Requirements

  - Node >= 0.12
  - Your identifier/alias OR your encrypted wallet payload string in base64
  - If you want to use the bruteforce option, you need a dictionary file in UTF-8 format
  - **You don't need a backup file**


### Installation
Install as global:

```sh
$ sudo npm install bciptk -g
```

### Run

```sh
$ bciptk --help
```

### Usage

```sh

  Usage: bciptk (-p <file ...> | -i <identifier>) [options]

  A tool for test passwords on a blockchain.info wallet

  Options:

    -h, --help                     output usage information
    -V, --version                  output the version number
    -p, --payload <file ...>       read payload from a file
    -i, --identifier <identifier>  get payload via API for that identifier
    -d, --dictionary <file ...>    check each password on this file
    -n, --iterations <number>      fix number of pbkdf2/iso7816 iterations. By Default check 1 to 20 and 5000

  Examples:

    $ bciptk -p mypayload.txt
    $ bciptk -i "8ea09594-830c-4681-9d9e-6fe4fe7d8be6"
    $ bciptk -i "8ea09594-830c-4681-9d9e-6fe4fe7d8be6" -d words.txt
    $ bciptk -i pepito -d words.txt
    $ bciptk -p mypayload.txt -n 5000
    $ bciptk -p mypayload.txt -n 5000 -d wordlist.txt

```

### About speed and pbkdf2 iterations

Throughout time, blockchain.info used a different number of pbkdf2 iterations to encrypt the wallets.
They started with just 1; then came 10, 20 and it is now 5000. That number however, is not provided for older identifiers, whenever you query a payload via API. 
This is why this tool uses all of these possibilities to try and decrypt the payload.
New accounts on the other hand, do specify the number of iterations used in the wallet json. Therefore, if you know the exact number of iterations used to encrypt your payload, it is best to use the -n parameter with the correct number, to prevent the script from trying out all possibilities.
When you specify an identifier and it is one of the newer ones, the script will use the exact number of iterations as indicated by the API.
To recap: using the -n parameter to indicate the exact number of iterations will ensure it runs as fast as possible.


### Changelog
  - Get identifier's payload via API
  - Load payload from a file
  - Bruteforce mode
  - Infinite re-try mode
  

### Lectures and more info

  - [https://blockchain.info/wallet/wallet-format](https://blockchain.info/wallet/wallet-format)
  - [https://blockchain.info/wallet/technical-faq](https://blockchain.info/wallet/technical-faq)
  - [https://blockchain.info/wallet/wallet-faq](https://blockchain.info/wallet/wallet-faq)
  - [https://github.com/blockchain/My-Wallet](https://github.com/blockchain/My-Wallet)
  - [https://blockchain.info/wallet/security](https://blockchain.info/wallet/security)

### License

MIT

### Author

  - [Facu ZAK](https://github.com/koalazak) 
