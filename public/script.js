async function shorten() {
  const longUrl = document.getElementById("longUrl").value;

  if (!longUrl) {
    alert("Please enter a URL");
    return;
  }

  const res = await fetch("/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ originalUrl: longUrl })
  });

  const data = await res.json();

  document.getElementById("result").innerHTML =
    `<a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
}
