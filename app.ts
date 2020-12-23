import axios from "axios";

interface IResponse {
    active: number;
    deaths: number;
    confirmed: number;
    recovered: number;
}

interface ICountriesData {
    ISO: string;
    name: string;
}

const filterByCountriesSelectEl = document.getElementById(
    "countries-filter"
) as HTMLSelectElement;
const datePickerEl = document.getElementById("date-picker") as HTMLInputElement;

const setMaxDatePickerValue = () => {
    const { day, month, year } = getCurrentDate();
    const convertedDay = correctDateNumbers(day - 1);
    const convertedMonth = convertToDateNum(month);
    const date = `${year}-${convertedMonth}-${convertedDay}`;
    datePickerEl.max = date;
    datePickerEl.value = date;
};

const correctDateNumbers = (number: number) => {
    return number <= 10 ? "0" + --number : number;
};

const convertToDateNum = (number: number) => {
    return number <= 10 ? "0" + number : number;
};

const getAllRegions = async () => {
    const response = await axios.get("https://covid-api.com/api/regions");
    return response.data;
};

const getCurrentDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const dateObject = { day, month, year };
    return dateObject;
};

const getCovidReport = async (countryISO = "total") => {
    const isResponseValid = (response: IResponse) => {
        const notAvailableDateObject = {
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

    const date = datePickerEl.value;

    if (countryISO !== "total") {
        const responseCovidReport = await axios.get(
            `https://covid-api.com/api/reports?date=${date}&iso=${countryISO}`
        );
        const response = isResponseValid(responseCovidReport.data.data[0]);
        console.log(responseCovidReport);
        return response as IResponse;
    }
    const responseCovidReports = await axios.get(
        `https://covid-api.com/api/reports/total?date=${date}`
    );
    const response = isResponseValid(responseCovidReports.data.data);
    return response as IResponse;
};

const selectAllCounters = () => {
    const counterElsList = [];
    const quartersElements = document.querySelectorAll(".w3-quarter");
    for (const quarter of quartersElements as any) {
        const counterEl = quarter.children[0].children[1];
        counterElsList.push(counterEl);
    }
    return counterElsList;
};

const fillFilterWithCountriesData = async () => {
    const { data: countriesData } = await getAllRegions();
    countriesData.sort((a: ICountriesData, b: ICountriesData) =>
        a.name < b.name ? -1 : 1
    );
    for (const { ISO, name } of countriesData as ICountriesData[]) {
        const optEl = document.createElement("option");
        optEl.value = ISO;
        optEl.textContent = name;
        filterByCountriesSelectEl.append(optEl);
    }
};

filterByCountriesSelectEl.addEventListener("change", async (event) => {
    const optionEl = event.target as HTMLOptionElement;
    const selectedCountryISO = optionEl.value;
    console.log(selectedCountryISO);
    const { active, confirmed, deaths, recovered } = await getCovidReport(
        selectedCountryISO
    );
    console.log(active);
    updateCounters(active, confirmed, deaths, recovered);
});

datePickerEl.addEventListener("change", async () => {
    const selectedCountryISO = filterByCountriesSelectEl.value;
    const { active, confirmed, deaths, recovered } = await getCovidReport(
        selectedCountryISO
    );
    updateCounters(active, confirmed, deaths, recovered);
});

const updateCounters = (
    active: string | number,
    confirmed: string | number,
    deaths: string | number,
    recovered: string | number
) => {
    const [
        activeCounter,
        confirmedCounter,
        deathsCounter,
        recoveredCounter,
    ] = selectAllCounters();
    activeCounter.innerText = active;
    confirmedCounter.innerText = confirmed;
    deathsCounter.innerText = deaths;
    recoveredCounter.innerText = recovered;
};

const initApp = async () => {
    setMaxDatePickerValue();
    const { active, confirmed, deaths, recovered } = await getCovidReport();
    updateCounters(active, confirmed, deaths, recovered);
    fillFilterWithCountriesData();
};

initApp();
