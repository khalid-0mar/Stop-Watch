const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "https://simply-delicious-food.com/wp-content/uploads/2019/07/Buttermilk-pancakes-4.jpg",
    desc: `Fluffy buttermilk pancakes served warm with butter. A breakfast classic, served with syrup and blueberry toppings. `,
  },

  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "https://www.lipstiq.com/wp-content/uploads/2017/07/milo3.jpg",
    desc: `Rich and creamy milkshake available in classic flavors: vanilla, chocolate, or strawberry. A timeless treat!`,
  },

  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "https://timesofindia.indiatimes.com/thumb/msid-70223814,width-1200,height-900,resizemode-4/.jpg",
    desc: `Two eggs cooked to order, served with toast and your choice of bacon(Halal) or sausage(Halal). A hearty start to your day. `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "https://images.eatthismuch.com/site_media/img/971403_tabitharwheeler_21276d22-69c2-49ec-9abd-6ae2bf363895.jpg",
    desc: `Indulgent Oreo milkshake blended with creamy vanilla ice cream and topped with whipped cream and cookie crumbles`,
  },
  {
    id: 7,
    title: "Full English",
    category: "breakfast",
    price: 8.99,
    img: "https://web.aw.ca/i/items/?i=classic-bacon-eggs&d=classic-bacon-eggs&cat=breakfast&lang=classic-bacon-eggs-en",
    desc: `Classic Full English Breakfast with eggs, crispy bacon(Halal), baked beans, and toast. A satisfying start to your morning `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "https://www.saga.co.uk/contentlibrary/saga/publishing/verticals/food/recipes/healthy-eating-for-lower-cholesterol/classic-american-burger-137819186-1280.jpg",
    desc: `Juicy American classic cheeseburger with melted cheddar, lettuce, tomato, and pickles on a toasted bun  `,
  },
  {
    id: 9,
    title: "Caramel Shake",
    category: "shakes",
    price: 16.99,
    img: "https://cdn.vox-cdn.com/thumbor/b6GzlDBxS09CfyLspwwtHW_mW1U=/0x0:5545x3697/1200x800/filters:focal(1734x1384:2620x2270)/cdn.vox-cdn.com/uploads/chorus_image/image/66615155/GettyImages_1214958468.0.jpg",
    desc: `Smooth caramel shake blended with rich vanilla ice cream, topped with caramel drizzle`,
  },
];

const sectionCenter = document.querySelector(".section-center");
const container = document.querySelector(".btn-container");

window.addEventListener("DOMContentLoaded", function () {
  displayMenuItems(menu);
  displayMenuButtons();
});

function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    return `<article class="menu-item">
              <img src=${item.img} class="photo" alt=${item.title} />
              <div class="item-info">
                <header>
                  <h4>${item.title}</h4>
                  <h4 class="price">$${item.price}</h4>
                </header>
                <p class="item-text">${item.desc}</p>
              </div>
            </article>`;
  });
  displayMenu = displayMenu.join("");
  sectionCenter.innerHTML = displayMenu;
}

function displayMenuButtons() {
  const categories = menu.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }

      return values;
    },
    ["all"]
  );
  const categoryBtn = categories
    .map(function (category) {
      return `<button class="filter-btn" type="button" data-id=${category}>${category}</button>`;
    })
    .join("");
  container.innerHTML = categoryBtn;
  const filtersBtn = document.querySelectorAll(".filter-btn");

  filtersBtn.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      const menuCategory = menu.filter(function (menuItem) {
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      if (category === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
}
