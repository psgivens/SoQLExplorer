# SoQL Explorer

## Plan of action

1. Create web app with https://github.com/Microsoft/TypeScript-React-Starter
2. Copy application from https://github.com/psgivens/MiscellaneousLinux/tree/master/Tracker/starter-1 . Polish as I go.
3. Create an API container with docker: https://github.com/psgivens/MiscellaneousLinux/tree/master/Tracker/PomodoroApi
4. Convert it client to an electron app as per https://github.com/psgivens/MiscellaneousLinux/tree/master/Tracker/ElectronClient

### References

* https://github.com/Microsoft/TypeScript-React-Starter
* https://hackernoon.com/building-a-website-with-react-and-bulma-d655214bff2a

### Pomodoro Specifications
https://docs.google.com/document/d/1-UGs1sjak47g3rOUxxQdHw2YaLRaX6qU79luKfSk_-g/edit

### Install Log

    # Globally
    sudo npm install -g typescript
    sudo npm install -g create-react-app
        
    # Create app with typescript
    create-react-app soqle --scripts-version=react-scripts-ts
    cd soqle
   
    # copy packages.json
    # https://raw.githubusercontent.com/psgivens/PersonalTracker/master/webapp/package.json
    npm install 

### Development

1. Create a couple of pages using routes
1.1. Crate a MainMenu control
1.2. Replace App.tsx with routing information
2. Create reducers


### Problem Log    
    
Ran into problems running `npm start`. I installed ts-jest. `npm install ts-jest`. The problem went way, but I don't know if this was the fix. 

