# CX4230 Evacuation Sim
*a simulation project for Gatech CX4230*  
[![CircleCI](https://circleci.com/gh/Bkucera/CX4230-evac-sim.svg?style=svg)](https://circleci.com/gh/Bkucera/CX4230-evac-sim)

[Demo](http://kuc.io/CX4230-evac-sim/)

Install dependencies:

```bash
npm install
```

Run Dev Server (with auto-reloading):

```bash
npm start
```

build for testing/releasing:

```bash
npm run build
```

### To deploy to demo:

Build and populate docs folder:

```bash
npm run deploy
```

Commit and push to Master
```bash
git add docs
git commit -m "Deploy"
git push origin master
```
