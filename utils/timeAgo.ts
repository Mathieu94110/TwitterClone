export const timeAgo = (date: string) => {
  const seconds: number = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  let year = Math.floor(seconds / 31536000);
  if (year >= 1) {
    return year === 1 ? "Il y a 1 an" : `Il y a ${year} ans`;
  }

  let month = Math.floor(seconds / 2592000);
  if (month >= 1) {
    return "Il y a " + month + " mois";
  }

  let day = Math.floor(seconds / 86400);
  if (day >= 1) {
    return day === 1 ? "Il y a 1 jour" : `Il y a ${day} jours`;
  }

  let hour = Math.floor(seconds / 3600);
  if (hour >= 1) {
    return hour === 1 ? "Il y a 1 heure" : `Il y a ${hour} heures`;
  }

  let minute = Math.floor(seconds / 60);
  if (minute >= 1) {
    return minute === 1 ? "Il y a 1 minute" : `Il y a ${minute} minutes`;
  }

  if (seconds < 10) return "à l'instant";

  return "Il y a " + Math.floor(seconds) + " secondes";
};
