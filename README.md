# multi-encode README

[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/version/wraith13.multi-encode.svg) ![installs](https://vsmarketplacebadge.apphb.com/installs/wraith13.multi-encode.svg) ![rating](https://vsmarketplacebadge.apphb.com/rating/wraith13.multi-encode.svg)](https://marketplace.visualstudio.com/items?itemName=wraith13.multi-encode)

This extention provides many encoders for vscode.

## Notice for Mac users

See vscode's [this issue](https://github.com/Microsoft/vscode/issues/16261).

## Features

multi-encode provide a command in the Command Palette for encode/decode.

> You can show Command Palette by keyboard-shortcuts.
>
> Mac: <kbd>F1</kbd> or <kbd>Shift</kbd>+<kbd>Command</kbd>+<kbd>P</kbd>
>
> Windows and Linux: <kbd>F1</kbd> or <kbd>Shift</kbd>+<kbd>Ctrl</kbd>+<kbd>P</kbd>

- toLowerCase
- toUpperCase
- encodeURI
- decodeURI
- \ escape
- eval
- format JSON
- join lines

and your encoder/decoder. You can add encoder/decoder to multi-encode by [`settings.json`](#extension-settings)

## Tutorial

### 0. ⬇️ Install multi-encode

Launch VS Code Quick Open(Mac:<kbd>Command</kbd>+<kbd>P</kbd>, Windows and Linux: <kbd>Ctrl</kbd>+<kbd>P</kbd>), Type `ext install multi-encode` and press <kbd>Enter</kbd> and click <kbd>Install</kbd>.  Restart VS Code when installation is completed.

### 1. 🚀 Execute encoder/decoder to selected text

Select text in document as you like, Launch Command Palette(Mac:<kbd>F1</kbd> or <kbd>Shift</kbd>+<kbd>Command</kbd>+<kbd>P</kbd>, Windows and Linux: <kbd>F1</kbd> or <kbd>Shift</kbd>+<kbd>Ctrl</kbd>+<kbd>P</kbd>), Execute `multi encode: to selected text` command and select a encoder/decoder as you like.

### 2. 🚀 Execute encoder/decoder to clipboard

Copy text to clipboard as you like, Launch Command Palette, Execute `multi encode: to clipboard` command and select a encoder/decoder as you like.

### 3. 🔧 Next step

You can add encoder/decoder to multi-encode by [`settings.json`](#extension-settings). And you can apply [keyboard shortcuts](#keyboard-shortcut-settings) by `keybindings.json`.

Enjoy!

## Command

- `multi encode: to selected text` : Run the encoder/decoder you selected from the list to selected text.
- `multi encode: to clipboard` : Run the encoder/decoder you selected from the list to clipboard.

## Extension Settings

This extension contributes the following settings by [`settings.json`](https://code.visualstudio.com/docs/customization/userandworkspace#_creating-user-and-workspace-settings)( Mac: <kbd>Command</kbd>+<kbd>,</kbd>, Windows / Linux: <kbd>File</kbd> -> <kbd>Preferences</kbd> -> <kbd>User Settings</kbd> ):

- `multi-encode.list`: encoder/decoder list

## Keyboard shortcut Settings

In default, multi encode's command doesn't apply keyboard shortcuts. Althogh,
you can apply keyboard shortcuts by [`keybindings.json`](https://code.visualstudio.com/docs/customization/keybindings#_customizing-shortcuts)
( Mac: <kbd>Code</kbd> -> <kbd>Preferences</kbd> -> <kbd>Keyboard Shortcuts</kbd>, Windows / Linux: <kbd>File</kbd> -> <kbd>Preferences</kbd> -> <kbd>Keyboard Shortcuts</kbd>).

Command name on `keybindings.json` is diffarent from on Command Pallete. See below table.

|on Command Pallete|on keybindings.json|
|-|-|
|`multi encode: to selected text`|`multi-encode.selectedText`|
|`multi encode: to clipboard`|`multi-encode.clipboard`|

## Release Notes

see ChangLog on [marketplace](https://marketplace.visualstudio.com/items/wraith13.multi-encode/changelog) or [github](https://github.com/wraith13/multi-encode/blob/master/CHANGELOG.md)


## Support

[GitHub Issues](https://github.com/wraith13/multi-encode/issues)

## License

[Boost Software License](https://github.com/wraith13/multi-encode/blob/master/LICENSE_1_0.txt)
