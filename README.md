# blockchain.info recovery password toolkit

A script to off-line test passwords in a blockchain.info wallet.
If you forgot your password, with this script you can try and re-try passwords, indefinitely.
And even better, you can bruteforce passwords using a dictionary file.

### Requirements

  - Node >= 0.12
  - Your identifier/alias OR your encrypted wallet payload string in base64
  - If you want to use the bruteforce option, you need a dictionary file in UTF-8 format
  - **You don't need a backup file**


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

### About speed and pbkdf2 iterations

A lo largo del tiempo, blockchain.info usó un numero diferente de interaciones pbkdf2 para encriptar los wallets.
Al principio usaba 1 iteracion, luego 10, luego 20 y ahora 5000. Y este dato no es informado para los identifiers más viejos cuando se consulta un payload via API.
Es por eso que esta herramienta intenta desecriptar el payload utilizando todas estas posiblidades de iteraciones anteriores.
Solo en las nuevas accounts, la API nos especifica con cuantas iteraciones fue encriptado el payload.
Entonces, si conoces el numero de iteraciones exacto con que fue encriptado tu payload, es mejor que lo especifiques con el parametro -i para evitar que el script intente con las opciones viejas(1,10,20,5000).
Si especificas el identifier y este es de los nuevos, el script usará el numero exacto de interaciones que diga la API de blockchain.info.
Resumiento: para incrementar la velocidad del script, especifica el numero de iteraciones exacto con el aprametro -i


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
