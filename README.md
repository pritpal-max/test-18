## Team Directory Web App

A responsive, client-side **Team Directory** web app built with vanilla HTML, CSS, and JavaScript. It lets you browse, search, and filter people in your organization with a clean, card-based UI.

### Features

- **Responsive layout**: CSS Grid layout that adapts from multi-column on desktop to a single column on small screens.
- **Live search**: Filter team members by name, role, or department as you type.
- **Role / department filter**: Dropdown to quickly filter by department.
- **Accessible & semantic**: Semantic HTML, focusable controls, and reasonable ARIA attributes.
- **No build step**: Pure static files that can be opened directly in a browser.

### Project Structure

- `index.html` – Main HTML page with header, toolbar (search + filter), team grid, and footer.
- `style.css` – Styling for the layout, toolbar, and team cards, including responsive behavior.
- `script.js` – Client-side logic for loading, rendering, and filtering team data.
- `team.json` – Sample team data (currently not fetched by default; see below).

### How It Works

- On `DOMContentLoaded`, `script.js`:
  - Uses an **embedded array of team member objects** (for compatibility when opening `index.html` via `file://`).
  - Populates the role/department dropdown from the embedded data.
  - Renders all team members into the `#teamGrid` container as cards.
  - Wires up:
    - Search input (`#searchInput`) to filter by name, role, or department.
    - Role filter (`#roleFilter`) to filter by department.
  - Updates the status line (`#statusMessage`) with the number of matches.

### Running the App

#### Option 1: Open Directly (No Server)

1. Open `index.html` in your browser (double-click or drag into a tab).
2. The embedded data in `script.js` is used, so **no server is required**.
3. You can immediately search and filter the directory.

This is why the data is embedded instead of fetched from `team.json`: browsers block `fetch()` calls to local files (`file://`) for security (CORS).

#### Option 2: Use `team.json` via a Local Server (Optional)

If you prefer to keep the data in `team.json` and fetch it:

1. Run a simple HTTP server in the project folder, for example:

   - Python:

     ```bash
     python -m http.server 8000
     ```

   - Node.js (http-server):

     ```bash
     npx http-server .
     ```

2. Open `http://localhost:8000/index.html` in your browser.
3. Update `script.js` to:
   - Remove the embedded `teamData` array.
   - Fetch `team.json` with `fetch('team.json')` and assign it to `teamData`.

### Customizing the Team Data

To change the team members when using the **embedded data**:

1. Open `script.js`.
2. Modify the `teamData` array at the top of the file:
   - Each object can include: `id`, `name`, `role`, `department`, `location`, `email`, `avatar`, `bio`.

To change the data when using **`team.json` with a server**:

1. Edit `team.json` and adjust or extend the array of member objects.

### Git Workflow in Cursor (How to Commit)

To commit changes using **Cursor's built-in Git workflow**:

1. Open the **Source Control** / **Git** panel in Cursor (typically the left sidebar Git icon).
2. Review the list of changed files (`index.html`, `style.css`, `script.js`, `team.json`, `README.md`).
3. Stage the files:
   - Click the **`+`** icon next to each file, or
   - Use **"Stage All Changes"**.
4. Enter a commit message, for example:
   - `feat: add responsive team directory app`
5. Click **Commit**.
6. If a remote is configured (GitHub, etc.), click **Push** to push the commit.

You can also use Cursor AI in the commit message box (if available in your setup) to suggest a descriptive commit message based on the current diff.

