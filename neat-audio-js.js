var Promise = require('es6-promise').Promise;

var AudioContext = window.AudioContext || window.webkitAudioContext || null;
var audioContext = new AudioContext();

function requestSound(url) {
  return new Promise(
    function(resolve) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      request.onload = function() {
        resolve(request.response);
      };
      request.send();
    }
  );
}

function decodeAudio(arrayBuffer) {
  return new Promise(
    function(resolve) {
      audioContext.decodeAudioData(arrayBuffer, function(buffer) {
        resolve(buffer);
      });
    }
  );
}

/**
 * A simple Audio API for interacting with the young web audioContext
 * @type {{}}
 */
var NeatAudioJS = {

  /**
   * Fetches a sound through XMLHttpRequest and then decodes it.
   * Returns a promise that resolves after decoding has completed.
   * @param url  the url of the audio clip you wish to fetch
   * @returns {Promise}
   */
  fetchSound: function(url) {
    return new Promise(
      function(resolve) {
        resolve(requestSound(url)
          .then(function(arrayBuffer) {
            return decodeAudio(arrayBuffer);
          })
        );
      }
    );
  },

  /**
   * Plays a decoded audio buffer
   * @param buffer  the buffer you wish to play
   */
  playSound: function(buffer) {
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
  }

};

module.exports = NeatAudioJS;
