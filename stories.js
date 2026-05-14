(function () {
  var style = document.createElement('style');
  style.textContent =
    '.story-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:1000;align-items:center;justify-content:center;}' +
    '.story-overlay.active{display:flex;}' +
    '.story-card{position:relative;width:320px;max-width:92vw;aspect-ratio:9/16;max-height:82vh;border-radius:20px;overflow:hidden;display:flex;flex-direction:column;}' +
    '.story-bars{display:flex;gap:5px;padding:14px 14px 0;position:relative;z-index:2;}' +
    '.story-bar-track{flex:1;height:3px;background:rgba(255,255,255,0.35);border-radius:2px;overflow:hidden;}' +
    '.story-bar-fill{height:100%;background:#fff;border-radius:2px;width:0%;}' +
    '.story-close{position:absolute;top:14px;right:14px;background:none;border:none;color:rgba(255,255,255,0.8);font-size:22px;cursor:pointer;z-index:3;line-height:1;padding:4px;}' +
    '.story-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center;}' +
    '.story-emoji{font-size:80px;line-height:1;margin-bottom:24px;}' +
    '.story-text{font-size:26px;font-weight:800;color:#fff;line-height:1.3;letter-spacing:-0.5px;}' +
    '.story-tap-areas{position:absolute;inset:0;display:flex;z-index:1;}' +
    '.story-tap-prev,.story-tap-next{flex:1;cursor:pointer;}' +
    '.hero-avatar-ring{cursor:pointer;transition:transform 0.15s;}' +
    '.hero-avatar-ring:hover{transform:scale(1.06);}';
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.className = 'story-overlay';
  overlay.id = 'story-overlay';
  overlay.innerHTML =
    '<div class="story-card" id="story-card">' +
      '<div class="story-bars" id="story-bars"></div>' +
      '<button class="story-close" id="story-close">✕</button>' +
      '<div class="story-body">' +
        '<div class="story-emoji" id="story-emoji"></div>' +
        '<div class="story-text" id="story-text"></div>' +
      '</div>' +
      '<div class="story-tap-areas">' +
        '<div class="story-tap-prev"></div>' +
        '<div class="story-tap-next"></div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  var stories = [
    { emoji: '🇬🇷', text: 'From Greece,\nliving in California 🌴', bg: 'linear-gradient(135deg, #001a3a 0%, #0050aa 100%)' },
    { emoji: '💍', text: 'Married', bg: 'linear-gradient(135deg, #3a1c2e 0%, #7a2d5a 100%)' },
    { emoji: '🧸', text: 'Father of two', bg: 'linear-gradient(135deg, #1c1c3a 0%, #2d2d6b 100%)' },
    { emoji: '🐶', text: 'Dog dad to Mac', bg: 'linear-gradient(135deg, #1a2a1a 0%, #2d5a2d 100%)' }
  ];

  var current = 0, timer = null, DURATION = 3500;

  function openStory() {
    current = 0;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    buildBars();
    showStory(0);
  }

  function closeStory(e) {
    if (e) e.stopPropagation();
    clearTimeout(timer);
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function buildBars() {
    var bars = document.getElementById('story-bars');
    bars.innerHTML = stories.map(function (_, i) {
      return '<div class="story-bar-track"><div class="story-bar-fill" id="bar-' + i + '"></div></div>';
    }).join('');
  }

  function showStory(index) {
    clearTimeout(timer);
    var s = stories[index];
    document.getElementById('story-card').style.background = s.bg;
    document.getElementById('story-emoji').textContent = s.emoji;
    document.getElementById('story-text').innerHTML = s.text.replace('\n', '<br>');

    stories.forEach(function (_, i) {
      var fill = document.getElementById('bar-' + i);
      fill.style.transition = 'none';
      fill.style.width = i < index ? '100%' : '0%';
    });

    var fill = document.getElementById('bar-' + index);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        fill.style.transition = 'width ' + DURATION + 'ms linear';
        fill.style.width = '100%';
      });
    });

    timer = setTimeout(function () {
      if (current < stories.length - 1) { current++; showStory(current); }
      else { closeStory(); }
    }, DURATION);
  }

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeStory();
  });
  document.getElementById('story-close').addEventListener('click', closeStory);
  overlay.querySelector('.story-tap-prev').addEventListener('click', function (e) {
    e.stopPropagation();
    if (current > 0) { current--; showStory(current); }
  });
  overlay.querySelector('.story-tap-next').addEventListener('click', function (e) {
    e.stopPropagation();
    if (current < stories.length - 1) { current++; showStory(current); }
    else { closeStory(); }
  });

  document.querySelector('.hero-avatar-ring').addEventListener('click', openStory);
})();
