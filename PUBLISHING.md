# Testing and publishing Sunnyside

The workflows are prepared, but this repository is not yet ready for public distribution. No push, tag, or pull request publishes an extension. Publication happens only through a manual workflow with **publish** selected.

## Before the first release

- Keep the MIT license in `LICENSE` and the `MIT` identifier in `package.json.license` consistent.
- Publisher ownership is confirmed: `portenez`. Keep the extension ID `portenez.sunnyside-theme` stable after the first upload.
- Create `portenez/sunnyside-vscode-theme` on GitHub when authorized, or update `package.json.repository` if the destination changes. The manifest uses this intended URL to resolve README images; the URL does not establish that the repository exists. Confirm the repository and image links are publicly reachable before release.
- Review the Light and Dark screenshots in the README. They show `samples/sunnyside.ts` in an Extension Development Host with workspace-specific theme settings. A PNG icon of at least 128 × 128 pixels is optional. Do not use the sample SVG as the Marketplace icon.
- Review the tracked files, screenshots, and the exact branch history before making the repository public. Push only the reviewed `main` branch; do not mirror local refs or upload local history backups.
- Configure authentication and the `marketplace` environment below. No credentials belong in source control.

The release readiness script rejects an unset distribution license or missing repository URL. Sunnyside uses MIT and declares its intended repository URL; the script does not verify that the repository exists or is public. Publisher ownership and screenshot quality still require human review.

## Automated checks

```sh
fnm use
npm ci
npm test
npm run package
unzip -l dist/sunnyside-theme-0.1.2.vsix
```

Use the current version in the archive filename. Tests cover Markdown table detection and theme structure. Packaging runs the tests again and invokes the pinned `@vscode/vsce`. Inspect the archive: runtime files, themes, README, changelog, and license should be present; development configuration, samples, tests, credentials, and personal notes should be absent.

The packaging tool currently needs a scoped `minimatch` override to `11.0.1` for [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). Remove the override when `@vscode/vsce` accepts a patched version upstream. Review archive contents when updating it because the dependency controls file inclusion.

**Test and package** runs on pull requests and pushes to `main`, or manually. Download `sunnyside-vsix` from the workflow run's artifacts. These Node tests do not launch VS Code or prove visual appearance.

## Visual and packaged testing

1. Press F5 in this repository to start the Extension Development Host and select each theme.
2. Review `samples/MARKDOWN-SAMPLE.md`: six headings, emphasis, links, inline and fenced code, lists, and table headers. Ordinary table rows should retain normal styling; tables inside fences should not receive header tokens.
3. Inspect JavaScript and TypeScript, selections, search matches, diagnostics, sidebars, and the integrated terminal in both themes. Check readability at your usual font size.
4. Test the actual VSIX with separate user-data and extension directories so an existing installation stays untouched:

   ```sh
   review_dir=$(mktemp -d)
   code --user-data-dir "$review_dir/user" --extensions-dir "$review_dir/extensions" \
     --install-extension dist/sunnyside-theme-0.1.2.vsix
   code --user-data-dir "$review_dir/user" --extensions-dir "$review_dir/extensions" \
     --new-window samples/MARKDOWN-SAMPLE.md
   ```

5. Select both themes, repeat the checks, reload the window, and confirm table highlighting still works. Test the minimum supported VS Code version (1.90) and current stable before release. Record which versions were actually tested.

See `docs/VERIFICATION.md` for the tested versions, results, and outstanding release checks.

## GitHub publishing authentication

Use Visual Studio Marketplace Trusted Publishing with GitHub OIDC. This route needs the Microsoft account that owns the publisher and the GitHub repository; it does not need an Azure subscription, managed identity, PAT, or stored publishing secrets.

The workflow already uses the `marketplace` environment. Keep its deployment branch policy restricted to `main`. Configure required reviewers where your GitHub plan supports them. Without required reviewers, selecting **publish** is the final publishing action after packaging succeeds.

When ready to authorize publishing, sign into Marketplace as the publisher owner, open `portenez`, and select **Trusted Publishing**. Create a policy with these exact values:

| Field | Value |
| --- | --- |
| Policy name | Sunnyside GitHub release |
| Repository owner | `portenez` |
| Repository | `sunnyside-vscode-theme` |
| Workflow | `release.yml` |
| Environment | `marketplace` |

Creating this policy grants publishing access to the matching workflow. Review repository write access and workflow changes before creating it. Keep `id-token: write` limited to the publishing job, which downloads the tested VSIX and runs `vsce publish --oidc --packagePath dist/*.vsix`.

For a private repository, the configured workflow must complete its first successful token exchange within 48 hours of policy creation. Create the policy close to the authorized release; a package-only rehearsal skips authentication and does not activate it. Do not run a publish command just to test authentication.

No policy has been created as part of the workflow migration. Confirm it separately in Marketplace before release. Never put Microsoft sign-in credentials, recovery codes, or private email aliases in this repository.

References: [Microsoft Trusted Publishing guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#publish-with-github-actions-and-trusted-publishing) and [GitHub deployment environments](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments).

## Prepare a release without publishing

1. Set the intended version in `package.json` and `package-lock.json`, update `CHANGELOG.md`, and review the changes.
2. Once GitHub hosting is authorized and the workflow is on the default branch, open **Actions → Prepare or publish release → Run workflow**.
3. Select the reviewed branch or tag, enter the exact manifest version, and leave **publish** unchecked.
4. Download `release-vsix` and complete the packaged visual checks above. This run never requests publishing credentials or publishes.

## Publish later

After explicit release authorization and all preparation is complete, run the same workflow on the reviewed ref with the same version and **publish** checked. The workflow validates release metadata, tests, packages, and uploads `release-vsix`. The publishing job waits for any configured environment approval, downloads that run's package, and publishes that exact VSIX without rebuilding it.

Review the package artifact before approving the environment deployment. If environment approvals are unavailable, selecting **publish** is the final publishing action after the package job succeeds. Use a reviewed immutable tag for reproducibility; tags do not themselves trigger publication.

The workflow does not increment versions, commit, create tags, or create GitHub releases. A version already published should fail; choose a new version for subsequent updates. After success, inspect the Marketplace listing and install the Marketplace version in an isolated test instance.
