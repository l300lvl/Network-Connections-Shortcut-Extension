
const St = imports.gi.St;
const Config = imports.misc.config;
const Main = imports.ui.main;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const PopupMenu = imports.ui.popupMenu;

const Gettext = imports.gettext.domain('network-connections-shortcut');
const _ = Gettext.gettext;

let item, menu;

function _onPowerStatsActivate() {
    Main.overview.hide();
    let app = Shell.AppSystem.get_default().lookup_app('nm-connection-editor.desktop');
    app.activate();
}

function enable() {
    item = new PopupMenu.PopupMenuItem(_("Network Connections"));
    item.connect('activate', Lang.bind(item, _onPowerStatsActivate));
    let nItems = menu.numMenuItems;
    menu.addMenuItem(item, nItems - 1);
}

function disable() {
    if (item) {
        item.destroy();
    }
}

let age;

function init() {
    let current_version = Config.PACKAGE_VERSION.split('.');
    if (current_version.length > 4 || current_version[0] != 3) throw new Error("Strange version number (extension.js:34).");
    
    switch (current_version[1]) {
        case"2": global.log("Warning of extension [" + metadata.uuid + "]:\n              Old development release detected (" + Config.PACKAGE_VERSION + "). You should upgrade!\n");   //eak
        case"3":  ;
        case"4": age = "old";
            break;
        case"5": global.log("Warning of extension [" + metadata.uuid + "]:\n              Development release detected (" + Config.PACKAGE_VERSION + "). Loading as a 3.6 release.\n"); //eak
        case"6": age = "new";
        case"8":  ;
            break;
        default: throw new Error("Strange version number (extension.js:45).");
    }

    if (age=="old") menu = Main.panel._statusArea.network.menu;
    else            menu = Main.panel.statusArea.network.menu;

    initTranslations("network-connections-shortcut");
}

function initTranslations(domain) {
    let extension = imports.misc.extensionUtils.getCurrentExtension();

    domain = domain || extension.metadata['gettext-domain'];

    // check if this extension was built with "make zip-file", and thus
    // has the locale files in a subfolder
    // otherwise assume that extension has been installed in the
    // same prefix as gnome-shell
    let localeDir = extension.dir.get_child('locale');
    if (localeDir.query_exists(null))
        imports.gettext.bindtextdomain(domain, localeDir.get_path());
    else
        imports.gettext.bindtextdomain(domain, Config.LOCALEDIR);
}
