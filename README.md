Create cordova app:

    cordova create mobile com.example.requester Requester

Clone jxcore cordova plugin

    cd mobile
    git clone https://github.com/jxcore/jxcore-cordova.git

Add plugin:

    cordova plugins add jxcore-cordova

Add platforms:

    cordova platform add ios
    cordova platform add android

Install internal npm modules (back to root folder):

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
    
After adding platforms and building with `gulp build`, you can build cordova apps.
