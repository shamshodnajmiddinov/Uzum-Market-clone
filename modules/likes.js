import axios from "axios"

import { footer } from "./footer"
import { productReload } from "./products"
import { header } from "./header"

const userId = JSON.parse(localStorage.getItem("user"))


let Footer = document.querySelector("footer")
let place_footer = Footer.querySelector(".container")

let products_grid = document.querySelector("#liked_products_grid")
let place_header = document.querySelector(".place_header")
let img_box = document.querySelector(".none_img_box")
let title = document.querySelector(".title")


header(place_header)

export async function renderFavorites() {


  const goods = await axios("http://localhost:3000/goods")

  if (userId) {
    const user = await axios.get(`http://localhost:3000/users/${userId}`)
    if (user.data.favoride.length > 0) {
      let none = document.querySelector(".none")

      const product = []

      if (none) {
        none.style.display = "none"
      }
      for (const id of user.data.favoride) {
        product.push(goods.data.find((i) => i.id === id))
      }

      productReload(product, products_grid)
    } else {
      if (products_grid) {
        products_grid.innerHTML = ""
      }


      if (userId) {
        const user = await axios.get(`http://localhost:3000/users/${userId}`)
        if (user.data.favoride.length == 0) {
          let div = document.createElement("div")
          let img = document.createElement("img")
          img.src = "/public/img/notLikeds.png"
          div.classList.add("liked_box")
          div.append(img)
          if(img_box) {
            img_box.append(div)
          }
        }
      }

    }


    let none = document.querySelector(".none")

    if (none) {
      none.style.display = "block"
    }

  } else {


    if (title) {
      title.style.display = "none"
    }
  }

}

renderFavorites()
