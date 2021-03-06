/*
See LICENSE.txt for this sample’s licensing information.

Abstract:
This class handles presenting the Menu Bar template example.
*/

class MenuBarController extends DocumentController {

    fetchDocument(documentURL, loadingDocument) {
        this.documentLoader.fetch({
            url: documentURL,
            success: (menuBarDocument) => {
                const menuBarElem = menuBarDocument.getElementsByTagName("menuBar").item(0);
                menuBarElem.addEventListener("select", (event) => {
                    this.selectMenuItem(event.target);
                });

                // Pre-load the document for the initial focused menu item or first item,
                // before presenting the menuBarTemplate on navigation stack.
                // const initialMenuItemElem = this.findInitialMenuItem(menuBarElem);
                // this.selectMenuItem(initialMenuItemElem, true, () => {
                this.handleDocument(menuBarDocument, loadingDocument);
                // });

            },
            error: (xhr) => {
                const alertDocument = createLoadErrorAlertDocument(documentURL, xhr, false);
                this.handleDocument(alertDocument, loadingDocument);
            }
        });
    }

    findInitialMenuItem(menuBarElem) {
        let highlightIndex = 0;
        const menuItemElems = menuBarElem.childNodes;
        for (let i = 0; i < menuItemElems.length; i++) {
            if (menuItemElems.item(i).hasAttribute("autoHighlight")) {
                highlightIndex = i;
                break;
            }
        }
        return menuItemElems.item(highlightIndex);
    }

    selectMenuItem(menuItemElem, isInitialItem, doneCallback) {
        const menuBarElem = menuItemElem.parentNode;
        const menuBarFeature = menuBarElem.getFeature("MenuBarDocument");
        const existingDocument = menuBarFeature.getDocument(menuItemElem);

        if (!existingDocument) {
            const controllerOptions = resolveControllerFromElement(menuItemElem);
            if (controllerOptions) {
                if (!isInitialItem) {
                    menuBarFeature.setDocument(createLoadingDocument(), menuItemElem);
                }
                controllerOptions.documentLoader = this.documentLoader;
                controllerOptions.linkKey = menuItemElem.getAttribute('linkKey') || null;
                const controllerClass = controllerOptions.type;
                const controller = new controllerClass(controllerOptions);
                controller.handleDocument = (document) => {
                    if (isInitialItem) {
                        menuBarFeature.setDocument(document, menuItemElem);
                    } else {
                        setTimeout(function() {
                            menuBarFeature.setDocument(document, menuItemElem);
                        }, 500);
                    }
                    doneCallback && doneCallback();
                };
            }
        }
    }
}

registerAttributeName('menuBarDocumentURL', MenuBarController);
