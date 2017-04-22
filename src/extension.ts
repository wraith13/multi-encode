'use strict';
import * as vscode from 'vscode';

module MultiEncode
{
    function getConfiguration<type>(key ?: string) : type
    {
        var configuration = vscode.workspace.getConfiguration("multi-encode");
        return key ?
            configuration[key]:
            configuration;
    }

    export function registerCommand(context: vscode.ExtensionContext) : void
    {
        context.subscriptions.push
        (
            vscode.commands.registerCommand
            (
                'multi-encode.kick', kick
            )
        );
    }

    export async function kick() : Promise<void>
    {
        var textEditor = vscode.window.activeTextEditor;
        var list = getConfiguration<any[]>("list");
        var selectedText = textEditor.document.getText(textEditor.selection);
        if (selectedText.length < 1024)
        {
            list = list.map
            (
                i =>
                {
                    if (i.isPreviewable)
                    {
                        i.detail = eval(i.description)(selectedText);
                    }
                    return i;
                }
            );
        }
        let select : any = await vscode.window.showQuickPick
        (
            list,
            {
                placeHolder: "Select a encoder/decoder",
            }
        );
        if (select)
        {
            var coder = select.description;
            textEditor.selections.map
            (
                selection => textEditor.edit
                (
                    (editBuilder: vscode.TextEditorEdit) =>
                    {
                        editBuilder.replace
                        (
                            selection,
                            eval(coder)(textEditor.document.getText(selection))
                        );
                    }
                )
            );
        }
    }
}

export function activate(context: vscode.ExtensionContext)
{
    MultiEncode.registerCommand(context);
}

export function deactivate() {
}