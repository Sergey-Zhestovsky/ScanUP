let dbAPI = require("../db/API"),
  serverAnswer = require("../modules/serverAnswer");

class PrivilegeController {
  static async switch(privilegeId, config, response) {
    try {
      let privilegeIndex = (await dbAPI.privilege.getPrivilegeById(privilegeId)).index;

      for (let index in config) {
        if (privilegeIndex === index)
          return config[index]();
      }

      return response.send(serverAnswer(serverAnswer.ERRORS.PRIVILEGE__BLOCKED));
    } catch (error) {
      return response.send(serverAnswer(error));
    }
  }
}

module.exports = PrivilegeController;