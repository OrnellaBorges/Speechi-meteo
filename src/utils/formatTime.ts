// Convertir un timestamp en une heure au format "19h"
export function formatTimestampToHour(timestamp: number) {
  // Créer une nouvelle instance de Date à partir du timestamp
  const date = new Date(timestamp * 1000); // *1000 car le timestamp est en secondes
  //console.log("date", date);

  // Obtenir l'heure et les minutes de la date
  const hour = date.getHours();

  // Construire l'heure au format "19h"
  const formattedHour = `${hour}h`;

  return formattedHour;
}

export function formatCurrentDate() {
  const currentTimestamp = Date.now();
  console.log("timestamp", currentTimestamp);

  const currentDate = new Date(currentTimestamp);
  console.log("currentDate", currentDate);

  /* const weekDays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]; */
  /*     const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
  ]; */
  //const currentWeekDay = weekDays[currentDate.getDay()];
  const currentWeekDay2 = currentDate.toLocaleString("en-US", {
    weekday: "long",
  });
  // console.log("currentWeekDay", currentWeekDay);

  const currentMonth = currentDate.toLocaleString("en-US", {
    month: "short",
  });
  const dayNumber = currentDate.getDate();

  const dateOfTheDay = `${currentWeekDay2}, ${dayNumber} ${currentMonth}`;

  return dateOfTheDay;
}
