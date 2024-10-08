"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var filterByCountriesSelectEl = document.getElementById("countries-filter");
var datePickerEl = document.getElementById("date-picker");
var setMaxDatePickerValue = function () {
    var _a = getCurrentDate(), day = _a.day, month = _a.month, year = _a.year;
    var convertedDay = correctDateNumbers(day - 1);
    var convertedMonth = convertToDateNum(month);
    var date = year + "-" + convertedMonth + "-" + convertedDay;
    datePickerEl.max = date;
    datePickerEl.value = date;
};
var convertToString = function (value) {
    return value + "";
};
var correctDateNumbers = function (number) {
    return number <= 10 ? "0" + --number : number;
};
var convertToDateNum = function (number) {
    return number <= 10 ? "0" + number : number;
};
var getAllRegions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.get("https://covid-api.com/api/regions")];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data.data];
        }
    });
}); };
var getCurrentDate = function () {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var dateObject = { day: day, month: month, year: year };
    return dateObject;
};
var getCovidReport = function (countryISO) {
    if (countryISO === void 0) { countryISO = "total"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var responseValidator, date, responseCovidReport, response_1, responseCovidReports, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    responseValidator = function (response) {
                        var notAvailableDateObject = {
                            active: "Not available",
                            confirmed: "Not available",
                            deaths: "Not available",
                            recovered: "Not available",
                        };
                        if (Array.isArray(response) || typeof response === "undefined") {
                            return notAvailableDateObject;
                        }
                        return response;
                    };
                    date = datePickerEl.value;
                    if (!(countryISO !== "total")) return [3 /*break*/, 2];
                    return [4 /*yield*/, axios_1.default.get("https://covid-api.com/api/reports?date=" + date + "&iso=" + countryISO)];
                case 1:
                    responseCovidReport = _a.sent();
                    response_1 = responseValidator(responseCovidReport.data.data[0]);
                    console.log(responseCovidReport);
                    return [2 /*return*/, response_1];
                case 2: return [4 /*yield*/, axios_1.default.get("https://covid-api.com/api/reports/total?date=" + date)];
                case 3:
                    responseCovidReports = _a.sent();
                    response = responseValidator(responseCovidReports.data.data);
                    return [2 /*return*/, response];
            }
        });
    });
};
var selectAllCounters = function () {
    var counterElsList = [];
    var quartersElements = document.querySelectorAll(".w3-quarter");
    // for (const quarter of quartersElements as any) {
    //     const counterEl = quarter.children[0].children[1];
    //     counterElsList.push(counterEl);
    // }
    quartersElements.forEach(function (quarter) {
        var containerEl = quarter.children[0];
        var counterRightDivEl = containerEl.children[1];
        var h1CounterEl = counterRightDivEl.children[0];
        counterElsList.push(h1CounterEl);
    });
    return counterElsList;
};
var fillFilterWithCountriesData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var countriesData, _i, countriesData_1, _a, iso, name_1, optEl;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getAllRegions()];
            case 1:
                countriesData = _b.sent();
                countriesData.sort(function (a, b) {
                    return a.name < b.name ? -1 : 1;
                });
                for (_i = 0, countriesData_1 = countriesData; _i < countriesData_1.length; _i++) {
                    _a = countriesData_1[_i], iso = _a.iso, name_1 = _a.name;
                    optEl = document.createElement("option");
                    optEl.value = iso;
                    optEl.textContent = name_1;
                    filterByCountriesSelectEl.append(optEl);
                }
                return [2 /*return*/];
        }
    });
}); };
filterByCountriesSelectEl.addEventListener("change", function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var optionEl, selectedCountryISO, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                optionEl = event.target;
                selectedCountryISO = optionEl.value;
                console.log(selectedCountryISO);
                return [4 /*yield*/, getCovidReport(selectedCountryISO)];
            case 1:
                response = _a.sent();
                console.log(response.active);
                updateCounters(response);
                return [2 /*return*/];
        }
    });
}); });
datePickerEl.addEventListener("change", function () { return __awaiter(void 0, void 0, void 0, function () {
    var selectedCountryISO, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                selectedCountryISO = filterByCountriesSelectEl.value;
                return [4 /*yield*/, getCovidReport(selectedCountryISO)];
            case 1:
                response = _a.sent();
                updateCounters(response);
                return [2 /*return*/];
        }
    });
}); });
var updateCounters = function (_a) {
    var active = _a.active, confirmed = _a.confirmed, deaths = _a.deaths, recovered = _a.recovered;
    var _b = selectAllCounters(), activeCounter = _b[0], confirmedCounter = _b[1], deathsCounter = _b[2], recoveredCounter = _b[3];
    activeCounter.innerText = convertToString(active);
    confirmedCounter.innerText = convertToString(confirmed);
    deathsCounter.innerText = convertToString(deaths);
    recoveredCounter.innerText = convertToString(recovered);
};
var initApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                setMaxDatePickerValue();
                return [4 /*yield*/, getCovidReport()];
            case 1:
                response = _a.sent();
                updateCounters(response);
                fillFilterWithCountriesData();
                return [2 /*return*/];
        }
    });
}); };
initApp();
//# sourceMappingURL=app.js.map