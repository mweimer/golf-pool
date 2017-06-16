webpackJsonp([0],{116:function(t,e,r){t.exports=r.p+"logo.png"},123:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(333),a=r(332),i=function(t){return t&&t.__esModule?t:{default:t}}(a);n.contestantData.forEach(function(t,e){t.id=e});var o=angular.module("golfPool",["ngSanitize","ngRoute","angular-google-analytics"]).constant("GOLFERS",n.golferData).constant("CONTESTANTS",n.contestantData).constant("REFRESH_TIME",6e4).constant("LEADERBOARD_URL",n.leaderboardUrl).constant("TOURNEY_TITLE",n.tourneyTitle).constant("MOVEMENT",{positive:"positive",negative:"negative",none:"none"}).config(["$routeProvider","AnalyticsProvider",function(t,e){"ngInject";t.when("/",{template:"<pool></pool>"}).when("/golfers",{template:"<golfers></golfers>"}).when("/settings",{template:"<settings></settings>"}),e.setAccount("UA-8634967-4")}]).run(["$rootScope","TOURNEY_TITLE","Analytics",function(t,e,r){"ngInject";t.getTitle=function(){return t.positions?t.positions+" - "+e+" Player Pool":e+" Player Pool"},t.faviconUrl=i.default}]);e.default=o},124:function(t,e,r){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var r=function(e,r,n,a,i,o,s,l){"ngInject";var d=n.map(function(t){return t.entries.map(function(e,r){return{name:t.name+" "+(r+1),golferIds:e,contestantId:t.id}})}).reduce(function(t,e){return t.concat(e)}),c=null;this.get=function(){return u().then(function(t){var e=g(t);return s.update(c,e),f(e),c=e,{entries:e,golfers:t}})};var f=function(t){var e=o.getSelectedContestantId();if(e>=0){var r=t.filter(function(t){return t.contestantId===e&&!t.isDQ}).map(function(t){return t.position}).reduce(function(t,e){return null!==t?t+", "+e:e},null);l.positions=r}else l.positions=null},u=function(){return e({method:"GET",url:i}).then(function(e){var n=t(e.data),a=n.find(".leaderboard-table .player-overview"),i=[];return a.each(function(e){i.push(N(t(this),e))}),r.map(function(t){var e=t.firstName.toLowerCase(),r=t.lastName.toLowerCase(),n=i.find(function(t){var n=t.fullName.toLowerCase();return n.includes(e)&&n.includes(r)}),a=angular.copy(t);a.score=n||m(t);var s=o.getSelectedContestantId();return a.entryCount=d.filter(function(t){return t.golferIds.includes(a.id)}).length,a.isSelected=d.some(function(t){return t.golferIds.includes(a.id)&&t.contestantId===s}),a})})},m=function(t){return{index:Number.MAX_SAFE_INTEGER,isDNF:!0,toPar:"--",relativeScore:Number.MAX_SAFE_INTEGER,total:"--",totalScore:Number.MAX_SAFE_INTEGER,position:"--",currentRoundScore:"--",thru:"--",round1Score:"--",round2Score:"--",round3Score:"--",round4Score:"--",fullName:"",shortName:t.firstName[0]+". "+t.lastName,logoImage:"",startTime:null,movement:{text:"-",direction:a.none}}},N=function(t,e){var r=!1,n=t.find(".relativeScore").text(),i="E"===n?0:parseInt(n);isNaN(i)&&(i=Number.MAX_SAFE_INTEGER,r=!0);var o=t.find(".totalScore").text(),s="--"===o?0:parseInt(o);isNaN(s)&&(s=Number.MAX_SAFE_INTEGER);var l=t.find(".thru").text(),d=void 0;if(""===l){var c=t.find(".thru .date-container").attr("data-date");d=new Date(c)}else d=null;var f=t.find(".position").text(),u=t.find(".currentRoundScore").text(),m=t.find(".round1").text(),N=t.find(".round2").text(),g=t.find(".round3").text(),p=t.find(".round4").text(),h=t.find(".full-name").text(),v=t.find(".short-name").text(),b=t.find(".team-logo img").attr("src"),y=t.find(".movement"),S=y.text(),D=void 0;return D=y.hasClass("positive")?a.positive:y.hasClass("negative")?a.negative:a.none,{index:e,isDNF:r,toPar:n,relativeScore:i,total:o,totalScore:s,position:f,currentRoundScore:u,thru:l,round1Score:m,round2Score:N,round3Score:g,round4Score:p,fullName:h,shortName:v,logoImage:b,startTime:d,movement:{text:S,direction:D}}},g=function(t){var e=d.map(function(e){var r=e.golferIds.map(function(e){return angular.copy(t.find(function(t){return t.id===e}))}),n=void 0,a=void 0,i=void 0,s=r.filter(function(t){return t.score.isDNF}).length>1,l=o.getSelectedContestantId(),d=e.contestantId===l;if(s)n=Number.MAX_SAFE_INTEGER,a="--",i="--";else{_.orderBy(r,["score.relativeScore","score.totalScore","id"],["desc","desc","desc"])[0].throwaway=!0,n=r.filter(function(t){return!0!==t.throwaway}).reduce(function(t,e){return t+e.score.relativeScore},0),a=r.filter(function(t){return!0!==t.throwaway}).reduce(function(t,e){return t+e.score.totalScore},0).toString(),i=0===n?"E":n.toString()}return{name:e.name,golfers:r,overallRelativeScore:n,overallTotalScore:a,overallToPar:i,isDQ:s,isSelected:d,contestantId:e.contestantId}});return p(e)},p=function(t){var e=_.sortBy(t,["overallRelativeScore","overallTotalScore"]),r=1,n=0;return e.forEach(function(t,a){var i=e.filter(function(e){return e.overallRelativeScore===t.overallRelativeScore}).length>1;t.overallRelativeScore>n&&(r=a+1),t.position=i?"T"+r:r.toString(),t.positionNumber=r,n=t.overallRelativeScore}),e}};r.$inject=["$http","GOLFERS","CONTESTANTS","MOVEMENT","LEADERBOARD_URL","settingsService","notificationService","$rootScope"],e.default=r}).call(e,r(10))},125:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t){"ngInject";var e=this;this.$onInit=function(){e.refreshTime="Refresh Time: "+t/1e3+" seconds"}};n.$inject=["REFRESH_TIME"],e.default={template:'\n<footer>\n  <span ng-bind="::$ctrl.refreshTime">\n</footer>',controller:n}},126:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t,e,r,n,a,i){"ngInject";var o=this,s=function(){return t.get().then(function(t){o.golfers=_.sortBy(t.golfers,function(t){return t.score.index})})},l=function(){var t=i.getGotoGolferId();if(t){a(function(){return n("golfer-"+t)},10);var e=o.golfers.find(function(e){return e.id===t});e&&(e.isHighlighted=!0,a(function(){return e.isHighlighted=!1},3e3))}},d=void 0;this.$onInit=function(){s().then(function(){return l()}),d=e(function(){return s()},r)},this.$onDestroy=function(){angular.isDefined(d)&&(e.cancel(d),d=void 0)},this.getName=function(t){return t.firstName+" "+t.lastName+(t.isAmateur?" (A)":"")}};n.$inject=["dataService","$interval","REFRESH_TIME","$anchorScroll","$timeout","gotoService"],e.default={template:'\n<div class="golfer-leaderboard">\n<table class="table table-striped table-responsive table-condensed">\n\t<thead>\n\t<tr>\n\t\t<th>Pos</th><th class="movement"></th><th>Player</th><th>Entries</th><th>To Par</th><th>Today</th><th>Thru</th><th>R1</th><th>R2</th><th>R3</th><th>R4</th><th>Tot</th>\n\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr ng-repeat="golfer in $ctrl.golfers track by $index" ng-attr-id="golfer-{{golfer.id}}" ng-class="{\'success\': golfer.isHighlighted, \'selected\': golfer.isSelected}">\n\t\t\t<td ng-bind="golfer.score.position"></td>\n\t\t\t<td ng-class="golfer.score.movement.direction" ng-bind="golfer.score.movement.text"></td>\n\t\t\t<td><div ng-if="golfer.score.logoImage" class="logo"><img ng-src="{{golfer.score.logoImage}}" /></div><span ng-bind="$ctrl.getName(golfer)"></span></td>\n\t\t\t<td ng-bind="golfer.entryCount"></td>\n\t\t\t<td ng-bind="golfer.score.toPar"></td>\n\t\t\t<td ng-bind="golfer.score.currentRoundScore"></td>\n\t\t\t<td ng-if="golfer.score.thru" ng-bind="golfer.score.thru"></td>\n\t\t\t<td ng-if="!golfer.score.thru" ng-bind="golfer.score.startTime | date:\'shortTime\'"></td>\n\t\t\t<td ng-bind="golfer.score.round1Score"></td>\n\t\t\t<td ng-bind="golfer.score.round2Score"></td>\n\t\t\t<td ng-bind="golfer.score.round3Score"></td>\n\t\t\t<td ng-bind="golfer.score.round4Score"></td>\n\t\t\t<td ng-bind="golfer.score.total"></td>\n\t\t</tr>\n\t</tbody>\n</table>\n</div>',controller:n}},127:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t){"ngInject";var e=null;this.gotoGolfer=function(r){e=r,t.url("/golfers")},this.getGotoGolferId=function(){var t=e;return e=null,t}};n.$inject=["$location"],e.default=n},128:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(116),a=function(t){return t&&t.__esModule?t:{default:t}}(n),i=function(t){"ngInject";var e=this;this.currentRoute=function(){return"/"===t.path()?"pool":"/golfers"===t.path()?"golfers":"/settings"===t.path()?"settings":""},this.$onInit=function(){e.logoUrl=a.default}};i.$inject=["$location"],e.default={template:'\n<nav class="navbar navbar-default">\n  <div class="container-fluid">\n    <div class="navbar-header">\n      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">\n        <span class="sr-only">Toggle navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <a class="navbar-brand" href="#">\n         <img alt="Golf Pool" ng-src="{{::$ctrl.logoUrl}}">\n      </a>\n    </div>\n\n    <div class="collapse navbar-collapse" id="navbar-collapse">\n      <ul class="nav navbar-nav">\n        <li ng-class="{\'active\': $ctrl.currentRoute() === \'pool\'}"><a href="/">Pool</a></li>\n        <li ng-class="{\'active\': $ctrl.currentRoute() === \'golfers\'}"><a href="#!/golfers">Golfers</a></li>\n        <li ng-class="{\'active\': $ctrl.currentRoute() === \'settings\'}"><a href="#!/settings">Settings</a></li>\n      </ul>\n    </div>\n  </div>\n</nav>',controller:i}},129:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(116),a=function(t){return t&&t.__esModule?t:{default:t}}(n),i=function(t,e){"ngInject";var r={supported:Boolean("Notification"in window),granted:!1};r.supported&&Notification.requestPermission().then(function(t){e.$applyAsync(function(){return r.granted="granted"===t})}),this.getStatus=function(){return r},this.update=function(e,a){var i=t.getSelectedContestantId();if(r.supported&&!(i<0)&&e){var o=e.filter(function(t){return t.contestantId===i}).map(function(t){return t.positionNumber}),s=a.filter(function(t){return t.contestantId===i}).map(function(t){return t.positionNumber});o.some(function(t){return 1===t||2===t})&&!s.some(function(t){return 1===t||2===t})?n(!1):!o.some(function(t){return 1===t||2===t})&&s.some(function(t){return 1===t||2===t})&&n(!0)}};var n=function(t){Notification.requestPermission().then(function(e){if("granted"===e){r.granted=!0;var n=t?"You've moved into the top 2!":"You've dropped out of the top 2.",i={icon:a.default};return new Notification(n,i)}r.granted=!1})}};i.$inject=["settingsService","$rootScope"],e.default=i},130:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t,e,r,n,a){"ngInject";var i=this,o=n("date"),s=function(){t.get().then(function(t){i.entries=t.entries})},l=void 0;this.$onInit=function(){s(),l=e(function(){return s()},r)},this.$onDestroy=function(){angular.isDefined(l)&&(e.cancel(l),l=void 0)},this.getGolferInfo=function(t,e){var r=t.golfers[e];return r.score.shortName+(r.isAmateur?" (A)":"")+": "+r.score.toPar+" ("+(r.score.thru?r.score.thru:o(r.score.startTime,"shortTime"))+")"},this.gotoGolfer=function(t){a.gotoGolfer(t.id)}};n.$inject=["dataService","$interval","REFRESH_TIME","$filter","gotoService"],e.default={template:'\n<div class="pool-leaderboard">\n<table class="table table-responsive table-condensed">\n\t<thead><tr>\n\t\t<th>Pos</th><th>Name</th><th>Golfer A</th><th>Golfer B</th><th>Golfer C</th><th>Golfer D</th><th>To Par</th>\n\t</tr></thead>\n\t<tbody>\n\t\t<tr ng-repeat="entry in $ctrl.entries track by $index" ng-class="{danger: entry.isDQ, selected: entry.isSelected}">\n\t\t\t<td ng-bind="entry.position"></td>\n\t\t\t<td ng-bind="entry.name"></td>\n\t\t\t<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[0])" ng-class="entry.golfers[0].throwaway ? \'warning\' : \'success\'" ng-bind-html="$ctrl.getGolferInfo(entry, 0)"></td>\n\t\t\t<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[1])" ng-class="entry.golfers[1].throwaway ? \'warning\' : \'success\'" ng-bind-html="$ctrl.getGolferInfo(entry, 1)"></td>\n\t\t\t<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[2])" ng-class="entry.golfers[2].throwaway ? \'warning\' : \'success\'" ng-bind-html="$ctrl.getGolferInfo(entry, 2)"></td>\n\t\t\t<td class="golfer-score" ng-click="$ctrl.gotoGolfer(entry.golfers[3])" ng-class="entry.golfers[3].throwaway ? \'warning\' : \'success\'" ng-bind-html="$ctrl.getGolferInfo(entry, 3)"></td>\n\t\t\t<th ng-bind="entry.overallToPar"></th>\n\t\t</tr>\n\t</tbody>\n</table>\n</div>',controller:n}},131:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t,e,r){"ngInject";var n=this;this.contestantSelected=function(){e.setSelectedContestantId(n.selectedContestantId)},this.$onInit=function(){n.contestants=_.concat([{name:"none",id:-1}],t.map(function(t){return{name:t.name,id:t.id}})),n.selectedContestantId=e.getSelectedContestantId().toString(),n.notificationStatus=r.getStatus()}};n.$inject=["CONTESTANTS","settingsService","notificationService"],e.default={template:'\n<form class="settings">\n  <div class="form-group">\n    <label for="contestantDropdown">Selected Contestant: </label>\n    <select id="contestantDropdown" class="form-control" ng-model="$ctrl.selectedContestantId" ng-change="$ctrl.contestantSelected()">\n\t\t<option ng-repeat="contestant in $ctrl.contestants track by contestant.id" value="{{contestant.id}}" ng-bind="contestant.name"></option>\n\t</select>\n  </div>\n  <div class="checkbox">\n    <label>\n      <input disabled type="checkbox" ng-checked="$ctrl.notificationStatus.supported && $ctrl.notificationStatus.granted"> Notifications Enabled\n      <span ng-if="$ctrl.notificationStatus.supported && !$ctrl.notificationStatus.granted">(To turn on notifications, go into your browser settings and enable them for this domain)</span>\n      <span ng-if="$ctrl.notificationStatus.supported && $ctrl.notificationStatus.granted">(To turn off notifications, go into your browser settings and disable them for this domain)</span>\n      <span ng-if="!$ctrl.notificationStatus.supported">(You browser does not support notifications)</span>\n    </label>\n  </div>\n</form>',controller:n}},132:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t){"ngInject";var e="undefined"!=typeof Storage,r=t+"-selectedContestantId";this.getSelectedContestantId=function(){return e&&localStorage.getItem(r)?parseInt(localStorage.getItem(r)):-1},this.setSelectedContestantId=function(t){localStorage.setItem(r,t)}};n.$inject=["TOURNEY_TITLE"],e.default=n},133:function(t,e,r){var n=r(330);"string"==typeof n&&(n=[[t.i,n,""]]);var a={};a.transform=void 0;r(336)(n,a);n.locals&&(t.exports=n.locals)},330:function(t,e,r){e=t.exports=r(331)(void 0),e.push([t.i,'body {\n    font-size: 12px;\n}\n\n.logo {\n    display: inline;\n    margin-right: 5px;\n}\n\n.logo img {\n    bottom: 8px;\n    position: relative;\n    width: 20px;\n    margin-bottom: -14px;\n}\n\ntable th.movement:before {\n    content: "\\2191";/*"\\2B06";*/\n}\ntable th.movement:after {\n    content: "\\2193";\n}\ntable td.negative {\n    color: #d00;\n}\ntable td.negative:before {\n    content: "\\2193";\n    position: relative;\n    top: -1px;\n    margin-right: 2px;\n}\ntable td.positive {\n    color: #094;\n}\ntable td.positive:before {\n    content: "\\2191";\n    position: relative;\n    top: -1px;\n    margin-right: 2px;\n}\ntable tr.selected {\n    border: 2px solid black;\n}\ntable tr.selected:first-child {\n    border-top-width: 3px;\n}\n\n@media only screen and (max-width: 375px) {\n    .pool-leaderboard table td, .pool-leaderboard table th {\n        max-width: 50px;\n        word-wrap: break-word;\n        font-size: 10px;\n    }\n\n    .golfer-leaderboard table td, .golfer-leaderboard table th {\n        max-width: 40px;\n        word-wrap: break-word;\n        font-size: 8px;\n    }\n}\n\n\n.golfer-score {\n    cursor: pointer;;\n}\n.settings {\n    margin: 20px 0;\n}\n.settings .form-control {\n    font-size: 16px;\n}\n.navbar .navbar-brand img {\n    height: 25px;\n}',""])},331:function(t,e){function r(t,e){var r=t[1]||"",a=t[3];if(!a)return r;if(e&&"function"==typeof btoa){var i=n(a);return[r].concat(a.sources.map(function(t){return"/*# sourceURL="+a.sourceRoot+t+" */"})).concat([i]).join("\n")}return[r].join("\n")}function n(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=r(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,r){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},a=0;a<this.length;a++){var i=this[a][0];"number"==typeof i&&(n[i]=!0)}for(a=0;a<t.length;a++){var o=t[a];"number"==typeof o[0]&&n[o[0]]||(r&&!o[2]?o[2]=r:r&&(o[2]="("+o[2]+") and ("+r+")"),e.push(o))}},e}},332:function(t,e,r){t.exports=r.p+"favicon.ico"},333:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=[{id:1,firstName:"Dustin",lastName:"Johnson",tier:"A"},{id:2,firstName:"Jordan",lastName:"Spieth",tier:"A"},{id:3,firstName:"Rory",lastName:"McIlroy",tier:"A"},{id:4,firstName:"Jason",lastName:"Day",tier:"A"},{id:5,firstName:"Jon",lastName:"Rahm",tier:"A"},{id:6,firstName:"Rickie",lastName:"Fowler",tier:"A"},{id:7,firstName:"Justin",lastName:"Rose",tier:"A"},{id:8,firstName:"Sergio",lastName:"Garcia",tier:"A"},{id:9,firstName:"Hideki",lastName:"Matsuyama",tier:"A"},{id:10,firstName:"Henrik",lastName:"Stenson",tier:"A"},{id:11,firstName:"Adam",lastName:"Scott",tier:"B"},{id:12,firstName:"Justin",lastName:"Thomas",tier:"B"},{id:13,firstName:"Brooks",lastName:"Koepka",tier:"B"},{id:14,firstName:"Branden",lastName:"Grace",tier:"B"},{id:15,firstName:"Thomas",lastName:"Pieters",tier:"B"},{id:16,firstName:"Paul",lastName:"Casey",tier:"B"},{id:17,firstName:"Alex",lastName:"Noren",tier:"B"},{id:18,firstName:"Charl",lastName:"Schwartzel",tier:"B"},{id:19,firstName:"Louis",lastName:"Oosthuizen",tier:"B"},{id:20,firstName:"Jason",lastName:"Dufner",tier:"B"},{id:21,firstName:"Matt",lastName:"Kuchar",tier:"B"},{id:22,firstName:"Bubba",lastName:"Watson",tier:"B"},{id:23,firstName:"Daniel",lastName:"Berger",tier:"B"},{id:24,firstName:"Kevin",lastName:"Chappell",tier:"B"},{id:25,firstName:"Kevin",lastName:"Kisner",tier:"B"},{id:26,firstName:"Martin",lastName:"Kaymer",tier:"B"},{id:27,firstName:"Shane",lastName:"Lowry",tier:"B"},{id:28,firstName:"Patrick",lastName:"Reed",tier:"B"},{id:29,firstName:"Billy",lastName:"Horschel",tier:"B"},{id:30,firstName:"Francesco",lastName:"Molinari",tier:"B"},{id:31,firstName:"Marc",lastName:"Leishman",tier:"B"},{id:32,firstName:"Lee",lastName:"Westwood",tier:"C"},{id:33,firstName:"Brandt",lastName:"Snedeker",tier:"C"},{id:34,firstName:"Bud",lastName:"Cauley",tier:"C"},{id:35,firstName:"Byeong Hun",lastName:"An",tier:"C"},{id:36,firstName:"Jimmy",lastName:"Walker",tier:"C"},{id:37,firstName:"Matthew",lastName:"Fitzpatrick",tier:"C"},{id:38,firstName:"Rafael Cabrera",lastName:"Bello",tier:"C"},{id:39,firstName:"Russell",lastName:"Henley",tier:"C"},{id:40,firstName:"Tyrrell",lastName:"Hatton",tier:"C"},{id:41,firstName:"Adam",lastName:"Hadwin",tier:"C"},{id:42,firstName:"Bernd",lastName:"Wiesberger",tier:"C"},{id:43,firstName:"Brendan",lastName:"Steele",tier:"C"},{id:44,firstName:"Emiliano",lastName:"Grillo",tier:"C"},{id:45,firstName:"Gary",lastName:"Woodland",tier:"C"},{id:46,firstName:"J.B.",lastName:"Holmes",tier:"C"},{id:47,firstName:"Si Woo",lastName:"Kim",tier:"C"},{id:48,firstName:"Steve",lastName:"Stricker",tier:"C"},{id:49,firstName:"Tommy",lastName:"Fleetwood",tier:"C"},{id:50,firstName:"Bill",lastName:"Haas",tier:"C"},{id:51,firstName:"Brian",lastName:"Harman",tier:"C"},{id:52,firstName:"Charley",lastName:"Hoffman",tier:"C"},{id:53,firstName:"Graeme",lastName:"McDowell",tier:"C"},{id:54,firstName:"Lucas",lastName:"Glover",tier:"C"},{id:55,firstName:"Ross",lastName:"Fisher",tier:"C"},{id:56,firstName:"Russell",lastName:"Knox",tier:"C"},{id:57,firstName:"Stewart",lastName:"Cink",tier:"C"},{id:58,firstName:"Webb",lastName:"Simpson",tier:"C"},{id:59,firstName:"Zach",lastName:"Johnson",tier:"C"},{id:60,firstName:"Pat",lastName:"Perez",tier:"D"},{id:61,firstName:"Alexander",lastName:"Levy",tier:"D"},{id:62,firstName:"Daniel",lastName:"Summerhays",tier:"D"},{id:63,firstName:"Danny",lastName:"Willett",tier:"D"},{id:64,firstName:"David",lastName:"Lingmerth",tier:"D"},{id:65,firstName:"Haotong",lastName:"Li",tier:"D"},{id:66,firstName:"Hideto",lastName:"Tanihara",tier:"D"},{id:67,firstName:"Jhonattan",lastName:"Vegas",tier:"D"},{id:68,firstName:"Keegan",lastName:"Bradley",tier:"D"},{id:69,firstName:"Kevin",lastName:"Na",tier:"D"},{id:70,firstName:"Martin",lastName:"Laird",tier:"D"},{id:71,firstName:"Peter",lastName:"Uihlein",tier:"D"},{id:72,firstName:"Scott",lastName:"Piercy",tier:"D"},{id:73,firstName:"Sean",lastName:"O'Hair",tier:"D"},{id:74,firstName:"Wesley",lastName:"Bryan",tier:"D"},{id:75,firstName:"William",lastName:"McGirt",tier:"D"},{id:76,firstName:"Andrew",lastName:"Johnston",tier:"D"},{id:77,firstName:"Jamie",lastName:"Donaldson",tier:"D"},{id:78,firstName:"Bryson",lastName:"DeChambeau",tier:"D"},{id:79,firstName:"C.T.",lastName:"Pan",tier:"D"},{id:80,firstName:"George",lastName:"Coetzee",tier:"D"},{id:81,firstName:"Harris",lastName:"English",tier:"D"},{id:82,firstName:"Jamie",lastName:"Lovemark",tier:"D"},{id:83,firstName:"Jason",lastName:"Kokrak",tier:"D"},{id:84,firstName:"Jeunghun",lastName:"Wang",tier:"D"},{id:85,firstName:"Jim",lastName:"Furyk",tier:"D"},{id:86,firstName:"Paul",lastName:"Dunne",tier:"D"},{id:87,firstName:"Bradley",lastName:"Dredge",tier:"D"},{id:88,firstName:"Brandon",lastName:"Stone",tier:"D"},{id:89,firstName:"Chan",lastName:"Kim",tier:"D"},{id:90,firstName:"Chez",lastName:"Reavie",tier:"D"},{id:91,firstName:"Eddie",lastName:"Pepperell",tier:"D"},{id:92,firstName:"Ernie",lastName:"Els",tier:"D"},{id:93,firstName:"JT",lastName:"Poston",tier:"D"},{id:94,firstName:"Joaquin",lastName:"Niemann",tier:"D",isAmateur:!0},{id:95,firstName:"Jordan",lastName:"Niebrugge",tier:"D"},{id:96,firstName:"Maverick",lastName:"McNealy",tier:"D",isAmateur:!0},{id:97,firstName:"Richie",lastName:"Ramsay",tier:"D"},{id:98,firstName:"Roberto",lastName:"Castro",tier:"D"},{id:99,firstName:"Ted Potter",lastName:"Jr.",tier:"D"},{id:100,firstName:"Yuta",lastName:"Ikeda",tier:"D"},{id:101,firstName:"Aaron",lastName:"Rai",tier:"D"},{id:102,firstName:"Angel",lastName:"Cabrera",tier:"D"},{id:103,firstName:"Jonathan",lastName:"Randolph",tier:"D"},{id:104,firstName:"Whee",lastName:"Kim",tier:"D"},{id:105,firstName:"Kyle",lastName:"Thompson",tier:"D"},{id:106,firstName:"Matt",lastName:"Wallace",tier:"D"},{id:107,firstName:"Satoshi",lastName:"Kodaira",tier:"D"},{id:108,firstName:"Shugo",lastName:"Imahira",tier:"D"},{id:109,firstName:"Thomas",lastName:"Aiken",tier:"D"},{id:110,firstName:"Stephan",lastName:"Jaeger",tier:"D"},{id:111,firstName:"Andres",lastName:"Romero",tier:"D"},{id:112,firstName:"Brad",lastName:"Dalke",tier:"D"},{id:113,firstName:"Brian",lastName:"Stuard",tier:"D"},{id:114,firstName:"Corey",lastName:"Conners",tier:"D"},{id:115,firstName:"Gene",lastName:"Sauers",tier:"D"},{id:116,firstName:"Jack",lastName:"Maguire",tier:"D"},{id:117,firstName:"Michael",lastName:"Putnam",tier:"D"},{id:118,firstName:"Oliver",lastName:"Bekker",tier:"D"},{id:119,firstName:"Sam",lastName:"Ryder",tier:"D"},{id:120,firstName:"Scottie",lastName:"Scheffler",tier:"D",isAmateur:!0},{id:121,firstName:"Talor",lastName:"Gooch",tier:"D"},{id:122,firstName:"Wade",lastName:"Ormsby",tier:"D"},{id:123,firstName:"Xander",lastName:"Schauffele",tier:"D"},{id:124,firstName:"Yusaku",lastName:"Miyazato",tier:"D"},{id:125,firstName:"Daniel",lastName:"Chopra",tier:"D"},{id:126,firstName:"Joel",lastName:"Stalter",tier:"D"},{id:127,firstName:"Ben",lastName:"Kohles",tier:"D"},{id:128,firstName:"Brice",lastName:"Garnett",tier:"D"},{id:129,firstName:"Derek",lastName:"Barron",tier:"D"},{id:130,firstName:"John",lastName:"Oda",tier:"D"},{id:131,firstName:"Ryan",lastName:"Brehm",tier:"D"},{id:132,firstName:"Scott",lastName:"Gregory",tier:"D",isAmateur:!0},{id:133,firstName:"Stewart",lastName:"Hagestad",tier:"D",isAmateur:!0},{id:134,firstName:"Troy",lastName:"Merritt",tier:"D"},{id:135,firstName:"Andy",lastName:"Pope",tier:"D"},{id:136,firstName:"Trey",lastName:"Mullinax",tier:"D"},{id:137,firstName:"Alex",lastName:"Smalley",tier:"D",isAmateur:!0},{id:138,firstName:"Chris",lastName:"Crawford",tier:"D",isAmateur:!0},{id:139,firstName:"Daniel",lastName:"Miernicki",tier:"D"},{id:140,firstName:"Garrett",lastName:"Osborn",tier:"D"},{id:141,firstName:"Sahith",lastName:"Theegala",tier:"D",isAmateur:!0},{id:142,firstName:"Scott",lastName:"Harvey",tier:"D",isAmateur:!0},{id:143,firstName:"Matt",lastName:"Campbell",tier:"D"},{id:144,firstName:"Tyson",lastName:"Alexander",tier:"D"},{id:145,firstName:"Walker",lastName:"Lee",tier:"D",isAmateur:!0},{id:146,firstName:"Cameron",lastName:"Champ",tier:"D",isAmateur:!0},{id:147,firstName:"Kevin",lastName:"Dougherty",tier:"D"},{id:148,firstName:"Mason",lastName:"Andersen",tier:"D",isAmateur:!0},{id:149,firstName:"Max",lastName:"Greyserman",tier:"D"},{id:150,firstName:"Nick",lastName:"Flanagan",tier:"D"},{id:151,firstName:"Roman",lastName:"Robledo",tier:"D"}],a=[{name:"Adam Weiss",entries:[[1,11,39,95],[2,15,43,95],[6,13,34,73]]},{name:"Cameron Weimer",entries:[[2,20,35,82],[1,15,34,95],[6,12,33,75]]},{name:"Drew Serruto",entries:[[1,12,46,68],[6,11,32,62],[3,20,50,69]]},{name:"Jon Frantz",entries:[[2,21,33,63],[6,20,32,68],[1,31,47,69]]},{name:"Kevin Donoher",entries:[[1,11,36,60],[5,16,43,61],[6,19,50,71]]},{name:"Kyle Bivenour",entries:[[2,20,32,68],[1,20,58,68],[6,11,33,69]]},{name:"Matt Kilianski",entries:[[3,12,40,64],[1,27,33,68],[6,27,48,62]]},{name:"Matt Weimer",entries:[[2,12,32,95],[6,13,40,62],[1,20,33,75]]},{name:"Nate Heckmann",entries:[[4,27,50,75],[6,12,47,69],[2,14,33,69]]},{name:"Neil Thompson",entries:[[1,13,46,71],[2,12,34,71],[3,17,34,71]]},{name:"Ryan Boudouris",entries:[[4,11,48,60],[3,13,38,85],[1,15,32,62]]},{name:"Nick Royer",entries:[[1,11,37,62],[1,15,43,74],[7,15,33,62]]},{name:"Ryan Romes",entries:[[4,25,39,62],[6,15,41,60],[7,18,33,75]]},{name:"Sean Buckle",entries:[[1,12,33,67],[3,11,36,68],[6,12,45,75]]},{name:"Ian Horwich",entries:[[1,17,32,71],[6,25,40,61],[4,16,42,94]]},{name:"David Prevo",entries:[[2,20,36,77],[4,22,39,68],[3,13,34,69]]}];e.tourneyTitle="2017 US Open",e.leaderboardUrl="http://www.espn.com/golf/leaderboard?tournamentId=3066",e.golferData=n,e.contestantData=a},334:function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}r(133);var a=r(123),i=n(a),o=r(124),s=n(o),l=r(127),d=n(l),c=r(129),f=n(c),u=r(132),m=n(u),N=r(126),g=n(N),p=r(125),h=n(p),v=r(128),b=n(v),y=r(130),S=n(y),D=r(131),C=n(D);i.default.service("dataService",s.default),i.default.service("gotoService",d.default),i.default.service("notificationService",f.default),i.default.service("settingsService",m.default),i.default.component("golfers",g.default),i.default.component("gpFooter",h.default),i.default.component("gpHeader",b.default),i.default.component("pool",S.default),i.default.component("settings",C.default)},336:function(t,e,r){function n(t,e){for(var r=0;r<t.length;r++){var n=t[r],a=N[n.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](n.parts[i]);for(;i<n.parts.length;i++)a.parts.push(c(n.parts[i],e))}else{for(var o=[],i=0;i<n.parts.length;i++)o.push(c(n.parts[i],e));N[n.id]={id:n.id,refs:1,parts:o}}}}function a(t,e){for(var r=[],n={},a=0;a<t.length;a++){var i=t[a],o=e.base?i[0]+e.base:i[0],s=i[1],l=i[2],d=i[3],c={css:s,media:l,sourceMap:d};n[o]?n[o].parts.push(c):r.push(n[o]={id:o,parts:[c]})}return r}function i(t,e){var r=p(t.insertInto);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var n=b[b.length-1];if("top"===t.insertAt)n?n.nextSibling?r.insertBefore(e,n.nextSibling):r.appendChild(e):r.insertBefore(e,r.firstChild),b.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");r.appendChild(e)}}function o(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=b.indexOf(t);e>=0&&b.splice(e,1)}function s(t){var e=document.createElement("style");return t.attrs.type="text/css",d(e,t.attrs),i(t,e),e}function l(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",d(e,t.attrs),i(t,e),e}function d(t,e){Object.keys(e).forEach(function(r){t.setAttribute(r,e[r])})}function c(t,e){var r,n,a,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var d=v++;r=h||(h=s(e)),n=f.bind(null,r,d,!1),a=f.bind(null,r,d,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(r=l(e),n=m.bind(null,r,e),a=function(){o(r),r.href&&URL.revokeObjectURL(r.href)}):(r=s(e),n=u.bind(null,r),a=function(){o(r)});return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else a()}}function f(t,e,r,n){var a=r?"":n.css;if(t.styleSheet)t.styleSheet.cssText=S(e,a);else{var i=document.createTextNode(a),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(i,o[e]):t.appendChild(i)}}function u(t,e){var r=e.css,n=e.media;if(n&&t.setAttribute("media",n),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}function m(t,e,r){var n=r.css,a=r.sourceMap,i=void 0===e.convertToAbsoluteUrls&&a;(e.convertToAbsoluteUrls||i)&&(n=y(n)),a&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */");var o=new Blob([n],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(o),s&&URL.revokeObjectURL(s)}var N={},g=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),p=function(t){var e={};return function(r){return void 0===e[r]&&(e[r]=t.call(this,r)),e[r]}}(function(t){return document.querySelector(t)}),h=null,v=0,b=[],y=r(337);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=g()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var r=a(t,e);return n(r,e),function(t){for(var i=[],o=0;o<r.length;o++){var s=r[o],l=N[s.id];l.refs--,i.push(l)}if(t){n(a(t,e),e)}for(var o=0;o<i.length;o++){var l=i[o];if(0===l.refs){for(var d=0;d<l.parts.length;d++)l.parts[d]();delete N[l.id]}}}};var S=function(){var t=[];return function(e,r){return t[e]=r,t.filter(Boolean).join("\n")}}()},337:function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var r=e.protocol+"//"+e.host,n=r+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var a=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(a))return t;var i;return i=0===a.indexOf("//")?a:0===a.indexOf("/")?r+a:n+a.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}}},[334]);