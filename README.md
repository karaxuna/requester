1. Create cordova app:

    cordova create mobile com.example.requester Requester

2. Install global npm modules:

    npm install -g ngpack
    npm install -g gulp

3. Install internal npm modules:

    npm install

4. Fix ngpack linux bug:

    sudo apt-get install dos2unix
    cd /usr/local/lib/node_modules/ngpack && sudo dos2unix ./**/*

5. Run in debug mode:

    gulp start

Or build app:

    gulp build