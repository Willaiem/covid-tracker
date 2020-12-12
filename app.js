const filterByCountriesSelectEl = document.getElementById("countries-filter");
const datePickerEl = document.getElementById("date-picker");

const setMaxDatePickerValue = () => {
    const { day, month, year } = getCurrentDate();
    const convertedDay = correctDateNumbers(day - 1);
    const convertedMonth = convertToDateNum(month);
    const date = `${year}-${convertedMonth}-${convertedDay}`;
    datePickerEl.max = date;
    datePickerEl.value = date;
};

const correctDateNumbers = (number) => {
    return number <= 10 ? "0" + --number : number;
};

const convertToDateNum = (number) => {
    return number <= 10 ? "0" + number : number;
};

const getAllRegions = async () => {
    const response = await axios.get("https://covid-api.com/api/regions");
    return response.data;
};

const getCovidTotalReportByDate = async () => {
    // const { day, month, year } = getCurrentDate();
    // const convertedDay = convertToDateNum(day - 1);
    // const convertedMonth = convertToDateNum(month);
    const date = datePickerEl.value;

    const responseCovidReports = await axios.get(
        `https://covid-api.com/api/reports/total?date=${date}`
    );
    // console.log("response data: ", responseCovidReports.data.data);
    // console.log("current date: ", day, month, year);
    return responseCovidReports.data.data;
};

const getCurrentDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    return new Object({ day, month, year });
};

const getCovidReportByCountryAndDate = async (countryISO) => {
    const date = datePickerEl.value;

    const responseCovidReport = await axios.get(
        `https://covid-api.com/api/reports?date=${date}&iso=${countryISO}`
    );
    console.log(responseCovidReport);
    return responseCovidReport.data.data[0];
};

const selectAllCounters = () => {
    const counterElsList = [];
    const quartersElements = document.querySelectorAll(".w3-quarter");
    for (const quarter of quartersElements) {
        const counterEl = quarter.children[0].children[1];
        counterElsList.push(counterEl);
    }
    return counterElsList;
};

const fillFilterWithCountriesData = async () => {
    const { data: countriesData } = await getAllRegions();
    countriesData.sort((a, b) => (a.name < b.name ? -1 : 1));
    for (const { iso, name } of countriesData) {
        const optEl = document.createElement("option");
        optEl.value = iso;
        optEl.textContent = name;
        filterByCountriesSelectEl.append(optEl);
    }
};

filterByCountriesSelectEl.addEventListener("click", async (event) => {
    const selectedCountryISO = event.target.value;
    console.log(selectedCountryISO);
    const {
        active,
        confirmed,
        deaths,
        recovered,
    } = await getCovidReportByCountryAndDate(selectedCountryISO);
    console.log(active);
    updateCounters(active, confirmed, deaths, recovered);
});

const updateCounters = (active, confirmed, deaths, recovered) => {
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
    const {
        active,
        confirmed,
        date,
        deaths,
        recovered,
    } = await getCovidTotalReportByDate();
    updateCounters(active, confirmed, deaths, recovered);
    fillFilterWithCountriesData();
};

initApp();
