const LOCALE = 'en-GB';

export function formatDate(date: Date): string {
  return Intl.DateTimeFormat(LOCALE, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function parseISOString(str: string) {
  const b = str.split(/\D+/);
  const restOfB = b.splice(3);

  return new Date(
    Date.UTC(
      parseInt(b[0]),
      parseInt(b[1]) - 1,
      parseInt(b[2]) - 1,
      ...restOfB.map((numberString) => parseInt(numberString))
    )
  );
}

function addDays(date: Date, days: number) {
  const newDate = date;
  newDate.setDate(date.getDate() + days);
  return newDate;
}

export function getDateArray(startDate: Date, endDate: Date, interval: number) {
  interval = interval || 1;

  const retVal = [];
  let current = new Date(startDate);

  while (current <= endDate) {
    retVal.push(new Date(current));
    current = addDays(current, interval);
  }

  return retVal;
}
