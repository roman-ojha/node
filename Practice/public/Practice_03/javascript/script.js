console.log("hello");

const fetchData = async () => {
  try {
    const res = await fetch("http://localhost:8080/randomApi", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    let putData = "";
    for (let key in data) {
      putData = putData + `<li>${key}=${data[key]}<li>`;
    }
    document.querySelector("#appendData").innerHTML = putData;
  } catch (err) {
    console.log(err);
  }
};

fetchData();
