document.addEventListener("DOMContentLoaded", () => {
    console.log("Popup chargée, ajout des écouteurs...");

    document.getElementById('moveTabButton').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) return; // Aucun onglet trouvé
            chrome.tabs.move(tabs[0].id, { index: 0 }, () => {
                if (chrome.runtime.lastError) {
                    console.error("Erreur de déplacement :", chrome.runtime.lastError);
                } else {
                    console.log("Onglet déplacé !");
                }
            });
        });
    });

    document.getElementById('addToGroupButton').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                console.error("Aucun onglet trouvé !");
                return;
            }
            const currentTab = tabs[0];
            const groupName = prompt('Entrez le nom du groupe :');
            if (groupName) {
                console.log("Envoi du message pour ajouter au groupe :", currentTab.id, groupName);
                chrome.runtime.sendMessage({ type: 'addToGroup', tabId: currentTab.id, groupName });
            }
        });
    });

    document.getElementById('changeColorButton').addEventListener('click', () => {
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.style.display = 'block'; // Ensure it's displayed
        colorPicker.addEventListener('input', () => {
            const selectedColor = colorPicker.value;
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.runtime.sendMessage({ type: 'changeGroupColor', color: selectedColor, tabId: tabs[0].id });
            });
        });

        // Remove the color picker only after the user has selected a color
        colorPicker.addEventListener('change', () => {
            colorPicker.remove();
        });

        document.body.appendChild(colorPicker); // Append below the buttons
        colorPicker.click(); // Open the color picker dialog
    });
});
