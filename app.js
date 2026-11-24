(() => {
  "use strict";

  const config = window.DST_SITE_CONFIG || {};
  const mainSkinSiteLink = document.getElementById("mainSkinSiteLink");
  const toe3Card = document.getElementById("toe3Card");
  const gtoCard = document.getElementById("gtoCard");
  const version = document.getElementById("appVersion");
  const installButton = document.getElementById("installButton");
  const installDialog = document.getElementById("installDialog");
  const dialogDone = document.getElementById("dialogDone");
  const installMessage = document.getElementById("installDialogMessage");
  const installInstructions = document.getElementById("installInstructions");

  const setLink = (element, value, label) => {
    if (typeof value === "string" && /^https:\/\/[^ ]+$/i.test(value) &&
        !value.includes("REPLACE-WITH-YOUR")) {
      element.href = value;
    } else {
      element.href = "#";
      element.addEventListener("click", (event) => {
        event.preventDefault();
        showNotice(`${label} link has not been added yet. Update it in site-config.js.`);
      });
    }
  };

  function showNotice(message) {
    installMessage.textContent = message;
    installInstructions.hidden = true;
    if (typeof installDialog.showModal === "function") installDialog.showModal();
  }

  setLink(mainSkinSiteLink, config.mainSkinSiteUrl, "Main Skin Site");
  setLink(toe3Card, config.toe3EditorUrl, "TOE3 editor");
  setLink(gtoCard, config.gtoEditorUrl, "GTO editor");
  version.textContent = config.version || "1.0.0";

  let deferredInstallPrompt = null;
  let isInstalled = window.matchMedia("(display-mode: standalone)").matches ||
                   window.navigator.standalone === true;

  const openInstallHelp = (message) => {
    installMessage.textContent = message;
    installInstructions.hidden = false;
    if (typeof installDialog.showModal === "function") installDialog.showModal();
  };

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installButton.disabled = false;
    installButton.querySelector("span").textContent = "Install App";
  });

  window.addEventListener("appinstalled", () => {
    isInstalled = true;
    deferredInstallPrompt = null;
    installButton.querySelector("span").textContent = "Installed";
    installButton.disabled = true;
  });

  installButton.addEventListener("click", async () => {
    if (isInstalled) {
      openInstallHelp("DST Tools is already installed on this device.");
      installInstructions.hidden = true;
      return;
    }

    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      if (choice && choice.outcome === "accepted") {
        installButton.querySelector("span").textContent = "Installing…";
      }
      deferredInstallPrompt = null;
      return;
    }

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (isIOS) {
      openInstallHelp("To install DST Tools on iPhone or iPad:");
      installInstructions.innerHTML =
        "<li>Open this website in Safari.</li>" +
        "<li>Tap the <strong>Share</strong> button.</li>" +
        "<li>Choose <strong>Add to Home Screen</strong>, then tap Add.</li>";
    } else {
      openInstallHelp("Your browser may not offer direct installation yet. To add DST Tools:");
    }
  });

  dialogDone.addEventListener("click", () => installDialog.close());

  installDialog.addEventListener("click", (event) => {
    if (event.target === installDialog) installDialog.close();
  });

  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch((error) => {
        console.warn("DST Tools: service worker registration failed.", error);
      });
    });
  }
})();
