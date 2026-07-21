# Sazid Rahman Simanto — Portfolio

One-page personal portfolio for a Robotics Software Engineer.
Static HTML/CSS/JS — no build step, no dependencies.

**Layout:** sticky left column (photo, contact, about, skills) · right column (projects, contact CTA).

## Files

| File | Purpose |
|---|---|
| `index.html` | All page content |
| `style.css` | Styling, responsive + print rules |
| `script.js` | Scroll reveal, card spotlight, point-cloud background |
| `assets/profile.jpg` | Cropped profile photo (900×900) |

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

For a user site at `https://rsazid99.github.io`:

```bash
git init -b main
git add .
git commit -m "Portfolio site"
git remote add origin git@github.com:rsazid99/rsazid99.github.io.git
git push -u origin main
```

Then **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.

For a project repo (e.g. `portfolio`), the site lands at `https://rsazid99.github.io/portfolio/` — all paths are relative, so it works either way.

## Editing

- **Projects** — edit the `<article class="card">` blocks in `index.html`. `data-accent` accepts `cyan`, `amber`, `violet`, `green`, `rose`.
- **Placeholder links** — the Demo Video and Project Site links use `href="#"`; replace with real URLs.
- **Colours** — the `:root` variables at the top of `style.css`.
