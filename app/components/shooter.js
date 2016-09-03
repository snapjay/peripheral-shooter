'use strict';

angular.module('myApp.peripheralShooter', [])
    .service('shooter', ['$rootScope', '$interval', function ($rootScope, $interval) {

        this._runState = 0;
        this._interval = null;

        this.toggle = function () {

            if (this._runState == 0) { // START
                this._runState = 1;
                this._start();
            } else {              // STOP
                this._runState = 0;
                this._stop();
            }

            return this._runState;

        };

        this._genPayload = function() {

            return {
                screen: randomInt(1,2),
                target: randomInt(1,4),
                fontSize: 70
            }

        };
        this._start = function () {

            this._interval =  $interval(this._update
                , 2000, 5);
        };
        this._update = function(){
            firebase.database().ref('target/').set({
                screen: randomInt(1,12),
                target: randomInt(1,41),
                fontSize: 70
            });
        };


        this._stop = function(){
            $interval.cancel(this._interval);
        };


        var starCountRef = firebase.database().ref('target/');
        starCountRef.on('value', function(payload) {
            $rootScope.$broadcast('changeb', payload)
            $rootScope.$emit('changee', payload)
        });


        function randomInt(min,max)
        {
            return Math.floor(Math.random()*(max-min+1)+min);
        }
    }]);



