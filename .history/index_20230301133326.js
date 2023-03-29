const getData = fetch("http://localhost:5000/api/user?limit=3&page=2")
  .then((data) => data.json())
  .then((data) => {
    console.log(data);
  });
