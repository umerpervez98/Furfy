class LocalStorage {
  // Static method
  static getOrder = () => {
    const data = localStorage.getItem('scOrder');
    const order =
      data === null
        ? { orderConfirmation: null, submitState: null }
        : JSON.parse(data);
    return order;
  };

  static getUserLoggedIn = () => {
    const scLoggedIn = localStorage.getItem('scLoggedIn');

    return !!scLoggedIn ? true : false;
  };
}

export default LocalStorage;
