# Semantic Git Commit

With this project, you can use your commit messages according to semantic standards. Learn more about

## Installation

```
npm install --global semantic-git-commit
```
or
```
yarn global add semantic-git-commit
```

## How to Use

After install it globally, you can use it with `commitz` command in your favorite terminal.
Don't wory about git commit arguments? You can use all git commit like `--no-verify`, `--quiet`, `--verbose` etc..

Also if you don't like the `commitz` command. You can change it any time with aliasing in your `.zshrc` or `.bashrc` file.

```
# Sample aliazing
alias MY_AWESEOME_COMMIT_COMMAND=commitz;
```

## Structure
This command accept three different field from you.

### Change Type:
You need to select one of predefined types like feat, fix, test, refactor etc...

### Task Id
If your branch name created with task id, the program detect and suggest it automaticly. But if you want you can write another task id or you can leave it blank. Predefined Task Id works with this regex. `/(^[A-Z]{1,10}\-\d{1,6})/`.

Sample branch name samples
- `ABC-1234`
- `AB-11-make-something`
- `ABCDEFGH-1/make-something`

### Commit Message
You can write your beatiful and descriptive commit message in here. this field is required and you must enter at least two char.
