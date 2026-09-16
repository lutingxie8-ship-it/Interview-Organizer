chrome.runtime.onInstalled.addListener(() => chrome.sidePanel.setPanelBehavior({openPanelOnActionClick:true}));
chrome.runtime.onMessage.addListener((m, s, reply) => {
  if (m.type === 'OPEN_PANEL' && s.tab?.id) chrome.sidePanel.open({tabId:s.tab.id});
  if (m.type === 'GET_PAGE_DATA') chrome.tabs.query({active:true,currentWindow:true}).then(([t]) => chrome.tabs.sendMessage(t.id,{type:'EXTRACT'}).then(reply).catch(()=>reply({}))).catch(()=>reply({}));
  return m.type === 'GET_PAGE_DATA';
});
