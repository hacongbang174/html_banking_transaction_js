class Customer {
    constructor(id, fullName, email, phone, address, balance, deleted) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.balance = balance;
        this.deleted = deleted;
    }
    setId = function (id) {
        this.id = id;
    }
    getId = function () {
        return this.id;
    }
    setFullName = function (fullName) {
        this.fullName = fullName;
    }
    getFullName = function () {
        return this.fullName;
    }
    setEmail = function (email) {
        this.email = email;
    }
    getEmail = function () {
        return this.email;
    }
    setPhone = function (phone) {
        this.phone = phone;
    }
    getPhone = function () {
        return this.phone;
    }
    setAddress = function (address) {
        this.address = address;
    }
    getAddress = function () {
        return this.address;
    }
    setBalance = function (balance) {
        this.balance = balance;
    }
    getBalance = function () {
        return this.balance;
    }
    setDeleted = function (deleted) {
        this.deleted = deleted;
    }
    getDeleted = function () {
        return this.deleted;
    }
}

let id = 1;
let customers = [
    new Customer(id++, 'Hà Công Bằng', 'hacongbang174@gmail.com', '0999999999', '28 Nguyễn Tri Phương', 100000000, false),
    new Customer(id++, 'Phạm Sinh Nhật', 'phamsinhnhat@gmail.com', '0888888888', '28 Nguyễn Tri Phương', 50000000, false),
    new Customer(id++, 'Trương Tiến Toàn', 'truongtientoan@gmail.com', '0777777777', '28 Nguyễn Tri Phương', 50000000, false)
];

let tbody = $('#tbCustomer tbody');
let select = $('#recipients select')
function renderCustomer(obj) {
    return `<tr id='tr_${obj.id}'>
            <td>${obj.id}</td>
            <td>${obj.fullName}</td>
            <td>${obj.email}</td>
            <td>${obj.phone}</td>
            <td>${obj.address}</td>
            <td>${obj.balance}</td>
            <td class="text-center">                    
                <button class='btn btn-outline-secondary deposit' data-id='${obj.id}'>
                    <i class="fa-solid fa-circle-plus"></i>
                </button>
                <button class='btn btn-outline-success withdraw' data-id='${obj.id}'>
                    <i class="fas fa-minus-circle"></i> 
                </button>
                <button class='btn btn-outline-warning transfer' data-id='${obj.id}'>
                    <i class="fas fa-exchange-alt"></i>
                </button>
                <button class='btn btn-outline-primary edit' data-id='${obj.id}'>
                    <i class="fas fa-user-edit"></i>
                </button>
                <button class='btn btn-outline-danger delete' data-id='${obj.id}'>\
                    <i class="fas fa-ban"></i>   
                </button>
            </td>
        </tr>`
        ;
}


function getAllCustomers() {
    customers.forEach((customer) => {
        let str = renderCustomer(customer);
        tbody.prepend(str);
    });
    addEventCreate();
    addEventEdit();
    addEventDelete();
    addEventDeposit();
    addEventWithdraw();
    addEventTransfer();
}
getAllCustomers();



function getCustomerById(customerId) {
    return customers.find(item => item.id == customerId);
}

function addEventCreate() {
    $('.create').on('click', function () {
        $('#fullNameCr').val();
        $('#emailCr').val();
        $('#phoneCr').val();
        $('#addressCr').val();
        $('#mdCreate').modal('show');
    });
}


function addEventDeposit() {
    $('.deposit').on('click', function () {
        customerId = $(this).data('id');
        let customer = getCustomerById(customerId);
        if (customer) {
            $('#fullNameDepo').val(customer.fullName);
            $('#emailDepo').val(customer.email);
            $('#phoneDepo').val(customer.phone);
            $('#addressDepo').val(customer.address);
            $('#amountDepo').val();
            $('#mdDeposit').modal('show');
        }
    });
}

function addEventWithdraw() {
    $('.withdraw').on('click', function () {
        customerId = $(this).data('id');
        let customer = getCustomerById(customerId);
        if (customer) {
            $('#fullNameWd').val(customer.fullName);
            $('#emailWd').val(customer.email);
            $('#phoneWd').val(customer.phone);
            $('#addressWd').val(customer.address);
            $('#amountWd').val();
            $('#mdWithdraw').modal('show');
        }
    });
}

function addEventTransfer() {
    $('.withdraw').on('click', function () {
        customerId = $(this).data('id');
        let customer = getCustomerById(customerId);
        if (customer) {
            $('#fullNameWd').val(customer.fullName);
            $('#emailWd').val(customer.email);
            $('#phoneWd').val(customer.phone);
            $('#addressWd').val(customer.address);
            $('#amountWd').val();
            $('#mdWithdraw').modal('show');
        }
    });
}

function addEventEdit() {
    $('.edit').on('click', function () {
        customerId = $(this).data('id');
        let customer = getCustomerById(customerId);
        if (customer) {
            $('#fullNameUp').val(customer.fullName);
            $('#emailUp').val(customer.email);
            $('#phoneUp').val(customer.phone);
            $('#addressUp').val(customer.address);
            $('#mdUpdate').modal('show');
        }
    });
}
function addEventDelete() {
    $('.delete').on('click', function () {
        customerId = $(this).data('id');
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085D6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                customers = customers.filter(item => item.id != customerId);
                $('#tr_' + customerId).remove();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    })
}

function handleCreateCustomer(obj) {
    return new Promise((resolve) => {
        const customer = {
            id: obj.id,
            fullName: obj.fullName,
            email: obj.email,
            phone: obj.phone,
            address: obj.address,
            balance: obj.balance,
            deleted: obj.deleted
        };

        customers.push(customer);
        resolve(customer);
    });
}

function handleUpdateCustomer(obj) {
    return new Promise((resolve, reject) => {
        const index = customers.findIndex(item => item.id === obj.id);
        if (index === -1) {
            reject(new Error('Customer not found'));
            return;
        }
        customers[index].fullName = obj.fullName;
        customers[index].email = obj.email;
        customers[index].phone = obj.phone;
        customers[index].address = obj.address;
        resolve(customers[index]);
    });
}

function handleDeposit(obj) {
    return new Promise((resolve, reject) => {
        const index = customers.findIndex(item => item.id === obj.id);
        if (index === -1) {
            reject(new Error('Customer not found'));
            return;
        }
        customers[index].fullName = obj.fullName;
        customers[index].email = obj.email;
        customers[index].phone = obj.phone;
        customers[index].address = obj.address;
        customers[index].balance = Number(customers[index].balance) + Number(obj.balance);
        resolve(customers[index]);
    });
}

function handleWithdraw(obj) {
    return new Promise((resolve, reject) => {
        const index = customers.findIndex(item => item.id === obj.id);
        if (index === -1) {
            reject(new Error('Customer not found'));
            return;
        }
        customers[index].fullName = obj.fullName;
        customers[index].email = obj.email;
        customers[index].phone = obj.phone;
        customers[index].address = obj.address;
        customers[index].balance = Number(customers[index].balance) - Number(obj.balance);
        if(Number(customers[index].balance) - Number(obj.balance) < 0) {
            reject(new Error('Số dư không đủ'));
            return;
        }
        resolve(customers[index]);
    });
}


$('#btnCreate').on('click', () => {
    let fullName = $('#fullNameCr').val();
    let email = $('#emailCr').val();
    let phone = $('#phoneCr').val();
    let address = $('#addressCr').val();
    let balance = 0;
    let deleted = false;
    let customer = {
        id,
        fullName,
        email,
        phone,
        address,
        balance,
        deleted
    };
    ++id;
    console.log(customer);
    handleCreateCustomer(customer)
        .then((createdCustomer) => {
            let str = renderCustomer(createdCustomer);
            $('#tbCustomer tbody').prepend(str);
            addEventCreate();
            addEventEdit();
            addEventDelete();
            addEventDeposit();
            $('#mdCreate').modal('hide');
        })
        .catch((error) => {
            console.error(error);
        });
});

$('#btnDeposit').on('click', () => {
    let fullName = $('#fullNameDepo').val();
    let email = $('#emailDepo').val();
    let phone = $('#phoneDepo').val();
    let address = $('#addressDepo').val();
    let balance = $('#amountDepo').val();
    let deleted = false;
    let customer = {
        id: customerId,
        fullName,
        email,
        phone,
        address,
        balance,
        deleted
    }

    handleDeposit(customer).then((data) => {
        let str = renderCustomer(data);
        $('#tr_' + customerId).replaceWith(str);
        addEventCreate();
        addEventEdit();
        addEventDelete();
        addEventDeposit();
        $('#mdDeposit').modal('hide');
    })
        .catch((error) => {
            console.log(error);
        });
});

$('#btnWithdraw').on('click', () => {
    let fullName = $('#fullNameWd').val();
    let email = $('#emailWd').val();
    let phone = $('#phoneWd').val();
    let address = $('#addressWd').val();
    let balance = $('#amountWd').val();
    let deleted = false;
    let customer = {
        id: customerId,
        fullName,
        email,
        phone,
        address,
        balance,
        deleted
    }

    handleWithdraw(customer).then((data) => {
        let str = renderCustomer(data);
        $('#tr_' + customerId).replaceWith(str);
        addEventCreate();
        addEventEdit();
        addEventDelete();
        addEventDeposit();
        $('#mdWithdraw').modal('hide');
    })
        .catch((error) => {
            console.log(error);
        });
});

$('#btnUpdate').on('click', () => {
    let fullName = $('#fullNameUp').val();
    let email = $('#emailUp').val();
    let phone = $('#phoneUp').val();
    let address = $('#addressUp').val();
    let balance = 0;
    let deleted = false;
    let customer = {
        id: customerId,
        fullName,
        email,
        phone,
        address,
        balance,
        deleted
    }
    handleUpdateCustomer(customer).then((data) => {
        let str = renderCustomer(data);
        $('#tr_' + customerId).replaceWith(str);
        addEventCreate();
        addEventEdit();
        addEventDelete();
        addEventDeposit();
        $('#mdUpdate').modal('hide');
    })
        .catch((error) => {
            console.log(error);
        });
});

