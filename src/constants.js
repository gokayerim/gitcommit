export const COMMIT_TYPES = [
  { key: "feat", description: "A new feature" },
  { key: "fix", description: "A bug fix" },
  {
    key: "chore",
    description: "Updating grunt tasks etc; no production code change"
  },
  { key: "test", description: "Adding missing tests" },
  { key: "refactor", description: "Improve readability of the code" },
  { key: "style", description: "Code style changes (white-space, new-line, semi-colons, etc...)" },
  { key: "perf", description: "Changes that improves code performaces" },
  {
    key: "docs",
    description:
      "Formatting, missing semi colons, etc; no production code change"
  }
];


export const JIRA_ID_REGEX = /(^[A-Z]{1,10}\-\d{1,6})/
