const getCurrentCovidTotalReport = async () => {
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

const selectAllCounters = () => {
    const counterElsList = [];
    const quartersElements = document.querySelectorAll(".w3-quarter");
    for (const quarter of quartersElements) {
        counterElsList.push(quarter.children[0].children[1]);
    }
    return counterElsList;
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
    } = await getCurrentCovidTotalReport();
    activeCounter.innerText = active;
    confirmedCounter.innerText = confirmed;
    deathsCounter.innerText = deaths;
    recoveredCounter.innerText = recovered;
};

initApp();
