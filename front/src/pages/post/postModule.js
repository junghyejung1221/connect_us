export const formatDate = (date) => {
  const dateArr = date.substring(0, 10).split("-");
  const year = dateArr[0];
  const month = parseInt(dateArr[1]);
  const day = parseInt(dateArr[2]);

  return `${year}년 ${month}월 ${day}일`;
};
