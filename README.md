# CX4230 Evacuation Sim
*a simulation project for Gatech CX4230*  
[![CircleCI](https://circleci.com/gh/Bkucera/CX4230-evac-sim.svg?style=svg)](https://circleci.com/gh/Bkucera/CX4230-evac-sim)


[Demo - master](https://kuc.io/CX4230-evac-sim/master)

Install dependencies:

```bash
npm install
```

## Two ways to run the sim:

### 1. In a browser

```bash
npm run browser
```
Now open up a browser to **http://localhost:9000** to run the sim!
To rerun it, just reload the page.

### 2. In a terminal
```bash
npm run term
```
and the sim will run!


## Deployment

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
Navigate to **localhost:9000** in a web browser.  
to run the simulation again, just refresh the page.

The project will be visible as a web server on localhost:9000. You can use ssh to map this to your own computer's localhost:9000 through ssh using `ssh -L 9000:localhost:9000`.





