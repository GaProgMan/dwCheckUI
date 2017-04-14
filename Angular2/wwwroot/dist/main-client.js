/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(0);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = vendor_9e1f6cfdc9b31917f438;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(334);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(194);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(23);
var angular2_universal_1 = __webpack_require__(2);
var app_component_1 = __webpack_require__(9);
var navmenu_component_1 = __webpack_require__(12);
var books_component_1 = __webpack_require__(10);
var characters_component_1 = __webpack_require__(11);
var about_component_1 = __webpack_require__(8);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [app_component_1.AppComponent],
        declarations: [
            app_component_1.AppComponent,
            navmenu_component_1.NavMenuComponent,
            characters_component_1.CharacterComponent,
            books_component_1.BooksComponent,
            about_component_1.AboutComponent
        ],
        imports: [
            angular2_universal_1.UniversalModule,
            router_1.RouterModule.forRoot([
                { path: '', redirectTo: 'books', pathMatch: 'full' },
                { path: 'books', component: books_component_1.BooksComponent },
                { path: 'characters', component: characters_component_1.CharacterComponent },
                { path: 'about', component: about_component_1.AboutComponent },
                { path: '**', redirectTo: 'about' }
            ])
        ]
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(333);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(335);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var AboutComponent = (function () {
    function AboutComponent() {
    }
    return AboutComponent;
}());
AboutComponent = __decorate([
    core_1.Component({
        selector: 'about',
        template: __webpack_require__(16)
    })
], AboutComponent);
exports.AboutComponent = AboutComponent;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app',
        template: __webpack_require__(17),
        styles: [__webpack_require__(21)]
    })
], AppComponent);
exports.AppComponent = AppComponent;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(4);
var BooksComponent = (function () {
    function BooksComponent(http) {
        this.searchString = '';
        this.http = http;
        this.loading = false;
        this.baseApiUrl = 'http://dwcheckapi-test.azurewebsites.net/Books/Search?searchString=';
        this.books = null;
        this.registerFunctions();
    }
    BooksComponent.prototype.registerFunctions = function () {
        var _this = this;
        this.getDwBook = function () {
            var route = "" + _this.baseApiUrl + _this.searchString;
            _this.loading = true;
            _this.http.get(route).subscribe(function (result) {
                var resultJson = result.json();
                if (resultJson.success) {
                    _this.books = new Array();
                    result.json().result.forEach(function (element) {
                        _this.books.push(new Book(element.bookName, element.bookIsbn10, element.bookIsbn13, element.bookDescription, element.bookCoverImageUrl));
                    });
                }
                _this.loading = false;
            });
        };
    };
    return BooksComponent;
}());
BooksComponent = __decorate([
    core_1.Component({
        selector: 'books',
        template: __webpack_require__(18)
    }),
    __metadata("design:paramtypes", [http_1.Http])
], BooksComponent);
exports.BooksComponent = BooksComponent;
var Book = (function () {
    function Book(bookName, bookIsbn10, bookIsbn13, bookDescription, bookCoverImageUrl) {
        this.bookName = bookName;
        this.bookIsbn10 = bookIsbn10;
        this.bookIsbn13 = bookIsbn13;
        this.bookDescription = bookDescription;
        this.bookCoverImageUrl = bookCoverImageUrl;
    }
    return Book;
}());


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(4);
var CharacterComponent = (function () {
    function CharacterComponent(http) {
        this.searchString = '';
        this.http = http;
        this.success = true;
        this.loading = false;
        this.baseApiUrl = 'http://dwcheckapi-test.azurewebsites.net/Characters/Search?searchString=';
        this.registerFunctions();
    }
    CharacterComponent.prototype.registerFunctions = function () {
        var _this = this;
        this.getDwCharacter = function () {
            _this.success = false;
            var route = "" + _this.baseApiUrl + _this.searchString;
            _this.http.get(route).subscribe(function (result) {
                var resultJson = result.json();
                if (resultJson.success) {
                    _this.success = true;
                    _this.characters = new Array();
                    result.json().result.forEach(function (element) {
                        _this.characters.push(new Character(element.characterName, element.books));
                    });
                }
            });
        };
    };
    return CharacterComponent;
}());
CharacterComponent = __decorate([
    core_1.Component({
        selector: 'characters',
        template: __webpack_require__(19)
    }),
    __metadata("design:paramtypes", [http_1.Http])
], CharacterComponent);
exports.CharacterComponent = CharacterComponent;
var Character = (function () {
    function Character(characterName, books) {
        this.characterName = characterName;
        this.books = books;
        this.booksAsString = function () {
            return books.map(function (b) { return b; }).join(', ');
        };
    }
    return Character;
}());


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var NavMenuComponent = (function () {
    function NavMenuComponent() {
    }
    return NavMenuComponent;
}());
NavMenuComponent = __decorate([
    core_1.Component({
        selector: 'nav-menu',
        template: __webpack_require__(20),
        styles: [__webpack_require__(22)]
    })
], NavMenuComponent);
exports.NavMenuComponent = NavMenuComponent;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(6);
var core_1 = __webpack_require__(0);
var angular2_universal_1 = __webpack_require__(2);
var app_module_1 = __webpack_require__(5);
__webpack_require__(7);
var rootElemTagName = 'app'; // Update this if you change your root component selector
// Enable either Hot Module Reloading or production mode
if (false) {
    module['hot'].accept();
    module['hot'].dispose(function () {
        // Before restarting the app, we create a new root element and dispose the old one
        var oldRootElem = document.querySelector(rootElemTagName);
        var newRootElem = document.createElement(rootElemTagName);
        oldRootElem.parentNode.insertBefore(newRootElem, oldRootElem);
        platform.destroy();
    });
}
else {
    core_1.enableProdMode();
}
// Boot the application, either now or when the DOM content is loaded
var platform = angular2_universal_1.platformUniversalDynamic();
var bootApplication = function () { platform.bootstrapModule(app_module_1.AppModule); };
if (document.readyState === 'complete') {
    bootApplication();
}
else {
    document.addEventListener('DOMContentLoaded', bootApplication);
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)();
// imports


// module
exports.push([module.i, "@media (max-width: 767px) {\r\n    /* On small screens, the nav menu spans the full width of the screen. Leave a space for it. */\r\n    .body-content {\r\n        padding-top: 50px;\r\n    }\r\n}\r\n", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)();
// imports


// module
exports.push([module.i, "li .glyphicon {\r\n    margin-right: 10px;\r\n}\r\n\r\n/* Highlighting rules for nav menu items */\r\nli.link-active a,\r\nli.link-active a:hover,\r\nli.link-active a:focus {\r\n    background-color: #4189C7;\r\n    color: white;\r\n}\r\n\r\n/* Keep the nav menu independent of scrolling and on top of other items */\r\n.main-nav {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    z-index: 1;\r\n}\r\n\r\n@media (min-width: 768px) {\r\n    /* On small screens, convert the nav menu to a vertical sidebar */\r\n    .main-nav {\r\n        height: 100%;\r\n        width: calc(25% - 20px);\r\n    }\r\n    .navbar {\r\n        border-radius: 0px;\r\n        border-width: 0px;\r\n        height: 100%;\r\n    }\r\n    .navbar-header {\r\n        float: none;\r\n    }\r\n    .navbar-collapse {\r\n        border-top: 1px solid #444;\r\n        padding: 0px;\r\n    }\r\n    .navbar ul {\r\n        float: none;\r\n    }\r\n    .navbar li {\r\n        float: none;\r\n        font-size: 15px;\r\n        margin: 6px;\r\n    }\r\n    .navbar li a {\r\n        padding: 10px 16px;\r\n        border-radius: 4px;\r\n    }\r\n    .navbar a {\r\n        /* If a menu item's text is too long, truncate it */\r\n        width: 100%;\r\n        white-space: nowrap;\r\n        overflow: hidden;\r\n        text-overflow: ellipsis;\r\n    }\r\n}\r\n", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "<h1>Discworld Disorganiser</h1>\n\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <p>Welcome to the Discworld Disorganiser.</p>\n        <p>This application is designed to be a book and character search engine interface for the Discworld series of books.</p>\n        <p>To use this application, click on either 'Books' or 'Characters', these will take you to a search screen where you can search for a book or character within the Discworld series</p>\n    </div>\n</div>\n\n<h3>Technology Used</h3>\n<div class='row'>\n    <div class='col-xs-12'>\n        <p>This application runs on .NET Core and Angular2, with TypeScript compiled client-side scripting</p>\n        <p>The search functionality is provided by my dwCheckApi project. The source code for dwCheckApi can be found <a href=\"https://github.com/GaProgMan/dwCheckApi\" target=\"_blank\">here</a></p>\n    </div>\n</div>";

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "<div class='container-fluid'>\r\n    <div class='row'>\r\n        <div class='col-sm-3'>\r\n            <nav-menu></nav-menu>\r\n        </div>\r\n        <div class='col-sm-9 body-content'>\r\n            <router-outlet></router-outlet>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "<h1>Book Search</h1>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col-xs-12\">\r\n        <input [value]=\"searchString\" (input)=\"searchString = $event.target.value\"/>\r\n        <button (click)=\"getDwBook()\">Search</button>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"loader\" *ngIf=\"loading\">\r\n    <p>Searching, please wait</p>\r\n</div>\r\n\r\n<div class=\"table-responsive\" *ngIf=\"!loading && books\">\r\n    <table class='table'>\r\n        <thead>\r\n            <tr>\r\n                <th colspan=\"2\">Cover</th>\r\n                <th colspan=\"2\">Name</th>\r\n                <th>ISBN 10</th>\r\n                <th>ISBN 13</th>\r\n                <th>Description</th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr *ngFor=\"let book of books\">\r\n                <td colspan=\"2\"><img src=\"{{book.bookCoverImageUrl}}\" class=\"img-responsive\"/></td>\r\n                <td colspan=\"2\">{{ book.bookName }}</td>\r\n                <td>{{ book.bookIsbn10 }}</td>\r\n                <td>{{ book.bookIsbn13 }}</td>\r\n                <td>{{ book.bookDescription }}</td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</div>";

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "<h1>Character Search</h1>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col-xs-12\">\r\n        <input [value]=\"searchString\" (input)=\"searchString = $event.target.value\"/>\r\n        <button (click)=\"getDwCharacter()\">Search</button>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"loader\" *ngIf=\"!success\">\r\n    <p>Could not find any results</p>\r\n</div>\r\n\r\n<div class=\"table-responsive\" *ngIf=\"success\">\r\n    <table class='table' *ngIf=\"characters\">\r\n        <thead>\r\n            <tr>\r\n                <th colspan=\"2\">Name</th>\r\n                <th>Books</th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr *ngFor=\"let char of characters\">\r\n                <td colspan=\"2\">{{ char.characterName }}</td>\r\n                <td>{{ char.booksAsString() }}</td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</div>";

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = "<div class='main-nav'>\r\n    <div class='navbar navbar-inverse'>\r\n        <div class='navbar-header'>\r\n            <button type='button' class='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>\r\n                <span class='sr-only'>Toggle navigation</span>\r\n                <span class='icon-bar'></span>\r\n                <span class='icon-bar'></span>\r\n                <span class='icon-bar'></span>\r\n            </button>\r\n            <a class='navbar-brand' [routerLink]=\"['/about']\">dwCheckUi</a>\r\n        </div>\r\n        <div class='clearfix'></div>\r\n        <div class='navbar-collapse collapse'>\r\n            <ul class='nav navbar-nav'>\r\n                <li [routerLinkActive]=\"['link-active']\">\r\n                    <a [routerLink]=\"['/books']\">\r\n                        <span class='glyphicon glyphicon-book'></span> Books\r\n                    </a>\r\n                </li>\r\n                <li [routerLinkActive]=\"['link-active']\">\r\n                    <a [routerLink]=\"['/characters']\">\r\n                        <span class='glyphicon glyphicon-user'></span> Characters\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(14);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(15);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(332);

/***/ })
/******/ ]);
//# sourceMappingURL=main-client.js.map