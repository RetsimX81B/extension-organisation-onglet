chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'addToGroup') {
        chrome.tabs.group({ tabIds: message.tabId }, (groupId) => {
            chrome.tabGroups.update(groupId, { title: message.groupName });
        });
    }
});

// Initialisation de l'extension : créer un stockage pour les groupes d'onglets
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ "tabGroups": {} });
});