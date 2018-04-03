# Housing-sim :house:
clone this repo using git:
```
git clone https://github.com/Bkucera/housing-sim.git && cd housing-sim
```

install [nodejs version manager](https://github.com/creationix/nvm):
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

then reload your bashrc:
```
. ~/.bashrc
```

then activate the LTS version of nodejs:
```
nvm install --lts
```
```
nvm alias default node
```

finally, install my dependencies:
```
npm install
```
and run the simulation:
```
npm start
```

Now the project will be visible as a web server on localhost:9000. You can use ssh to map this to your own comupters localhost:9000 through ssh using `ssh -L 9000:localhost:9000` or something like that.
You don't need this to work but it's how you open the web server.
Telling you how to map your localhost to the virtual machine is past the scope of this readme and isn't part of the project, however.

**Note:** Don't worry, none of the dependencies actually affect the running of the code, they just enable the compiling of TypeScript `.ts` files to run with `Nodejs`

to run the simulation again, just use `npm start`

