// Creating DOM ELements
const imgContainer = document.getElementById("img-container");
const loader = document.querySelector(".loader");

// Global Variable
let count = 5;
const API_KEY = "YCzFJrvN1uvLOLxLPA8JbTCK2Q19Ir-Wkw0DLYo7AkU";
let API = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;
let totalImages = 0;
let imageLoad = 0;
let ready = false;

// Loads Image
const imagesLoaded = () => {
  imageLoad++;
  if (imageLoad === totalImages) {
    loader.hidden = true;
    ready = true;
    count = 30;
    API = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;
  }
};

// Helper Function to Set Attribute
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Display Photos on the DOM
const displayPhotos = function (photos) {
  totalImages = photos.length;
  imageLoad = 0;
  photos.forEach((data) => {
    // Create a  <a> Tag
    const link = document.createElement("a");

    setAttributes(link, {
      href: data.links.html,
      target: "_blank",
    });
    //   create a Img tag
    const image = document.createElement("img");

    setAttributes(image, {
      src: data.urls.regular,
      title: data.description ? data.description : "UnSplash Photo",
      alt: "Unsplash Photo",
    });

    image.addEventListener("load", imagesLoaded);
    //   Now Append img inside Link tag and
    link.appendChild(image);
    // Append Link tag inside img-Container
    imgContainer.appendChild(link);
  });
};

// Get Photos From the API
const getPhotos = async function () {
  const response = await fetch(API);
  const photos = await response.json();
  displayPhotos(photos);
};

const onLoad = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
};

// Event Handlers
window.addEventListener("scroll", onLoad);

//  on Load
getPhotos();
