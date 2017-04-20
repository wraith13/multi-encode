'use strict';
import * as vscode from 'vscode';

module MultiEncode
{
    let context: vscode.ExtensionContext;
    //var pass_through;

    /*
    function getConfiguration<type>(key ?: string) : type
    {
        var configuration = vscode.workspace.getConfiguration("multi-encode");
        return key ?
            configuration[key]:
            configuration;
    }
    */

    export function registerCommand(aContext: vscode.ExtensionContext) : void
    {
        context = aContext;
        context.subscriptions.push
        (
            vscode.commands.registerCommand
            (
                'multi-encode.kick', kick
            )
        );
    }

    export function kick() : void
    {
        vscode.window.showInformationMessage('Hello World!');
    }
}

export function activate(context: vscode.ExtensionContext)
{
    MultiEncode.registerCommand(context);
}

export function deactivate() {
}