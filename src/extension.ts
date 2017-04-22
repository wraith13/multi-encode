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

    function applyPreview(list : any[], selectedText : string) : void
    {
        list.forEach
        (
            i =>
            {
                if (i.isPreviewable)
                {
                    i.detail = eval(i.description)(selectedText);
                }
            }
        );
    }
    function executeEncoder(textEditor : vscode.TextEditor, encoder : (source :string) => string)
    {
        textEditor.selections.map
        (
            selection => textEditor.edit
            (
                (editBuilder: vscode.TextEditorEdit) =>
                {
                    editBuilder.replace
                    (
                        selection,
                        encoder(textEditor.document.getText(selection))
                    );
                }
            )
        );
    }

    async function showListAndExecute(textEditor : vscode.TextEditor) : Promise<void>
    {
        var list = getConfiguration<any[]>("list");
        var selectedText = textEditor.document.getText(textEditor.selection);
        if (selectedText.length < 4096)
        {
            applyPreview(list, selectedText);
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
            executeEncoder(textEditor, eval(select.description));
        }
    }

    export async function kick() : Promise<void>
    {
        var textEditor = vscode.window.activeTextEditor;
        if (textEditor && textEditor.document)
        {
            await showListAndExecute(textEditor);
        }
    }
}

export function activate(context: vscode.ExtensionContext)
{
    MultiEncode.registerCommand(context);
}

export function deactivate() {
}