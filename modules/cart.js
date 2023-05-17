import { productReload } from "./products"
import { header } from "./header"
import axios from "axios"
import { formatCurrency } from "../utils"

const userId = JSON.parse(localStorage.getItem("user"))

let products_grid = document.querySelector(".products_grid")
let place_header = document.querySelector(".place_header")
let cart_box = document.querySelector(".cart_box")
let cart_item = cart_box.querySelector(".item")
let price_product = document.querySelector(".price_product")
let total = document.querySelector(".total")
let products = document.querySelector(".products")
let img_box = document.querySelector(".none_img_box")
let sale_product = document.querySelector('.sale_product')
header(place_header)

let product = []
let prices = []

const productQuantity = {}

async function init() {
  const user = await axios(`http://localhost:3000/users/${userId}`)
  const goods = await axios("http://localhost:3000/goods")

  product = []

  if (user.data.cart.length > 0) {
    for (const id of user.data.cart) {
      product.push(goods.data.find((item) => item.id === id))
    }
  } else {
    products.style.display = "none "
  }

  calculatePrice()
  cartReload(product, cart_item)
}

init()

const calculatePrice = () => {
  let sum = 0

  for (const p of product) {
    if (p.id in productQuantity) {
      sum += p.price * productQuantity[p.id]
    } else {
      sum += p.price
    }
  }

  price_product.innerHTML = `${formatCurrency(sum)}сум`
}

async function cartReload(arr, place) {
  place.innerHTML = ""
  const user = await axios(`http://localhost:3000/users/${userId}`)

  for (let item of arr) {
    let elem = document.createElement("div")
    let img_box = document.createElement("div")
    let img = document.createElement("img")
    let description = document.createElement("div")
    let title = document.createElement("div")
    let price = document.createElement("div")

    let counter = document.createElement("div")
    let counter_minus = document.createElement("button")
    let counter_display = document.createElement("h2")
    let counter_plus = document.createElement("button")

    let delete_btns = document.createElement("div")
    let del = document.createElement("button")

    img.src = item.media?.[0]
    counter_minus.innerText = "-"
    counter_plus.innerText = "+"
    del.innerText = "Удалить"
    price.innerText = `${formatCurrency(item.price)} Сум`

    title.innerText = item.title

    total.innerHTML = `${"Итого товаров:"} ${product.length}`

    img_box.append(img)
    description.append(title, price, counter, delete_btns)
    counter.append(counter_minus, counter_display, counter_plus)
    delete_btns.append(del)
    elem.append(img_box, description)

    elem.classList.add("elem")
    img_box.classList.add("img_box")
    description.classList.add("description")
    title.classList.add("title")
    price.classList.add("price")

    counter.classList.add("counter")
    counter_minus.classList.add("counter-minus")
    counter_display.classList.add("counter-display")
    counter_plus.classList.add("counter-plus")
    delete_btns.classList.add("delete_btns")
    del.classList.add("del")

    del.onclick = async () => {
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        cart: user.data.cart.filter((i) => i !== item.id)
      })

      init()
      header(place_header)

      delete productQuantity[item.id]
    }

    if (!prices.includes(item.price)) {
      prices.push(item.price)
    }

    let count = 1
    updateDisplay()

    productQuantity[item.id] = count
    let all = 0
    let allSale = 0
    counter_plus.addEventListener("click", () => {
      count++
      updateDisplay()
      productQuantity[item.id] = count
      all = item.price * item.salePercentage / 100
      allSale += Math.round(all)
      sale_product.innerHTML = `Итого Скидок: ${formatCurrency(Math.round(allSale))} Сум`
      calculatePrice()
    })
    counter_minus.addEventListener("click", () => {
      if (count > 1) {
        count--
        allSale -= Math.round(all)
        sale_product.innerHTML = `Итого Скидок: ${formatCurrency(Math.round(allSale))} Сум`
      }
      updateDisplay()
      productQuantity[item.id] = count
      calculatePrice()
    })

    function updateDisplay() {
      counter_display.innerHTML = count
    }

    place.append(elem)
  }
}
