import { header } from "./header"
import { productReload } from "./products"
import axios from "axios"

import { footer } from "/modules/footer"
let Footer = document.querySelector('footer')
let place_footer = Footer.querySelector('.container')

const goods = await axios.get("http://localhost:3000/goods/")



let place_header = document.querySelector('.place_header')
let side_bar_item = document.querySelector('.side_bar_item')
let products_grid = document.querySelector(".products_grid_side ")
let inp_from = document.querySelector(".inp_from")
let inp_to = document.querySelector(".inp_to")
header(place_header)
let arrs = [];

axios.get('http://localhost:3000/goods')
    .then(res => res.data.filter(item => {
        if (!arrs.includes(item.type)) {
            arrs.push(item.type)
            sideReload(arrs, side_bar_item)
        }
    }))


axios.get('http://localhost:3000/goods')
    .then(res => productReload(res.data, products_grid))



function sideReload(arr, place) {
    place.innerHTML = ""
    for (let item of arr) {
        let btns = document.createElement("button")
        btns.innerHTML = item
        place.append(btns)
        btns.onclick = () => {
            axios.get('http://localhost:3000/goods')
                .then(res => productReload(res.data.filter(item => item.type === btns.innerHTML), products_grid))
        }
    }

}



inp_to.addEventListener("keydown", (e) => {
    const filtered = goods.data.filter((item) => {
        let str = item.price.toString()
        return str.includes(e.target.value)
    })
    productReload(filtered, products_grid)
})

