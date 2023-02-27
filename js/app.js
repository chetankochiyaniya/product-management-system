"use strict";

// variable declaration
const productAdded = document.getElementById('submitBtn');
let productDetails = [];
const inputName = document.getElementById('inputName');
const inputDescription = document.getElementById('inputDescription');
const inputPrice = document.getElementById('inputPrice');
const inputImage = document.getElementById('inputImage');

if (localStorage.getItem('addProduct') != null) {
    productDetails = JSON.parse(localStorage.getItem('addProduct'));
}

// number of raw show in table 
const numOfRaw = document.getElementById('pageSize')
let num = 0;
numOfRaw.addEventListener('change',()=>{
    num = numOfRaw.options[numOfRaw.selectedIndex].value
    getProduct();
})

//add product
const addProduct = () => {
    const pName = inputName.value;
    const pDescription = inputDescription.value;
    const pPrice = inputPrice.value;
    const pImage = inputImage;

    if (!pName) {
        alert('Please enter product name');
        return;
    }
    if (!pDescription) {
        alert('Please enter product description');
        return;
    }
    if (!pPrice) {
        alert('Please enter product price');
        return;
    }
    if (!pImage.value) {
        alert('Please select image');
        return;
    }
    const reader = new FileReader();
    const size =
        (pImage.files[0].size / 1024 / 1024).toFixed(2);
    if (size > 0.5) {
        alert('Image size should be less than 500kb');
        return;
    }
    reader.readAsDataURL(pImage.files[0]);
    reader.addEventListener('load', () => {
        productDetails.push(
            {
                pName: pName,
                pDescription: pDescription,
                pPrice: pPrice,
                pImage: reader.result
            }
        );

        try {
            localStorage.setItem('addProduct', JSON.stringify(productDetails));
            getProduct();
        }
        catch (err) {
            alert("Storage full!! Please remove some products from your List.");
            getProduct();
        }
        inputName.value = "";
        inputDescription.value = "";
        inputPrice.value = "";
        inputImage.value = "";
    })
    document.querySelector('#close').click();
}

//delete product
function deleteProduct(index) {
    if (confirm('Are you sure you want to delete?')) {
        productDetails.splice(index, 1);
        localStorage.setItem('addProduct', JSON.stringify(productDetails));
        getProduct();
    } else {
        return;
    }
}

// set edit product data
function productInfo(index) {
    document.getElementById('updateName').value = productDetails[index].pName;
    document.getElementById('updateDescription').value = productDetails[index].pDescription;
    document.getElementById('updatePrice').value = productDetails[index].pPrice;
    document.getElementById('viewImage').innerHTML = `
    <img src="${productDetails[index].pImage}" class="img img-fluid"></img>`;
    document.getElementById('updateBtn').onclick = () => {
        updateData(index);
    }
}

// edit product
function updateData(index) {
    const pName = document.getElementById('updateName').value;
    const pDescription = document.getElementById('updateDescription').value;
    const pPrice = document.getElementById('updatePrice').value;
    const pImage = document.getElementById('updateImage');
    if (pName === "" || pDescription === "" || pPrice === "") {
        alert('Please enter value for product');
        return 0;
    } else {
        productDetails[index].pName = pName;
        productDetails[index].pDescription = pDescription;
        productDetails[index].pPrice = pPrice;
        const reader = new FileReader();
        if (pImage.value !== "") {
            reader.readAsDataURL(pImage.files[0]);
            reader.addEventListener('load', () => {
                productDetails[index].pImage = reader.result;
                localStorage.setItem('addProduct', JSON.stringify(productDetails));
                getProduct();
            });
        }
        localStorage.setItem('addProduct', JSON.stringify(productDetails));
        getProduct();
        alert(`Product Updated`);
    }
    document.querySelector('#closeBtn').click();
}

//view product data
function view_product(index) {
    localStorage.setItem('ind',index)
    document.getElementById('vId').innerHTML = index + 1;
    document.getElementById('vName').innerHTML = productDetails[index].pName;
    document.getElementById('vDescription').innerHTML = productDetails[index].pDescription;
    document.getElementById('vPrice').innerHTML = productDetails[index].pPrice;
    document.getElementById('vImage').innerHTML = `
    <img src="${productDetails[index].pImage}" class="img img-fluid"></img>`;
}

// get product whole data
let productData = document.getElementById('productData');
let checkProduct = document.getElementById('checkProduct');

// get product whole data
function getProduct() {
    productData.innerHTML = "";
    if(productDetails.length == 0){
      checkProduct.innerHTML = "Records not available"
    }else{
      checkProduct.innerHTML = ""
    }
    productDetails.forEach((data, index) => {
        if(num!=0 && index+1>num){
            return productDetails.innerHTML
        }
            productData.innerHTML += `
        <tr>
            <td scope="row">${index + 1}</td>
            <td class="nameCol">${data.pName}</td>
            <td class="descCol">${data.pDescription}</td>
            <td class="priceCol">${data.pPrice}</td>
            <td class="imgCol"><img src="${data.pImage}" height=auto width=100px></img></td>
            <td class="btnCol">
                 <button  type="button" class="btn editBtn"  data-bs-toggle="modal" data-bs-target="#productView"  data-bs-whatever="update" onclick="productInfo(${index})">
                 <i class="fa fa-pencil-square-o"></i>
                </button>
            </td>
            <td class="btnCol">
                <button type="button" class="btn delBtn" onclick="deleteProduct(${index})">
                <i class="fa fa-trash-o"></i>
                </button>
            </td>
            <td>
            <button class="btn_color d-flex"  data-bs-toggle="modal" data-bs-target="#vProduct" onclick="view_product(${index})">View</button>
            </td>
        </tr>`
    });
}

const table = document.getElementById("displayTable");
const n = ['1','2','3','4','5','6','7','8','9','0']

// filter data
const filterData = () => {
    const input = document.getElementById("sortInput");
    const filter = input.value.toUpperCase();
    if(n.includes(filter.charAt(0))){
      const tr = table.querySelectorAll("tr");
      for (let i = 0; i < tr.length; i++) {
         let td = tr[i].querySelectorAll("td")[0];
          if (td) {
            let  txtValue = td.textContent || td.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  tr[i].style.display = "";
              } else {
                  tr[i].style.display = "none";
              }
          }
      }
    }
    else{
      const tr = table.querySelectorAll("tr");
    for (let i = 0; i < tr.length; i++) {
       let td = tr[i].querySelectorAll("td")[1];
        if (td) {
           let txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    }
    
}

// debounce function implementation
function debounceFunc(fn, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn();
        }, delay);
    }

}

// searching 
const searchProduct = debounceFunc(filterData, 800);

//sorting the data
function sortData(column) {
    var rows, switching, i, row1, row2, shouldSwitch, dir, switchcount = 0;

    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            row1 = rows[i].getElementsByTagName("TD")[column];
            row2 = rows[i + 1].getElementsByTagName("TD")[column];

            if (dir == "asc") {
                if (column == 3 || column == 0) {
                    if (Number(row1.innerHTML) > Number(row2.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (row1.innerHTML.toLowerCase() > row2.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if (dir == "desc") {
                if (column == 3 || column == 0) {
                    if (Number(row1.innerHTML) < Number(row2.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {

                    if (row1.innerHTML.toLowerCase() < row2.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }

}

// to set data in table
getProduct();
