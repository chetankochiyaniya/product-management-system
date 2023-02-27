const home = `
<h1 class="d-flex justify-content-center text-white mt-3 mb-5">Product Management System</h1>
<div class="container rounded-4 p-2 px-lg-0 px-sm-2 px-md-1">
    <div class="row d-flex">
      <div class="d-flex justify-content-end">
        <button class="btn_color p-lg-2 p-md-2 p-sm-2 xsm d-flex" data-bs-toggle="modal" data-bs-target="#productAdd"><i class="fa fa-plus fa-change" aria-hidden="true"></i>
         Add new Product</button>
      </div>
    </div>
  </div>
  <div class="container card rounded-4 p-3 mb-5">
    <div class="table-responsive">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-lg-6">
        <!--<h4>Product List </h4>-->
          <label>Show &nbsp;</label>
          <select id="pageSize">
            <option value="0">n</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <label> &nbsp;Entries</label> 
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 d-inline-flex justify-content-end jcs">
          <div class="form-group d-inline-flex align-items-center">
            <label class="d-inline-flex align-items-center">Search:
              <pre> </pre>
            </label>
            <input class="input-group form-control" type="text" placeholder="Search by id or name..."
              id="sortInput" onkeyup="searchProduct()" style="color: black" />
          </div>
        </div>
      </div>
      <table id="displayTable" class="table table-responsive table-hover">
                    <thead>
                        <tr>
                            <th scope="col" onclick="sortData(0)">Id <svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z" />
                            </svg>
                            </th>
                            <th scope="col" onclick="sortData(1)">Name <svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z" />
                            </svg>
                            </th>
                            <th scope="col" width="35%">Description</th>
                            <th scope="col" onclick="sortData(3)">Price <svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z" />
                            </svg>
                            </th>
                            <th scope="col">Image</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="productData" class="table-group-divider ">
                    </tbody>
                </table>
                <p class="d-flex justify-content-center" id="checkProduct"></p>
    </div>
    <div class="modal fade" id="productAdd" tabindex="-1" aria-labelledby="updateProduct" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="updateProduct">Product Information</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="addProductForm">
                        <div class="row mb-3">
                            <label for="inputName" class="col-sm-3 col-form-label">Name</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="inputName">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputDescription" class="col-sm-3 col-form-label">Description</label>
                            <div class="col-sm-9">
                                <textarea class="form-control" id="inputDescription" rows="3"></textarea>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputPrice" class="col-sm-3 col-form-label">Price</label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control" id="inputPrice">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputImage" class="col-sm-3 col-form-label">Image</label>
                            <div class="col-sm-9">
                                <input type="file" class="form-control" id="inputImage"
                                    accept="image/x-png,image/gif,image/jpeg">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close" class="btn btn-secondary"
                        data-bs-dismiss="modal">Close</button>
                    <button type="submit" data-toggle="toast" data-target="#toast1" class="btn btn-primary"
                        onclick="addProduct()">Add Product</button>
                </div>
            </div>
        </div>
        </div>

    <div class="modal fade" id="productView" tabindex="-1" aria-labelledby="updateProduct" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="updateProduct">Edit Product</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="updateProductForm">
                        <div class="row mb-3">
                            <label for="inputName" class="col-sm-3 col-form-label">Name</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="updateName">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputDescription" class="col-sm-3 col-form-label">Description</label>
                            <div class="col-sm-9">
                                <textarea class="form-control" id="updateDescription" rows="3"></textarea>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputPrice" class="col-sm-3 col-form-label">Price</label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control" id="updatePrice">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputImage" class="col-sm-3 col-form-label">Image</label>
                            <div class="col-sm-9">
                                <input type="file" class="form-control" id="updateImage"
                                    accept="image/x-png,image/gif,image/jpeg">
                            </div>
                        </div>
                    </form>
                    <div id="viewImage">

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="closeBtn" class="btn btn-secondary"
                        data-bs-dismiss="modal">Close</button>
                    <button type="button" data-toggle="toast" data-target="#toast2" class="btn btn-primary"
                        id="updateBtn">Save Changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="vProduct" tabindex="-1" aria-labelledby="vProduct" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="vProduct">Product Information</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div class="d-flex"> 
                <label><b>Product ID&nbsp;:&nbsp;</b></label>
                <div id="vId"></div>
                </div>
                <div class="d-flex"> 
                <label><b>Product Name&nbsp;:&nbsp;</b></label>
                <div id="vName"></div>
                </div>
                <hr>
                <div class="d-flex"> 
                <label><b>Description&nbsp;:&nbsp;</b></label>
                <div id="vDescription"></div>
                </div>
                <hr>
                <div class="d-flex"> 
                <label><b>Price&nbsp;:&nbsp;</b></label>
                <div class="d-flex align-items-center"><i class="fa fa-inr" style="font-zise:15px" aria-hidden="true"></i>&nbsp;
                <div id="vPrice"></div></div>
                </div>
                <hr>
                <div id="vImage"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="closeBtn" class="btn btn-secondary"
                        data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
`