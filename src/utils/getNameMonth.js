function getNameMonth(number) {
  const date = new Date(String(number));
  let monthName = date.toLocaleString('default', { month: 'long' });
  monthName = monthName[0].toLocaleUpperCase() + monthName.slice(1);

  return monthName;
}

export default getNameMonth;
