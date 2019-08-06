'use strict';
import * as vscode from 'vscode';

module MultiEncode
{
    function getConfiguration<type>(key ?: string) : type
    {
        let configuration = vscode.workspace.getConfiguration("multi-encode");
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
                'multi-encode.kick', encodeSelectedText
            )
        );
        context.subscriptions.push
        (
            vscode.commands.registerCommand
            (
                'multi-encode.selectedText', encodeSelectedText
            )
        );
        context.subscriptions.push
        (
            vscode.commands.registerCommand
            (
                'multi-encode.clipboard', encodeClipboard
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

    async function showListAndExecute(selectedText : string, mapper : (encoder : (source :string) => string) => void) : Promise<void>
    {
        let list = getConfiguration<any[]>("list");
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
            mapper(eval(select.description));
        }
    }

    export async function encodeSelectedText() : Promise<void>
    {
        const textEditor = vscode.window.activeTextEditor;
        if (textEditor !== undefined && textEditor.document)
        {
            await showListAndExecute
            (
                textEditor.document.getText(textEditor.selection),
                encoder => executeEncoder(textEditor, encoder)
            );
        }
    }
    export function encodeClipboardCore(error: any, text: string): Promise<void> {
        return new Promise<void>
        (
            resolve =>
            {
                if (error) {
                    vscode.window
                        .showErrorMessage(error)
                        .then(() => resolve());
                }
                else
                {
                    if (null === text || undefined === text) {
                        text = "";
                    }
                    showListAndExecute
                    (
                        text,
                        encoder => vscode.env.clipboard.writeText(encoder(text))
                    )
                    .then(() => resolve());
                }
            }
        );
    }
    export const encodeClipboard = async () =>
    {
        const text = await vscode.env.clipboard.readText();
        if (null !== text && undefined !== text)
        {
            await encodeClipboardCore(null, text);
        }
    };
}

export function activate(context: vscode.ExtensionContext)
{
    MultiEncode.registerCommand(context);
}

export function deactivate() {
}