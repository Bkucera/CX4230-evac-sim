# CX4230 Evacuation Sim
*a simulation project for Gatech CX4230*  
[![CircleCI](https://circleci.com/gh/Bkucera/CX4230-evac-sim.svg?style=svg)](https://circleci.com/gh/Bkucera/CX4230-evac-sim)

[Demo - master](https://kuc.io/CX4230-evac-sim/master)

Install dependencies:

```bash
npm install
```

Run Dev Server (with auto-reloading):

```bash
npm start
```

build for testing/releasing to the `dist/` directory:

```bash
npm run build
```

### Deployment

All deployments are automated though Circle-CI (scripted in `scripts/deploy-ci.ts`).

Any commit to any branch will trigger a build and deployment to `kuc.io/CX4230-evac-sim/` + `branch_name`  
It follows that `master` will be viewable here: [kuc.io/CX4230-evac-sim/master](https://kuc.io/CX4230-evac-sim/issue-6/)
# Running instructions for deeplearning cluster:

clone this repo using git or download:
```
git clone https://github.com/Bkucera/CX4230-evac-sim.git && cd CX4230-evac-sim
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
Navigate to localhost:9000 in a web browser.

The project will be visible as a web server on localhost:9000. You can use ssh to map this to your own computer's localhost:9000 through ssh using `ssh -L 9000:localhost:9000` or something like that.
You don't need this to work but it's how you open the web server.
Telling you how to map your localhost to the virtual machine is past the scope of this readme and isn't part of the project, however.

**Note:** Don't worry, none of the dependencies actually affect the running of the code, they just enable the compiling of TypeScript `.ts` files to run with `Nodejs`

to run the simulation again, just use `npm start`


