const isArrayToObjectPojo = (variable) => {
  try {
    if (Array.isArray(variable)) {
      let stringify = JSON.stringify(variable)
      let parsed = JSON.parse(stringify)
      return parsed[0];
    };
    if (!Array.isArray(variable)) {
      let stringify = JSON.stringify(variable)
      let parsed = JSON.parse(stringify)
      return parsed;
    };
  } catch (err) {
    throw new Error({ message: `${variable} no es un parametro válido para esta funcion` })
  }
};

const objetcToPOJO = (variable) => {
  try {
    if (Array.isArray(variable)) {
      let stringify = JSON.stringify(variable)
      let parsed = JSON.parse(stringify)
      return parsed[0];
    };
    if (!Array.isArray(variable)) {
      let stringify = JSON.stringify(variable)
      let parsed = JSON.parse(stringify)
      return parsed;
    };
  } catch (err) {
    throw new Error({ message: `${variable} no es un parametro válido para esta funcion` })
  }
};

const arrayToPOJO = (variable) => {
  try {
    if (Array.isArray(variable)) {
      let stringify = JSON.stringify(variable)
      let parsed = JSON.parse(stringify)
      return parsed;
    };
    if (!Array.isArray(variable)) {
      let stringify = JSON.stringify(variable)
      let parsed = JSON.parse(stringify)
      return parsed;
    };
  } catch (err) {
    throw new Error({ message: `${variable} no es un parametro válido para esta funcion` })
  }
};

const arrayOrObjectToPOJO = (variable) => {
  if (Array.isArray(variable)) {
    let stringify = JSON.stringify(variable)
    let parsed = JSON.parse(stringify)
    return parsed.map((ele) => ele);
  } else {
    return variable;
  }
};


module.exports = { arrayOrObjectToPOJO, arrayToPOJO, objetcToPOJO, isArrayToObjectPojo};