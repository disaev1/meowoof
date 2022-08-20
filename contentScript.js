function createHighlightedLove(love) {
  const newNode = document.createElement('span');

  newNode.style.backgroundColor = 'rgba(106, 78, 243, 0.3)';
  newNode.style.borderRadius = '3px';
  newNode.style.padding = '0 5px';
  newNode.textContent = love;

  return newNode;
}

function processLove() {
  const processedMarkerId = 'meowoof-processed';
  const processedMarker = document.getElementById(processedMarkerId);

  if (processedMarker) {
    return;
  }

  function getTextNodesOf(el) {
    const res = [];
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    let next = walk.nextNode;

    while (next) {
      res.push(next);
      next = walk.nextNode();
    }

    return res;
  }

  chrome.storage.sync.get(['enabled', 'love', 'loveOptions'], ({ enabled, love, loveOptions }) => {
    if (love.length !== 1 || !enabled) {
      return;
    }

    const onlyLove = love[0];
    const textNodes = getTextNodesOf(document.body);

    textNodes.forEach((node) => {
      if (!node.textContent) {
        return;
      }

      const searchRegExp = new RegExp(loveOptions.join('|'), 'gi');
      const otherParts = node.textContent.split(searchRegExp);

      if (otherParts.length > 1) {
        const res = [];

        otherParts.forEach((part, index) => {
          res.push(document.createTextNode(part));

          if (index < otherParts.length - 1) {
            res.push(createHighlightedLove(onlyLove));
          }
        });

        node.replaceWith(...res);
      }
    });

    const newProcessedMarker = document.createElement('div');
    newProcessedMarker.style.display = 'none';
    newProcessedMarker.id = processedMarkerId;
    document.body.append(newProcessedMarker);
  });
}

processLove();
