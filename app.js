const getCovidTotalReportByDate = async () => {
    const getCurrentISODate = new Date().toISOString();
    const currentYear = getCurrentISODate.slice(0, 4);
    const currentMonth = getCurrentISODate.slice(5, 7);
    // const currentDay = getCurrentISODate.slice(8, 10);
    const currentDay = "03";

    const responseCovidReports = await axios.get(
        `https://covid-api.com/api/reports/total?date=${currentYear}-${currentMonth}-${currentDay}`
    );
    console.log("response data: ", responseCovidReports.data.data);
    console.log("current date: ", currentDay, currentMonth, currentYear);
    return responseCovidReports.data.data;
};

const getDate = (date) => {
    const getCurrentISODate = date
        ? new Date(date).toISOString()
        : new Date().toISOString();
    const currentYear = getCurrentISODate.slice(0, 4);
    const currentMonth = getCurrentISODate.slice(5, 7);
    const currentDay = getCurrentISODate.slice(8, 10);
    return new Object({ currentDay, currentMonth, currentYear });
};

const getCovidReportByCountryAndDate = async (ISO, countryName) => {};

const selectAllCounters = () => {
    const counterElsList = [];
    const quartersElements = document.querySelectorAll(".w3-quarter");
    for (const quarter of quartersElements) {
        counterElsList.push(quarter.children[0].children[1]);
    }
    return counterElsList;
};

const getAllRegions = async () => {
    const response = await axios.get("https://covid-api.com/api/regions");
    return response.data;
};

const fillFilterWithCountriesData = async () => {
    const filterByCountriesSelectEl = document.getElementById(
        "countries-filter"
    );
    const { data: countriesData } = await getAllRegions();
    countriesData.sort((a, b) => (a.name < b.name ? -1 : 1));
    for (const { iso, name } of countriesData) {
        const optEl = document.createElement("option");
        optEl.value = iso;
        optEl.textContent = name;
        filterByCountriesSelectEl.append(optEl);
    }
};

const initApp = async () => {
    const [
        activeCounter,
        confirmedCounter,
        deathsCounter,
        recoveredCounter,
    ] = selectAllCounters();
    const {
        active,
        confirmed,
        date,
        deaths,
        recovered,
    } = await getCovidTotalReportByDate();
    activeCounter.innerText = active;
    confirmedCounter.innerText = confirmed;
    deathsCounter.innerText = deaths;
    recoveredCounter.innerText = recovered;
    fillFilterWithCountriesData();
    console.log(getDate());
};

initApp();
