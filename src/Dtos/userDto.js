class UserDto {
    constructor(user) {
      this._id = user._id;
      this.cart = user.cart;
      this.nombre = user.nombre;
      this.email = user.email;
      this.age = user.age;
      this.phone = user.phone;
      this.adress = user.adress;
      this.thumbnail = user.thumbnail;
      this.admin = user.admin;
    }
};

const userDto = (users) => {   
  if (Array.isArray(users)) {
    return users.map((user) => new UserDto(user));
  } else {
    return new UserDto(users);
  }
};

module.exports = {userDto}
