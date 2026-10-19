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

- Portfolio content lives in src/data (profile.ts, plan.ts); src/lib/catalog.ts flattens it for the AI recommender - edit data there, not in components.
- AI recommender is a public createServerFn (src/lib/recommend.functions.ts) returning only catalog IDs + reasons, so the model can't invent items.
