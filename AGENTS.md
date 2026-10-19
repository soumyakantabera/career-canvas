<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Portfolio content lives in src/data (profile.ts, plan.ts); src/lib/catalog.ts flattens it for the local role matcher - edit data there, not in components.
- Role matcher is local TF-IDF in src/lib/matcher.ts (no API) so it works offline and costs nothing.

- Showcase-only: the private "My mode" tracker was removed at the user request; personal data updates happen via chat edits to src/data. Do not re-add editable private state or a mode toggle. Snapshot-deck tabs use icons, not text labels.
