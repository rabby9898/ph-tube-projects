const loadCategoryData = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();
  const categoryData = data.data;
  //   console.log(categoryData);
  displayCategory(categoryData);
};

const displayCategory = (categoryData) => {
  const categoryElement = document.getElementById("category-btn");
  categoryData.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button
            class="btn btn-ghost bg-[#D2D4D7] text-xs md:text-base capitalize mr-4 hover:bg-[#FF1F3D] active:bg-[#FF1F3D] focus:outline-none focus:bg-[#FF1F3D]"
          >
            ${category.category}
          </button>
    `;
    categoryElement.appendChild(div);
  });
};

const loadVideoData = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/1000`
  );
  const data = await res.json();
  const videoData = data.data;
  console.log(videoData);
  displayVideoData(videoData);
};

const displayVideoData = (videoData) => {
  const cardAreaElement = document.getElementById("card-area");
  videoData.forEach((item) => {
    const div = document.createElement("div");
    div.classList = `card w-full lg:w-96 bg-base-100 shadow-xl my-6`;

    div.innerHTML = `
      <figure>
          <img
            class="w-full h-64"
              src=${item.thumbnail}
          />
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
        ? '<i class="fa-solid fa-certificate text-[#2568EF] "></i>'
        : ""
    }</p>
          </div>
          <p class="ml-16">${item.others.views} views</p>
      </div>
    `;
    cardAreaElement.appendChild(div);
  });
};

loadCategoryData();
loadVideoData();
