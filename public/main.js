let currentSlideIndex = 0; // Global variable to keep track of the current slide
let slideTimer; // Global variable for the slideshow timer

/**
 * This function fetches the duration and name array form the server.
 * @returns the imgData (containing the duration and name of files
 * from the server.
 */
async function fetchImageData() {
  try {
    const response = await fetch("/image-data");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching image data:", error);
  }
}

/**
 * This is the fuction that creates the dynanmi HTML slides.
 * @param {*} imageName Name of the image being shown in slider.
 * @param {*} duration Duration in seconds for which the image would be shown.
 * @param {*} YOUR_WEBSITE_LINK This is the website link that you want to fetch and show.
 * @returns
 */
function createSlide(imageName, duration, YOUR_WEBSITE_LINK) {
  const slide = document.createElement("div");
  slide.className = "slide";

  console.log(duration);

  if (imageName.toLowerCase() === "calendar") {
    // Add logic to handle 'calendar' case (e.g., load a website)
    slide.innerHTML = `<iframe src="${YOUR_WEBSITE_LINK}" frameborder="0" style="height:100%; width:100%"></iframe>`;
  } else {
    slide.style.background = `url('./images/${imageName}') no-repeat center center/cover`;
  }

  slide.dataset.duration = duration;
  return slide;
}

/**
 * This Function starts the Slider container in the front-end
 */
async function initSlider() {
  const imageData = await fetchImageData();
  const slider = document.querySelector(".slider");
  const YOUR_WEBSITE_LINK =
    "https://calendar.google.com/calendar/u/0/embed?mode=WEEK&height=600&wkst=1&bgcolor=%23ffffff&ctz=America/New_York&src=YmlsbGVvbkBnbWFpbC5jb20&src=Z3J0anVrN3JwdDdpYm45bmQzZWV1YjM1OGtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986CB&color=%23D81B60&pli=1";

  slider.innerHTML = "";
  for (const [imageName, duration] of imageData) {
    const slide = createSlide(imageName, duration, YOUR_WEBSITE_LINK);
    slider.appendChild(slide);
  }

  updateSlides(); // Update slides NodeList
  setupButtons(); // Set up button event listeners
  startSlideShow(); // Start the automatic slideshow
}

/**
 * This is the function that updates slides as required.
 * Especially required for the button functions.
 */
function updateSlides() {
  // Update slides NodeList and set the first slide as current
  const slides = document.querySelectorAll(".slider .slide");
  slides.forEach((slide, index) => {
    slide.classList.remove("current");
    if (index === currentSlideIndex) {
      slide.classList.add("current");
    }
  });
}

/**
 * This initiates the slideshow
 */
function startSlideShow() {
  const slides = document.querySelectorAll(".slider .slide");

  if (slideTimer) {
    clearTimeout(slideTimer); // Clear existing timer if any
  }

  slideTimer = setTimeout(() => {
    changeSlide(1); // Move to the next slide
    startSlideShow(); // Set the timer for the next slide
  }, slides[currentSlideIndex].dataset.duration * 1000);
}

/**
 * These are controllers for the previous and next buttons.
 */
function setupButtons() {
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  prevButton.addEventListener("click", () => {
    changeSlide(-1);
  });

  nextButton.addEventListener("click", () => {
    changeSlide(1);
  });
}

/**
 * This function controls where the previous picture
 * or the next picture is to be shown.
 * @param {*} direction Tells the app to go previous or next
 */
function changeSlide(direction) {
  // Fetch the slides NodeList dynamically
  const slides = document.querySelectorAll(".slider .slide");
  slides[currentSlideIndex].classList.remove("current");
  currentSlideIndex =
    (currentSlideIndex + direction + slides.length) % slides.length;
  slides[currentSlideIndex].classList.add("current");

  startSlideShow(); // Reset the slideshow timer
}

/**
 * Entry point to the dynanmic HTML slider.
 */
initSlider();
