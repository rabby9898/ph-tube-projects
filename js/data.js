let videoData = [];
const loadCategoryData = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();
  const categoryData = data.data;

  displayCategory(categoryData);
};
/********** Category Button **********/
const displayCategory = (categoryData) => {
  const categoryElement = document.getElementById("category-btn");

  categoryData.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button
            onclick="handleCategory('${category.category_id}')"
            class="btn btn-ghost bg-[#D2D4D7] text-xs md:text-base capitalize mr-4 hover:bg-[#FF1F3D] hover:text-white active:bg-[#FF1F3D] focus:outline-none focus:bg-[#FF1F3D]"
          >
            ${category.category}
          </button>
    `;
    categoryElement.appendChild(div);
  });
};
/********** Load DAta **********/
const loadVideoData = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  videoData = data.data;
  displayVideoData(videoData);
};

/********** Show Data function **********/
const displayVideoData = (videoData) => {
  const cardAreaElement = document.getElementById("card-area");
  cardAreaElement.innerHTML = "";

  if (videoData.length === 0) {
    noDataFound();
    return;
  }

  videoData.forEach((item) => {
    let totalSeconds = item.others.posted_date;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const div = document.createElement("div");
    div.classList = `card w-full md:w-[280px] lg:w-96 bg-base-100 shadow-xl my-6`;

    div.innerHTML = `
        <figure>
            <img
              class="w-full h-64 relative"
                src=${item.thumbnail}
            />
            <p class="text-[10px] md:text-sm border-[#171717] rounded p-1 text-white absolute top-48 left-52 md:top-48 md:left-40 lg:left-64 ${
              totalSeconds ? "bg-[#171717]" : ""
            }">${totalSeconds ? `${hours}hrs ${minutes}min ago` : ""}</p>
        </figure>
        <div class="card-body">
            <h2 class="card-title">${item.title}</h2>
            <div class="flex items-center">
              <img
              class="rounded-full w-14 h-14 mr-3"
                  src=${item.authors[0].profile_picture}
              />
              <p>${item.authors[0].profile_name} ${
      item.authors[0].verified
        ? `<img class="inline-block" src="/images/fi_10629607.png" alt="Verified Icon" />`
        : ""
    }</p>
            </div>
            <p class="ml-16">${item.others.views} views</p>
        </div>
      `;
    cardAreaElement.appendChild(div);
  });
  clearData();
};
/********** Sort Descending by views **********/
const handleSortByNum = () => {
  const sortVideoData = videoData.sort(
    (a, b) => parseFloat(b.others.views) - parseFloat(a.others.views)
  );
  console.log(sortVideoData);
  displayVideoData(sortVideoData);
};

/********** No Data Found Area Function **********/
const noDataFound = () => {
  const noDataArea = document.getElementById("no-data");
  noDataArea.innerHTML = "";
  const div = document.createElement("div");
  div.classList = `text-center`;
  div.innerHTML = `
    <img
      class="text-center mx-auto"
      src='/images/Icon.png'
    />
    <h1 class="text-black font-semibold text-4xl text-center mt-3">Oops!! Sorry, There is no <br> content here</h1>
    `;
  noDataArea.appendChild(div);
};
/********** Clear Data **********/
const clearData = () => {
  const noDataArea = document.getElementById("no-data");
  noDataArea.innerHTML = "";
};

const handleCategory = (id) => {
  loadVideoData(id);
};
handleBlogBtn = () => {
  window.location.href = "blog.html";
};

loadCategoryData();
loadVideoData("1000");
