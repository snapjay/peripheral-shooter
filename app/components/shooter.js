'use strict';

angular.module('myApp.peripheralShooter', [])
    .service('shooter', ['$rootScope', '$interval', function ($rootScope, $interval) {

        this._runState = 0;
        this._interval = null;
        this._options = {
            delay: 5,
            interval: 5,
            screens: 2,
            targets: 5,
            shots:5
        };

        firebase.database().ref('target/').remove();

        var starCountRef = firebase.database().ref('target/');
        starCountRef.on('value', function(payload) {
            $rootScope.$emit('dataChange', payload.val())
        });


        this.toggle = function (opts) {
            this._options = opts;

            if (this._runState == 0) { // START
                this._start();
            } else {              // STOP
                this._stop();
            }

            return this._runState;

        };



        this._start = function () {

            this._runState = 1;
            var _opts  =(this._options);
            var _this = this;

            _this._update(_opts);
            var iteration = 1;
            this._interval =  $interval(function(){
                    iteration++;
                    if (iteration > _this._options.targets){
                        _this._stop();
                    }
                    _this._update(_opts);
            }
                , (this._options.interval * 1000)
                ,  this._options.shots
            );

            $rootScope.$emit('runState', this._runState)

        };

        this._stop = function() {

            $interval.cancel(this._interval);
            this._runState = 0;
            firebase.database().ref('target/').remove();
            $rootScope.$emit('runState', this._runState)
            $rootScope.$emit('dataChange', {})

        };


        this._update = function(_options){

            var payload = {
                screen: randomInt(1,this._options.screens),
                target: randomInt(1,this._options.targets),
                fontSize: 70
            };
            firebase.database().ref('target/').set(payload);
        };


        function randomInt(min,max)
        {
            return Math.floor(Math.random()*(max-min+1)+min);
        }
    }]);



