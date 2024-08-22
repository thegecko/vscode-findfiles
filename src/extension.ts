import * as vscode from 'vscode';

export const activate = async (context: vscode.ExtensionContext): Promise<void> => {
    context.subscriptions.push(
        vscode.commands.registerCommand('findfiles.find', async () => {
            const glob = await vscode.window.showInputBox({ title: 'Enter a glob pattern', value: '**/*.mjs' });
            if (glob) {
                const files = await vscode.workspace.findFiles(glob);
                if (files.length) {
                    vscode.window.showInformationMessage(`Found ${files.length} files:\n${files.map(f => f.fsPath).join('\n')}`, { modal: true });
                } else {
                    vscode.window.showErrorMessage('No files found', { modal: true });
                }
            }
        })
    );
};
