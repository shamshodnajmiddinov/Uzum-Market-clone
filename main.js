import { header } from "/modules/header"
import { productReload } from "/modules/products"
import axios from "axios"
import { footer } from "./modules/footer"
import { formatCurrency } from "./utils"

let product_section = document.querySelector(".products2")
let products_grid = document.querySelector(".products_grid")
let product_grid2 = product_section.querySelector(".products_grid")
let products3 = document.querySelector(".products3")
let product_grid3 = products3.querySelector(".products_grid")
let Footer = document.querySelector("footer")
let place_footer = Footer.querySelector(".container")
let wrapper = document.querySelector('.swiper-wrapper')

console.log(product_grid2)

axios.get("http://localhost:3000/goods").then((res) =>
  productReload(
    res.data.filter((item) => item.type === "PC"),
    products_grid
  )
)

axios.get("http://localhost:3000/goods").then((res) =>
  productReload(
    res.data.filter((item) => item.type === "furniture"),
    product_grid2
  )
)

axios.get("http://localhost:3000/goods").then((res) =>
  productReload(
    res.data.filter((item) => item.type === "audio"),
    product_grid3
  )
)

axios.get("http://localhost:3000/goods").then((res) => sliderReload(res.data.filter(i => i.isBlackFriday === true)))


const place_header = document.querySelector(".place_header")

footer(place_footer)
header(place_header)



function sliderReload(arr) {
  for (let item of arr) {
    wrapper.innerHTML += `
  <div class="swiper-slide">
            <div id="slider" class=" swiper-slide slider_row">
              <div class="slider_item">
                <h2>
                  ${item.title}
                </h2>
                <h3>
                  Самая лучшая Цена
                </h3>

                <div class="slider_btn">
                  <h4 class="slider_price">${formatCurrency(item.price)}Сум</h4>
                </div>

              </div>
              <div class="slider_item">
                <img src="${item.media[0]}" alt="">
              </div>

            </div>
          </div>
          `
  }
}




var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  }
});