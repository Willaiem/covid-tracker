const filterByCountriesSelectEl = document.getElementById("countries-filter");
const currentDayDummy = "03";

const getAllRegions = async () => {
    const response = await axios.get("https://covid-api.com/api/regions");
    return response.data;
};

const getCovidTotalReportByDate = async () => {
    const { currentDay, currentMonth, currentYear } = getDate();

    const responseCovidReports = await axios.get(
        `https://covid-api.com/api/reports/total?date=${currentYear}-${currentMonth}-${currentDayDummy}`
    );
    // console.log("response data: ", responseCovidReports.data.data);
    // console.log("current date: ", currentDay, currentMonth, currentYear);
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

const getCovidReportByCountryAndDate = async (countryISO) => {
    const { day, month, year } = getDate();

    const responseCovidReport = await axios.get(
        `https://covid-api.com/api/reports?date=${day}-${month}-${year}&iso=${countryISO}`
    );
    return responseCovidReport.data.data;
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
    filterByCountriesSelectEl.addEventListener("click", (event) => {
        console.log(event.target.value);
    });
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
};

initApp();
