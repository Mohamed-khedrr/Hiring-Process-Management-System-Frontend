# HiringProcessMangmentSystem

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Project Structure

<pre>
|-- src
| |-- app
| | |-- core
| | | |-- authentication
| | | | |-- guards
| | | | | |-- admin.guard.ts
| | | | | |-- user.guard.ts
| | | | | |-- .........
| | | | |-- interceptors
| | | | | |-- token.interceptor.ts
| | | | | |-- auth.interceptor.ts
| | | | | |-- .........
| | | | `-- services
| | | | | |-- login.service.ts
| | | | | |-- register.service.ts
| | | | | |-- ........
| | | | |-- authentication.module.ts
| | | |-- interceptors
| | | | |-- http-error.interceptor.ts
| | | | |-- ............
| | | |-- guards
| | | | |-- auth.guard.ts
| | | | |-- ............
| | | |-- models
| | | | |-- user.model.ts
| | | | |-- job.model.ts
| | | | |-- ............
| | | |-- core.module.ts
| | |-- shared
| | | |-- components
| | | | | |-- layout
| | | | | | |-- header.component.ts
| | | | | | |-- footer.component.ts
| | | | | |-- buttons
| | | | | | |-- main-button-component.html
| | | | | |-- ........
| | | |-- models
| | | | |-- user.model.ts
| | | |-- services
| | | | |-- user
| | | | | |-- profile.service.ts
| | | | |-- homepage
| | | | | |-- homepage.service.ts
| | | | |-- ...
| | | |-- directives
| | | | |-- highlight.directive.ts
| | | | |-- .......
| | | |-- pipes
| | | | |-- date.pipe.ts
| | | | |-- capitalize.pipe.ts
| | | | |-- .........
| | | |-- utils
| | | | |-- utils.ts
| | | | |-- ........
| | | |-- constants
| | | | |-- app.constants.ts
| | | | |-- api.constants.ts
| | | | |-- ......
| | | |-- shared.module.ts
| | |-- modules
| | | |-- home-module
| | | | |-- home-page
| | | | | |-- home-page.component.ts
| | | | | |-- home-page.component.html
| | | | |-- job-serach
| | | | | |-- job-serach.component.ts
| | | | | |-- job-serach.component.html
| | | | `-- home-routing.module.ts
| | | | `-- home.module.ts
| | | |-- recruiter-module
| | | | |-- dashbord
| | | | | |-- dashbord.component.ts
| | | | | |-- dashbord.component.html
| | | | |-- candidate-serach
| | | | | |-- job-serach.component.ts
| | | | | |-- job-serach.component.htm
| | | | `-- recruiter-routing.module.ts
| | | | `-- recruiter.module.ts
| | | |-- process-module
| | | | |-- ......
| | | | | |-- .......
| | | | `-- process-routing.module.ts
| | | | `-- process.module.ts
| `-- app.component.ts
| `-- app.module.ts
| `-- app-routing.module.ts
|-- assets
| |-- images
| |-- fonts
| |-- styles
|-- environments
| |-- environment.prod.ts
| `-- environment.ts
|-- index.html
|-- main.ts
|-- styles.scss
|-- package.json
|-- angular.json
`-- README.md
</pre>
