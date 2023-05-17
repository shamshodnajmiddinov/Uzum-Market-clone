import { header } from "/modules/header"
import axios from "axios"
import { footer } from "/modules/footer"
import { productReload } from "./products";
import { formatCurrency } from "../utils";


let locDatalikes = JSON.parse(localStorage.getItem("likeds"));
let locDataCarts = JSON.parse(localStorage.getItem('cartitems'))
let locData = JSON.parse(localStorage.getItem('ids'))
let products_grid = document.querySelector(".products_grid")


let Footer = document.querySelector('footer')
let place_footer = Footer.querySelector('.container')




let place_header = document.querySelector('.place_header')
let item1 = document.querySelector('.item1')
let page_img = document.querySelector('.page_img')
let title = document.querySelector('#title')
let description = document.querySelector(".description")
let sub_title = document.querySelector("#sub_title")
let price = document.querySelector(".prices")
let product_sale = document.querySelector('.product_sale')
product_sale.classList.add('product_sale')
let carts = document.querySelector('.carts')
let likes = document.querySelector('.likes')
let counterDisplayElem = document.querySelector('.counter-display');
let counterMinusElem = document.querySelector('.counter-minus');
let counterPlusElem = document.querySelector('.counter-plus');

let count = 1;
let sale_pro = 0;



let saveds = []
let cart = [];
let liked = [];

header(place_header)


if (locData) {
    for (let ID of locData) {
        axios.get('http://localhost:3000/goods')
            .then(res => res.data.filter(item => {
                if (item.id === ID) {
                    let product = []
                    let same_products = []
                    product.push(item)
                    infoProduct(product)
                    axios.get('http://localhost:3000/goods')
                        .then(res => res.data.filter(i => {
                            if (i.type === item.type) {
                                if (!same_products.includes(i)) {
                                    same_products.push(i)
                                }
                                productReload(same_products.slice(0, 4), products_grid)
                            }
                        }))
                }
            }))
    }
}
console.log(sub_title);



function infoProduct(arr) {

    for (let i of arr) {
        page_img.src = i.media[0]
        title.innerHTML = i.title
        description.innerHTML = i.description
        sub_title.innerHTML = i.description
        price.innerHTML = `${formatCurrency(i.price)} Сум`


        carts.onclick = () => {
            if (!cart.includes(i.id)) {
                cart.push(i.id)
                localStorage.setItem("cartitems", JSON.stringify(cart));
            } else (
                alert('Этот тавар уже имеется')
            )
        }

        likes.onclick = () => {
            if (!liked.includes(i.id)) {
                liked.push(i.id)
                localStorage.setItem("likeds", JSON.stringify(liked));
            } else (
                alert('Этот тавар уже имеется в Избранном')
            )
        }


        if (i.salePercentage !== 0) {
            sale_pro = i.salePercentage / 100
            sale_pro = Math.round(i.price * sale_pro)
            product_sale.innerText = `${formatCurrency(sale_pro)} Сум`
        }
        for (let element of i.media) {
            let div = document.createElement('div')
            let img = document.createElement('img')
            div.classList.add('elem')
            img.src = element
            div.append(img)
            item1.append(div)
            img.onclick = () => {
                page_img.src = img.src
            }
        }
        let totaSale = i.price * sale_pro
        let total = i.price
        updateDisplay();
        counterPlusElem.addEventListener("click", () => {
            total += i.price
            count++
            let cur = formatCurrency(total)

            sale_pro = i.salePercentage / 100
            sale_pro = Math.round(total * sale_pro)
            product_sale.innerText = `${formatCurrency(sale_pro)} Сум`
            price.innerHTML = `${cur} Сум`
            updateDisplay();
        });

        counterMinusElem.addEventListener("click", () => {
            if (total !== i.price) {
                count--
                total -= i.price
                sale_pro = i.salePercentage / 100
                sale_pro = i.salePercentage / 100
                sale_pro = Math.round(total * sale_pro)
                product_sale.innerText = `${formatCurrency(sale_pro)} Сум`
                let cur = formatCurrency(total)
                price.innerHTML = `${cur} Сум`
            }
            updateDisplay();
        });

        function updateDisplay() {
            counterDisplayElem.innerHTML = count;
        };

    }

}





