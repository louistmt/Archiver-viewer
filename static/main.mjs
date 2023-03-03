const cdnPath = location.pathname.replace("/viewer/", "");

const jsonRequest = await fetch(`/api/${cdnPath}`);
const jsonData = await jsonRequest.json();