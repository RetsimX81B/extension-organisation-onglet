document.addEventListener("DOMContentLoaded", () => {
    console.log("Popup chargée, ajout des écouteurs...");

    // Déplacer l'onglet actif en premier
    document.getElementById('moveTabButton').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) return;
            chrome.tabs.move(tabs[0].id, { index: 0 }, () => {
                if (chrome.runtime.lastError) {
                    console.error("Erreur de déplacement :", chrome.runtime.lastError);
                } else {
                    console.log("Onglet déplacé !");
                }
            });
        });
    });

    // Ajouter l'onglet actif à un groupe
    document.getElementById('addToGroupButton').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) return;
            const currentTab = tabs[0];

            const groupName = prompt('Entrez le nom du groupe :');
            if (groupName) {
                console.log("Ajout de l'onglet au groupe :", currentTab.id, groupName);
                chrome.runtime.sendMessage({ type: 'addToGroup', tabId: currentTab.id, groupName });
            }
        });
    });

    // Changer la couleur du groupe de l'onglet actif
    document.getElementById('changeColorButton').addEventListener('click', () => {
        const chromeColors = ["grey", "blue", "red", "yellow", "green", "pink", "purple", "cyan", "orange"];

        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.style.display = 'block';

        colorPicker.addEventListener('input', () => {
            const selectedColor = colorPicker.value;
            console.log("Couleur HEX sélectionnée :", selectedColor);

            // Sélection aléatoire d'une couleur supportée par Chrome (à adapter si besoin)
            const colorName = chromeColors[Math.floor(Math.random() * chromeColors.length)];
            console.log("Couleur convertie en Chrome :", colorName);

            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs.length === 0) return;
                
                const tab = tabs[0];

                if (tab.groupId && tab.groupId !== chrome.tabGroups.TAB_GROUP_ID_NONE) {
                    chrome.runtime.sendMessage({ type: 'changeGroupColor', color: colorName, groupId: tab.groupId });
                } else {
                    console.error("L'onglet actif n'est pas dans un groupe.");
                    alert("L'onglet actif n'est pas dans un groupe !");
                }
            });
        });

        colorPicker.addEventListener('change', () => {
            colorPicker.remove();
        });

        document.body.appendChild(colorPicker);
        colorPicker.click();
    });
});
