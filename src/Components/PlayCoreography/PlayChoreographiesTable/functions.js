export const   milisToMinutesAndSeconds = (mil) => {
  let minutes = Math.floor(mil / 60000);
  let seconds = ((mil % 60000) / 1000).toFixed(0);
  let secondsOfSum = Math.floor(Number(minutes) * 60 + Number(seconds));
  return secondsOfSum;
};

export const   getCore = (corall) => {
  return corall.map((res) => {
    const date = new Date(res.updatedAt).toLocaleDateString();
    return { ...res, date };
  });
};