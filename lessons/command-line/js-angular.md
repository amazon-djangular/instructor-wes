# Handy JavaScript and Angular Command Reference

##### npm
Npm is node's package manager. It's the js equivalent of pip. All the dependencies we need are enumerated in the package.json.
- `npm install`
  - Installs all dependencies listed in the package.json file.
- `npm install <package-name>`
  - Installs a specific package to your project and adds it to your package.json file.

##### Angular
- `ng serve`
  - Serves a local version of your Angular app.
- `ng generate <type> <name>`
  - Generates new files and folders relevant to the type listed, with the name given. i.e. `ng generate component activities` will create a component folder with 4 files called activities and add imports to your app.module.ts file.
  - Types include but are not limited to:
    - component
    - service
    - class
    - interface

We'll have a few other Angular commands to add when we cover deployment, but that will be in a separate section.