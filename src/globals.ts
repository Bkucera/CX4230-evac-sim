const w = 400
const h = 400

  const personColor = '#8BBF9F'
  const	wallColor = "#857E7B"
  const isNode = process.title.indexOf("node") !== -1

  const {
    personSize,
    exitWidth,
    numPeople,
    multiBehavioral,
    maxResponseTime,
  } = require('../params.json')


export {
	w,
	h,
  personColor,
  personSize,
  wallColor,
  exitWidth,
  isNode,
  numPeople,
  multiBehavioral,
  maxResponseTime,
}