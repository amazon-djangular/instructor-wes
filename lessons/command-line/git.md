# Helpful Git Command Reference

##### The basics
- `git add .`, `git add <filepath>`
  - Adds files to the "staging" directory. This is so we can cherry pick specific parts of our code that we'd like to commit at one time.
- `git commit -m "<some message>"`
  - Commits all the changes (insertions and deletions) in staging to a new version in the commit history.
- `git push -u <remote-name> <branch-name>`
  - Pushes all commits on your currently active local branch to the specified branch on the specified remote. Usually the first commit gets pushed like so: `git push -u origin master`, which are the default remote and branch names for new remotes and branches.
- `git pull`
  - Pulls all the changes on the remote (usually on the branch you have checked out locally) and merges them with your local version.
- `git status`
  - Check which files are staged and which files are not.
- `git log`
  - See a list of all the commits on the current branch.
  - NOTE: Use `q` to exit this window and `up` and `down` arrows to navigate.

##### Branches
- `git branch`
  - Display a list of all local branches and highlight which branch is currently in use.
  - Use the A flag to see all remote branches as well. i.e. `git branch -A`
- `git branch <branch-name>`
  - Creates a new branch locally starting at the latest commit of the currently checked out branch. For instance, if I'm on the master branch and I make new branch `stuff`, `stuff` will be an identical replica of the master branch at the time of creation.
- `git checkout <branch-name>`
  - Switches the currently active branch to the branch given.
  - Use the b flag to create a new branch and check it out in one command. i.e. `git checkout -b stuff` will create and checkout a branch called "stuff".
- `git push -u <remote-name> HEAD`
  - Will push the current commit from the current branch, allowing git to infer the branch name for you. It's handy if you use many branches with long branch names.

##### Collaboration
- `git clone <repository-url>`
  - Makes an identical copy of the git repository at the given url. You can easily find the url from the root of the repository you're cloning by finding the "Clone or download" button. It's a big green button on the page.
  - _*Don't forget to install your dependencies locally*_
    - What the heck does that mean? Remember our gitignore? We'll have to install all the things we ignored if we want the app to work. Check the js and python files in this folder for more details.