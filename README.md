Create cordova app:

    cordova create mobile com.example.requester Requester

Install internal npm modules:

    npm install

Install global npm modules:

    npm install -g ngpack
    npm install -g gulp

Fix ngpack linux bug:

    sudo apt-get install dos2unix
    cd /usr/local/lib/node_modules/ngpack && sudo dos2unix ./**/*

Run in debug mode:

    gulp start

Or build app:

    gulp build
    
After adding platforms and building with `gulp build`, you can build cordova apps. Same code for website and application.
