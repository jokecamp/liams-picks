# Liams Picks


User can login and logout

User can see what leagues they are in
User can join a league by a code/invitation
User can pick an avatar and favorite teams
User can create a league and become the league manager.

User can submit picks for week/round/game week
    Chooses home and away score.
    One game can be pick of the week.

User can see current picks and past picks.
User can setup see other users picks after gameweek starts
User can see league standings.
User can earn badges and see all badges

Winner can change user's avatar.

Manager can invite users by email into league
Manager can define rounds or weeks based on fixture list


## setup

    npm install typescript --global
    npm install typings --global

    typings install dt~node --global --save
    typings install dt~express --global --save
    typings install dt~serve-static --global --save
    typings install dt~express-serve-static-core --global --save
    typings install dt~mime --global --save
    typings install dt~body-parser --global --save

    typings install dt~mocha --global --save
    typings install dt~chai --global --save

    typings install dt~config --global --save
    typings install dt~winston --global --save
    typings install dt~debug --global --save

    typings install dt~lodash --global --save
    typings install dt~pg-promise --global --save

    typings install dt~bluebird --global --save


https://github.com/typings/typings


### Deploy sql changes

    psql  -d football -a -f ./db/schema-sync.sql

Test import

    node ./db/import.js


    npm install --save-dev request
    npm install --save-dev request-promise
