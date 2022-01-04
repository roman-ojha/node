const form = document.getElementById("vote-form");
var event;

// submitting the data to the server
form.addEventListener("submit", (e) => {
  const choice = document.querySelector("input[name=os]:checked").value;
  const data = { os: choice };
  fetch("http://localhost:8080/poll", {
    method: "post",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  e.preventDefault();
});

// getting the data while refresshing and also enable pusher feature inside it
fetch("http://localhost:8080/poll")
  .then((res) => res.json())
  .then((data) => {
    let votes = data.votes;
    let totalVotes = votes.length;
    document.querySelector(
      "#chartTitle"
    ).textContent = `Total Votes: ${totalVotes}`;

    let voteCounts = {
      Windows: 0,
      MacOS: 0,
      Linux: 0,
      Other: 0,
    };

    voteCounts = votes.reduce(
      (acc, vote) => (
        (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc
      ),
      {}
    );
    let dataPoints = [
      { label: "Windows", y: voteCounts.Windows },
      { label: "MacOS", y: voteCounts.MacOS },
      { label: "Linux", y: voteCounts.Linux },
      { label: "Other", y: voteCounts.Other },
    ];

    const chartContainer = document.querySelector("#chartContainer");

    if (chartContainer) {
      // Listen for the event.
      document.addEventListener("votesAdded", function (e) {
        document.querySelector(
          "#chartTitle"
        ).textContent = `Total Votes: ${e.detail.totalVotes}`;
      });

      const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "theme1",
        data: [
          {
            type: "column",
            dataPoints: dataPoints,
          },
        ],
      });
      chart.render();
      // pusher ===============================================================
      // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;
      // this feature is us for the console and not include in production level
      var pusher = new Pusher("58e9a2d176893d3cc58d", {
        cluster: "ap2",
        encrypted: true,
      });

      var channel = pusher.subscribe("os-poll");
      // here we are subscribing by the exact name which is at the backend
      channel.bind("os-vote", function (data) {
        // and here we are hendling the event comming after trigger
        // here in data we will get the data easily an we will update that data to the frontend
        dataPoints.forEach((point) => {
          if (point.label == data.os) {
            point.y += data.points;
            totalVotes += data.points;
            event = new CustomEvent("votesAdded", {
              detail: { totalVotes: totalVotes },
            });
            // Dispatch the event.
            document.dispatchEvent(event);
          }
        });
        chart.render();
      });
    }
  });
