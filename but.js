document.querySelector(".but").addEventListener("click", function () {
  document.querySelector(".ques").innerHTML =
    parseInt(document.querySelector(".ques").innerHTML) + 1;
});

document.querySelector(".clear").addEventListener("click", function () {
  document.querySelector(".ques").innerHTML = 0;
});

document.querySelector(".inpbut").addEventListener("click", function () {
  let head = document.querySelector(".head").value;
  let link = document.querySelector(".inp").value;

  // Create a link element
  const a = document.createElement("a");
  a.className = "links";
  a.innerHTML = head;
  a.setAttribute("href", link);
  a.setAttribute("target", "_blank");

  // Append the link to the document body
  document.body.appendChild(a);

  // Save the link as a stringified object in localStorage
  let linkData = {
    head: head,
    link: link,
    className: "links",
  };
  localStorage.setItem(head, JSON.stringify(linkData));
});

document.querySelector(".notinpbut").addEventListener("click", function () {
  let head = document.querySelector(".head").value;
  let link = document.querySelector(".inp").value;

  // Create a link element
  const a = document.createElement("a");
  a.className = "links red";
  a.innerHTML = head;
  a.setAttribute("href", link);
  a.setAttribute("target", "_blank");

  // Append the link to the document body
  document.body.appendChild(a);

  // Save the link as a stringified object in localStorage
  let linkData = {
    head: head,
    link: link,
    className: "links red",
  };
  localStorage.setItem(head, JSON.stringify(linkData));
});

document.querySelector(".load").addEventListener("click", function () {
  document.querySelector(".load").style.display = "none";
  let items = Object.keys(localStorage);
  console.log(items);
  items.forEach((key) => {
    try {
      // Retrieve and parse the link data
      let linkData = JSON.parse(localStorage.getItem(key));

      // Create a link element
      const a = document.createElement("a");
      a.className = linkData.className;
      a.innerHTML = linkData.head;
      a.setAttribute("href", linkData.link);
      a.setAttribute("target", "_blank");

      // Create a container div for the link and .done
      const container = document.createElement("div");
      container.className = "link-container";

      // Append the link to the container
      container.appendChild(a);

      // Append the container to the document body
      document.body.appendChild(container);

      if (a.classList.contains("red")) {
        // Add .done div to the container
        const div = document.createElement("div");
        div.className = "done";
        container.appendChild(div);
      }
    } catch (error) {
      console.error(
        "Error parsing JSON from localStorage for key:",
        key,
        error
      );
    }
  });
});

document.body.addEventListener("click", function (event) {
  if (event.target.classList.contains("done")) {
    // Get the parent element of the clicked element
    const parent = event.target.previousElementSibling;
    // Change the class name of the previous sibling element from 'red' to 'green'
    parent.classList.remove("red");
    parent.classList.add("green");

    // Update the linkData in localStorage
    let linkData = {
      head: parent.innerHTML,
      link: parent.getAttribute("href"),
      className: "links green",
    };
    localStorage.setItem(linkData.head, JSON.stringify(linkData));
  }
});

// Get all local storage keys
// useEffect(() => {
//   const keys = Object.keys(localStorage);
//   console.log(keys);
// }, [])
