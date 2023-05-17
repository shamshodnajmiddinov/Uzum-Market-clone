import axios, { Axios } from "axios"

import { formatCurrency } from "../utils"

const userId = JSON.parse(localStorage.getItem("user"))

let Footer = document.querySelector("footer")
let place_footer = Footer.querySelector(".container")
import { footer } from "/modules/footer"
import { header } from "./header"
import { renderFavorites } from "./likes"

const place_header = document.querySelector(".place_header")
footer(place_footer)

let saveds = []

export function productReload(arr, place) {
  if (place) {
    place.innerHTML = ""
  }
  for (let item of arr) {
    let product = document.createElement("div")

    let product_img = document.createElement("div")
    let img_product = document.createElement("img")

    let product_info = document.createElement("div")
    let product_title = document.createElement("p")
    let price = document.createElement("div")
    let product_sale = document.createElement("p")
    let product_price = document.createElement("p")
    let cart_img_box = document.createElement("div")
    let cart_img = document.createElement("img")
    let product_price_box = document.createElement("div")
    let likes = document.createElement("div")
    let like = document.createElement("img")

    let rey_box = document.createElement("div")
    let rey_text = document.createElement("p")
    let rey_img = document.createElement("img")

    let product_sale_inc = document.createElement("div")
    let text_sale = document.createElement("p")

    let credit = document.createElement("div")
    let credit_price = document.createElement("p")

    rey_img.src = "/public/img/logo/raiting.png"
    if (item.salePercentage !== 0) {
      product_img.append(product_sale_inc)
    }

    likes.classList.add("likes")
    credit_price.classList.add("credit_price")
    credit.classList.add("credit")
    rey_text.classList.add("rey_text")
    rey_box.classList.add("rey_box")
    product.classList.add("product")
    product_img.classList.add("product_img")
    img_product.classList.add("img_product")
    product_info.classList.add("product_info")
    product_title.classList.add("product_title")
    price.classList.add("price")
    product_sale.classList.add("product_sale")
    product_price.classList.add("product_price")
    cart_img_box.classList.add("cart_img_box")
    cart_img.classList.add("cart_img")
    product_sale_inc.classList.add("product_sale_inc")
    text_sale.classList.add("text_sale")

    text_sale.innerHTML = "Акция"
    product_title.innerText = item.title
    product_sale.innerText = `${formatCurrency(1000)}сум`
    product_price.innerText = `${formatCurrency(item.price)}сум`
    img_product.src = item.media[0]
    cart_img.src = "/public/img/logo/cart.png"
    let credit_for = item.price / 3

    credit_price.innerHTML = `${Math.round(credit_for)}${"сум,мес"}`
    rey_text.innerHTML = item.rating
    like.src = "/public/img/logo/likes.svg"

    likes.append(like)
    product_sale_inc.append(text_sale)
    rey_box.append(rey_img, rey_text)
    credit.append(credit_price)
    cart_img_box.append(cart_img)
    price.append(product_price_box, cart_img_box)
    product_price_box.append(rey_box, credit, product_sale, product_price)
    product_img.append(img_product)
    product_info.append(product_title, price)
    product.append(likes, product_img, product_info)

    if (place) {
      place.append(product)
    }

    product_img.onclick = () => {
      saveds.push(item.id)
      localStorage.setItem("ids", JSON.stringify(saveds))
      location.assign("/pages/pageProduct.html")
    }
    cart_img.onclick = async () => {
      if (userId) {
        const user = await axios.get(`http://localhost:3000/users/${userId}`)
        if (user.data.cart.includes(item.id)) {
          await axios.patch(`http://localhost:3000/users/${userId}`, {
            cart: user.data.cart.filter((i) => i !== item.id)
          })
        } else {
          await axios.patch(`http://localhost:3000/users/${userId}`, {
            cart: [...user.data.cart, item.id]
          })
        }

        header(place_header)
        if (item.salePercentage !== 0) {
          let sale_pro = item.salePercentage / 100
          let total_sale = Math.round(item.price * sale_pro)
          product_sale.innerText = `${formatCurrency(total_sale)}${'сум'}`
        } 
      }else {
        alert('Войдите в свой аккаунт')
      }
    }



    likes.onclick = async () => {
      if (userId) {
        const user = await axios.get(`http://localhost:3000/users/${userId}`)
        console.log(user);

        // Check if exists, if so then we remove by filtering
        if (user.data.favoride.includes(item.id)) {
          like.src = "/public/img/logo/likes.svg"
          await axios.patch(`http://localhost:3000/users/${userId}`, {
            favoride: user.data.favoride.filter((i) => i !== item.id)

          })
        } else {
          like.src = "/public/img/logo/likeds.png"

          await axios.patch(`http://localhost:3000/users/${userId}`, {
            favoride: [...user.data.favoride, item.id]
          })
        }

        renderFavorites()
      } else {
        alert('Войдите в свой аккаунт')
      }
    }
  }
}

let loc = document.querySelector(".place_lenght")
