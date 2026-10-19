// Static files live in public/files so the site works on any static host (incl. GitHub Pages sub-paths).
export const file = (name: string) => ({ url: `${import.meta.env.BASE_URL}files/${name}` });
