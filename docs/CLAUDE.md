## Fast Path (skip dev-master.md scan)
If the task matches one of these categories, act immediately — do NOT load `./dev-master.md`:
- **Typo / spelling / grammar fix**: fix the text, nothing else.
- **Simple rename**: rename an identifier in-place; load `./naming-convention.md` only if the target name is ambiguous.
- **Formatting / whitespace**: fix indentation, trailing spaces, line endings — no guide needed.

## Full Path
For all other tasks:
- ALWAYS follows guide in `./dev-master.md`.
- Identify if the task matching any topic in the document.
- Make sure to read the referencing md files deep at every levels that mentions a markdown file for guidance for underlying task before proceeding with the task.
- While working on the task, if new task arises, ensure to follow the corresponding guide in `./dev-master.md` and load corresponding markdown file if specified down any levels (so when it says follow ./task-a-guide.md, load task-a-guide.md, inside ./task-a-guide.md if it mentions load ./task-b-guide.md then make sure to load task-b-guide.md before proceeding with task b).
