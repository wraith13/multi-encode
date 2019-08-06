'use strict';
import * as vscode from 'vscode';

module MultiEncode
{
    const getConfiguration = <type>(key ?: string) : type =>
    {
        let configuration = vscode.workspace.getConfiguration("multi-encode");
        return key ?
            configuration[key]:
            configuration;
    };

    export const registerCommand = (context: vscode.ExtensionContext) => context.subscriptions.push
    (
        vscode.commands.registerCommand
        (
            'multi-encode.kick', encodeSelectedText
        ),
        vscode.commands.registerCommand
        (
            'multi-encode.selectedText', encodeSelectedText
        ),
        vscode.commands.registerCommand
        (
            'multi-encode.clipboard', encodeClipboard
        )
    );

    const applyPreview = (list : any[], selectedText : string) : void => list.forEach
    (
        i =>
        {
            if (i.isPreviewable)
            {
                i.detail = eval(i.description)(selectedText);
            }
        }
    );
    const executeEncoder = (textEditor : vscode.TextEditor, encoder : (source :string) => string) => textEditor.selections.map
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

    const showListAndExecute = async (selectedText : string, mapper : (encoder : (source :string) => string) => void) : Promise<void> =>
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
    };

    export const encodeSelectedText = async () : Promise<void> =>
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
    };
    export const encodeClipboardCore = async (text: string): Promise<void> =>
    {
        if (null === text || undefined === text)
        {
            text = "";
        }
        await showListAndExecute
        (
            text,
            encoder => vscode.env.clipboard.writeText(encoder(text))
        );
    };
    export const encodeClipboard = async () =>
    {
        const text = await vscode.env.clipboard.readText();
        if (null !== text && undefined !== text)
        {
            await encodeClipboardCore(text);
        }
    };
}

export const activate = (context: vscode.ExtensionContext) => MultiEncode.registerCommand(context);
export const deactivate = () => { };