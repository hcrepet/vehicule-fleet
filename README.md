# Vehicle fleet parking management

Run cucumber tests :  ```yarn test```

Run project :  ```yarn dev```

### Tools for quality code
  - ESLint
  - Prettier

### CI/CD process (e.g., Docker & GitHub)
  - Creation of a Docker Hub
  - Containerization of application(s)
  - Using GitHub actions for CI :
    - Defining the build in a YAML file
    - Actions checks on pull request
  - Pulling image from the Docker Hub to update application's version
  - Build container and runs it 
