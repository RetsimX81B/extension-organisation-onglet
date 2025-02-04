chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'addToGroup') {
        chrome.tabs.group({ tabIds: message.tabId }, (groupId) => {
            if (chrome.runtime.lastError) {
                console.error("Erreur lors de l'ajout au groupe :", chrome.runtime.lastError);
                return;
            }
            chrome.tabGroups.update(groupId, { title: message.groupName }, () => {
                if (chrome.runtime.lastError) {
                    console.error("Erreur lors de la mise à jour du groupe :", chrome.runtime.lastError);
                }
            });
        });
    } else if (message.type === 'changeGroupColor') {
        // Logic to change the color of the group
        chrome.tabGroups.update(message.groupId, { color: message.color }, () => {
            if (chrome.runtime.lastError) {
                console.error("Erreur lors du changement de couleur du groupe :", chrome.runtime.lastError);
            }
        });
    }
});

// Initialisation de l'extension : créer un stockage pour les groupes d'onglets
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ "tabGroups": {} });
});
