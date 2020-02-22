function UserBuilder(session) {
  class User {
    constructor() {
      this.id = null;
      this.privilege = null;

      this.synchronize();
    }

    synchronize() {
      this.id = session.uid;
      this.privilege = session.data.privilege;
    }

    getUser() {
      return {
        id: this.id,
        privilege: this.privilege
      }
    }

    async logout() {
      await session.remove();
      this.synchronize();
    }

    async login(id, privilege) {
      let data = {
        privilege
      };

      await session.create(id, data);
      this.synchronize();
    }
  }

  return new User();
}

module.exports = new Proxy(UserBuilder, {
  construct: (target, args) => {
    return target(...args);
  }
});