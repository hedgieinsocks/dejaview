'use strict';


const {Adw, Gio, Gtk} = imports.gi;
const ExtensionUtils = imports.misc.extensionUtils;

const urgencyLevels = ['low', 'normal', 'critical'];


function init() {
}


function fillPreferencesWindow(window) {
    const settings = ExtensionUtils.getSettings();

    const page = new Adw.PreferencesPage();
    const groupGeneral = new Adw.PreferencesGroup({title: 'General'});
    const groupAudio = new Adw.PreferencesGroup({title: 'Audio'});
    page.add(groupGeneral);
    page.add(groupAudio);

    // Interval Minutes
    const rowInterval = new Adw.ActionRow({
        title: 'Interval',
        subtitle: 'Minutes between notifications',
    });
    groupGeneral.add(rowInterval);

    const adjustment = new Gtk.Adjustment({
        value: settings.get_int('interval-min'),
        lower: 1,
        upper: 1440,
        step_increment: 1,
        page_increment: 5,
    });

    const intervalSpinButton = new Gtk.SpinButton({
        adjustment,
        numeric: true,
        valign: Gtk.Align.CENTER,
        halign: Gtk.Align.END,
    });

    settings.bind(
        'interval-min',
        intervalSpinButton.get_adjustment(),
        'value',
        Gio.SettingsBindFlags.DEFAULT
    );

    rowInterval.add_suffix(intervalSpinButton);
    rowInterval.activatable_widget = intervalSpinButton;

    // Message Text
    const rowMessage = new Adw.ActionRow({
        title: 'Message Text',
        subtitle: 'Custom notification',
    });
    groupGeneral.add(rowMessage);

    const messageEntry = new Gtk.Entry({
        placeholder_text: 'It is time to stretch your back!',
        text: settings.get_string('message-text'),
        valign: Gtk.Align.CENTER,
        hexpand: true,
    });

    settings.bind(
        'message-text',
        messageEntry,
        'text',
        Gio.SettingsBindFlags.DEFAULT
    );

    rowMessage.add_suffix(messageEntry);
    rowMessage.activatable_widget = messageEntry;

    // Icon Name
    const rowIcon = new Adw.ActionRow({
        title: 'Icon Name',
        subtitle: '/usr/share/icons',
    });
    groupGeneral.add(rowIcon);

    const iconEntry = new Gtk.Entry({
        placeholder_text: 'alarm-symbolic',
        text: settings.get_string('icon-name'),
        valign: Gtk.Align.CENTER,
        hexpand: true,
    });

    settings.bind(
        'icon-name',
        iconEntry,
        'text',
        Gio.SettingsBindFlags.DEFAULT
    );

    rowIcon.add_suffix(iconEntry);
    rowIcon.activatable_widget = iconEntry;

    // Urgency Level
    const rowUrgency = new Adw.ActionRow({
        title: 'Urgency Level',
        subtitle: 'Critical ones are auto-expanded but get dismissed only after a click',
    });
    groupGeneral.add(rowUrgency);

    const dropdownUrgency = new Gtk.DropDown({
        valign: Gtk.Align.CENTER,
        model: Gtk.StringList.new(urgencyLevels),
        selected: settings.get_string('urgency-level'),
    });

    settings.bind(
        'urgency-level',
        dropdownUrgency,
        'selected',
        Gio.SettingsBindFlags.DEFAULT
    );

    rowUrgency.add_suffix(dropdownUrgency);
    rowUrgency.activatable_widget = dropdownUrgency;

    // Show Timer
    const rowTimer = new Adw.ActionRow({
        title: 'Show Timer',
        subtitle: 'Display a timer countdown in panel',
    });
    groupGeneral.add(rowTimer);

    const toggleTimer = new Gtk.Switch({
        active: settings.get_boolean('show-timer'),
        valign: Gtk.Align.CENTER,
    });

    settings.bind(
        'show-timer',
        toggleTimer,
        'active',
        Gio.SettingsBindFlags.DEFAULT
    );

    rowTimer.add_suffix(toggleTimer);
    rowTimer.activatable_widget = toggleTimer;

    // Play Sound
    const rowAlert = new Adw.ActionRow({
        title: 'Play Sound',
        subtitle: 'Add audio alert to notifications',
    });
    groupAudio.add(rowAlert);

    const toggleAlert = new Gtk.Switch({
        active: settings.get_boolean('play-sound'),
        valign: Gtk.Align.CENTER,
    });

    settings.bind(
        'play-sound',
        toggleAlert,
        'active',
        Gio.SettingsBindFlags.DEFAULT
    );

    rowAlert.add_suffix(toggleAlert);
    rowAlert.activatable_widget = toggleAlert;

    // Sound Name
    const rowSound = new Adw.ActionRow({
        title: 'Sound Name',
        subtitle: '/usr/share/sounds/freedesktop/stereo/',
    });
    groupAudio.add(rowSound);

    const soundEntry = new Gtk.Entry({
        placeholder_text: 'complete',
        text: settings.get_string('sound-name'),
        valign: Gtk.Align.CENTER,
        hexpand: true,
    });

    settings.bind(
        'sound-name',
        soundEntry,
        'text',
        Gio.SettingsBindFlags.DEFAULT
    );

    rowSound.add_suffix(soundEntry);
    rowSound.activatable_widget = soundEntry;

    window.add(page);
}
