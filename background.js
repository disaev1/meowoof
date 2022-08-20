const loveOptions = ['cat', 'dog'];

chrome.runtime.onInstalled.addListener(async () => {
  chrome.storage.sync.set({ loveOptions, love: [loveOptions[0]] });
});
