
var url = 'http://mylogger.io/log';

function log(message) {

  console.log(message);
}


const _log = log;
export { _log as log };
