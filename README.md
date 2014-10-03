neatAudio
===========

A simple, neat promise wrapper for the web Audio Context API. Get and play sounds from urls with ease.

### Example usage

```javascript
var neatAudio = require('neat-audio');

neatAudio.fetchSound('/Wilhelm scream.mp3').then(function(buf) {
    neatAudio.playSound(buf);
  });
```