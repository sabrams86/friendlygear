var db = require('./../models');
var Validator = require('./../lib/validator');
var bcrypt = require('bcryptjs');

var findAllUsers = function () {
  return db.Users.find({});
}

var findOneUser = function (userId) {
  return db.Users.findById(userId);
}
var createUser = function (user) {
  var date = new Date();
  date = date.toString();
  var password = bcrypt.hashSync(user.password, 8);
  return db.Users.create({
    username: user.username,
    password: password,
    email: user.email,
    city: user.city,
    state: user.state,
    zip: user.zip,
    dateJoined: date,
    name: user.name,
    avatarUrl: user.avatarUrl
  });
}

var updateUser = function(user, password) {
  if(bcrypt.compareSync(user.password, password)){
    return db.Users.findByIdAndUpdate(user._id, {
      username: user.username,
      city: user.city,
      state: user.state,
      zip: user.zip,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl
    });
  }
}

var validateUser = function (user) {
  return new Promise(function (success, failure) {
    var validate = new Validator;
    validate.exists(user.username, 'Username cannot be blank');
    validate.exists(user.email, 'Email cannot be blank');
    validate.exists(user.name, 'Name cannot be blank');
    validate.exists(user.zip, 'Zipcode cannot be blank');
    validate.exists(user.city, 'City cannot be blank');
    validate.exists(user.state, 'State cannot be blank');
    validate.exists(user.password, 'Please enter a password');
    validate.password(user.password, user.passwordconfirm, 'Passwords do not match');
    if(validate._errors.length > 0) {
      failure(validate._errors);
    } else {
      success();
    }
  });
}

var validateUserUpdate = function (user) {
  return new Promise(function (success, failure) {
    var validate = new Validator;
    validate.exists(user.username, 'Username cannot be blank');
    validate.exists(user.email, 'Email cannot be blank');
    validate.exists(user.name, 'Name cannot be blank');
    validate.exists(user.zip, 'Zipcode cannot be blank');
    validate.exists(user.city, 'City cannot be blank');
    validate.exists(user.state, 'State cannot be blank');
    validate.exists(user.password, 'Please enter a password');
    if(validate._errors.length > 0) {
      failure(validate._errors);
    } else {
      success();
    }
  });
}

var removeItemsByUser = function (userId) {
  return db.Items.remove({userId: userId});
}

var removeContractsByUser = function (userId) {
  return db.Contracts.remove({$or: [{sellerId: userId}, {buyerId: userId}]});
}

var removeUser = function (userId) {
  return db.Users.findByIdAndRemove(userId);
}
var findUserByUserName = function (username) {
  return db.Users.findOne({username: username});
}
var categoryQuery = function (query) {
  return db.Items.find(query);
}
var getCategories = function () {
  return db.Categories.find({});
}
var createCategory = function (name, parent) {
  return db.Categories.create({name: name, parent: parent});
}
var validateCategory = function (category) {
  return new Promise(function (success, failure) {
    var validate = new Validator;
    validate.exists(category, 'Please enter a category');
    if(validate._errors.length > 0) {
      failure(validate._errors);
    } else {
      success();
    }
  });
}
var validateItem = function (item) {
  return new Promise(function (success, failure) {
    var validate = new Validator;
    var categories = item.categories.split(',');
    categories.pop();
    validate.exists(item.name, 'Please add a name for this piece of gear');
    validate.exists(item.description, 'Description cannot be blank');
    validate.exists(item.datePurchased, 'Please estimate how old the item is');
    validate.exists(item.condition, 'Condition cannot be blank');
    if(validate._errors.length > 0){
      failure(validate._errors);
    } else {
      success();
    }
  })
}

var createItem = function (item, user) {
  var categories = item.categories.split(',');
  categories.pop();
  return db.Items.create({
    name: item.name,
    description: item.description,
    brand: item.brand,
    datePurchased: item.datePurchased,
    condition: item.condition,
    categories: categories,
    imageUrl: item.imageUrl,
    userId: user
  });
}

var removeContractsByItem = function (item) {
  return db.Contracts.remove({itemId: item});
}
var removeItem = function (item) {
  return db.Items.findByIdAndRemove(item);
}

var getContract = function (contractId) {
  return db.Contracts.findById(contractId);
}
var getItem = function (itemId) {
  return db.Items.findById(itemId);
}
var setUserRole = function (contract, user) {
  var userInfo = {}
  if( contract === user){
    userInfo.role = 'Renter';
  } else {
    userInfo.role = 'Owner';
  }
  return userInfo;
}

var approveContract = function (contract) {
  return db.Contracts.findByIdAndUpdate(contract, { status: 'approved'});
}

var removeContract = function (contract) {
  return db.Contracts.findByIdAndRemove(contract);
}

var validateContract = function (contract, user) {
  return new Promise(function (success, failure) {
    var validate = new Validator;
    if (!user) {
      validate._errors.push('You must be logged in to do that');
    }
    validate.exists(contract.startDate, 'Please enter a start date');
    validate.exists(contract.endDate, 'Please enter an end date');
    if(validate._errors.length > 0){
      failure(validate._errors);
    } else {
      success();
    }
  })
}

var createContract = function (contract, user, locals) {
  return db.Contracts.create({
    itemId: locals.item_id,
    buyerId: user,
    sellerId: locals.owner_id,
    startDate: contract.startDate,
    endDate: contract.endDate,
    status: 'pending'
  });
}

var updateContract = function (contractId, contract) {
  return db.Contracts.findByIdAndUpdate(contractId, {
    startDate: contract.endDate,
    endDate: contract.endDate
  });
}

var getItemCategories = function (item) {
  return db.Categories.find({_id: {$in: item.categories}});
}

var makeCategoryList = function (userCategories) {
  var categorylist = '';
  userCategories.forEach(function (e) {
    categorylist += (e._id + ',');
  });
  return categorylist;
}

var updateItem = function (itemId, item, categories) {
  return db.Items.findByIdAndUpdate(itemId, {
    name: item.name,
    description: item.description,
    brand: item.brand,
    datePurchased: item.datePurchased,
    condition: item.condition,
    imageUrl: item.imageUrl,
    categories: categories,
  });
}

var getItemsByUser = function (user) {
  return db.Items.find({userId: user});
}

var getContractsByUser = function (userId) {
  return db.Contracts.find({$or: [{sellerId: userId}, {buyerId: userId}]});
}

var getUserContractItems = function (contracts) {
  var itemIds = contracts.map(function (e) {
    return e.itemId;
  })
  return db.Items.find({_id: {$in: itemIds}});
}

var sortUserContracts = function (contracts, rentalItems, user) {
  var sellerContracts = [];
  var buyerContracts = [];
  contracts.forEach(function (contract) {
    if(contract.sellerId === user) {
      rentalItems.forEach(function (rentalItem) {
        if (rentalItem._id.toString() === contract.itemId){
          contract.item = rentalItem;
        }
      })
      sellerContracts.push(contract);
    } else {
      rentalItems.forEach(function (rentalItem) {
        if (rentalItem._id.toString() === contract.itemId) {
          contract.item = rentalItem;
        }
      })
      buyerContracts.push(contract);
    }
  })
  return [buyerContracts, sellerContracts];
}

module.exports.findAllUsers = findAllUsers;
module.exports.findOneUser = findOneUser;
module.exports.findUserByUserName = findUserByUserName;
module.exports.validateUser = validateUser;
module.exports.validateUserUpdate = validateUserUpdate;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.removeUser = removeUser;

module.exports.removeItemsByUser = removeItemsByUser;
module.exports.categoryQuery = categoryQuery;
module.exports.getCategories = getCategories;
module.exports.createCategory = createCategory;
module.exports.validateCategory = validateCategory;

module.exports.createItem = createItem;
module.exports.getItem = getItem;
module.exports.getItemsByUser = getItemsByUser;
module.exports.validateItem = validateItem;
module.exports.removeItem = removeItem;
module.exports.getItemCategories = getItemCategories;
module.exports.updateItem = updateItem;
module.exports.sortUserContracts = sortUserContracts;
module.exports.getContractsByUser = getContractsByUser;
module.exports.getUserContractItems = getUserContractItems;
module.exports.makeCategoryList = makeCategoryList;

module.exports.getContract = getContract;
module.exports.removeContractsByUser = removeContractsByUser;
module.exports.removeContractsByItem = removeContractsByItem;
module.exports.approveContract = approveContract;
module.exports.setUserRole = setUserRole;
module.exports.removeContract = removeContract;
module.exports.validateContract = validateContract;
module.exports.createContract = createContract;
module.exports.updateContract = updateContract;
