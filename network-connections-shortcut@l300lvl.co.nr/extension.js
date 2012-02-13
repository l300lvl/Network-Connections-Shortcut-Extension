
const St = imports.gi.St;
const Main = imports.ui.main;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const PopupMenu = imports.ui.popupMenu;

let item, menu;

function _onPowerStatsActivate() {
    Main.overview.hide();
    let app = Shell.AppSystem.get_default().lookup_app('nm-connection-editor.desktop');
    app.activate();
}

function init() {
    menu = Main.panel._statusArea.network.menu;
}

function enable() {
    item = new PopupMenu.PopupMenuItem(_("Network Connections"));
    item.connect('activate', Lang.bind(item, _onPowerStatsActivate));
    let nItems = menu.numMenuItems;
    menu.addMenuItem(item, nItems - 1);
//    battery.addMenuItem(item, -1);
}

function disable() {
    if (item) {
        item.destroy();
    }
}
