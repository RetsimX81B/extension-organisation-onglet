document.addEventListener("DOMContentLoaded", () => {
    console.log("Popup chargée, ajout des écouteurs...");
    
    document.getElementById('moveTabButton').addEventListener('click', () => {
        if (!chrome.tabs) {
            console.error("chrome.tabs est indéfini !");
            return;
        }

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (chrome.runtime.lastError) {
                console.error("Erreur Chrome API :", chrome.runtime.lastError);
            }
            console.log("Onglets trouvés :", tabs);

            if (!tabs || tabs.length === 0) {
                console.error("Aucun onglet trouvé !");
                return;
            }

            const currentTab = tabs[0];
            console.log("Déplacement de l'onglet :", currentTab);
            chrome.tabs.move(currentTab.id, { index: 0 }, () => {
                if (chrome.runtime.lastError) {
                    console.error("Erreur lors du déplacement :", chrome.runtime.lastError);
                } else {
                    console.log("Onglet déplacé !");
                }
            });
        });
    });
});