/* eslint-disable @typescript-eslint/no-this-alias */
'use client';


export class ExcedePixel {
  static EventType = {
    Identify: 'identify',
    Page: 'page',
    Screen: 'screen',
    ProductSearched: 'Products Searched',
    ProductViewed: 'Product Viewed',
    ProductAdded: 'Product Added',
    ProductRemoved: 'Product Removed',
    FormClosed: 'Form Closed',
    Error: 'Error',
  };
  static ExcedeRecaptchaClientKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;
  LastSentBody = [];
  BEAddress = null;
  Client = null;
  ShopCurrency = null;
  UserId = null;
  AnonymousId = null;
  CurrentProduct = null;
  CurrentProductAllVariants = [];
  CartItems = [];
  Debug = true;
  Disabled = false;
  ClearObject() {
    this.LastSentBody = [];
    sessionStorage.clear();
    this.UserId = null;
    this.AnonymousId = null;
  }

  constructor(BEAddress) {
    var ExcedeCurrency = 'USD';
    this.LastSentBody = [];
    this.BEAddress = BEAddress;
    this.ShopCurrency = ExcedeCurrency;

    var that = this;
    this.InitIdentifier().then((identifier) => {
      if (identifier != null && identifier != '') {
        that.Log('debug', 'Anonymous ID is: ' + identifier);
        that.AnonymousId = identifier;
      } else {
        that.Log('error', 'Anonymous ID is not found');
      }
    });
  }

  SubmitFormEvent(formData, callStartedHandler, successHandler, errorHandler) {
    var debugBody = {};

    var that = this;
    this.InitIdentifier().then((identifier) => {
      formData.append('identifier', identifier);
      for (var pair of formData.entries()) {
        debugBody[pair[0]] = pair[1];
      }

      this.Log(
        'debug',
        'SubmitFormEvent: formData: ' + JSON.stringify(debugBody)
      );
      fetch(`${that.BEAddress}/recaptcha`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          callStartedHandler(response);
          if (response.ok) {
            successHandler(response);
          } else {
            errorHandler(response);
          }
        })
        .catch((error) => {
          errorHandler(error);
        });
    });
  }

  static GenerateUUID() {
    var d = new Date().getTime();
    var d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  GetUserId() {
    return this.UserId;
  }
  GetAnonymousId() {
    return this.AnonymousId;
  }

  async GetUserIpAddress() {
    var ajax = new XMLHttpRequest();
    var savedIp = '';
    try {
      savedIp = sessionStorage.getItem('ip');
    } catch (error) {
      console.error('Error getting IP from sessionStorage: ' + error);
    }

    var returnPromise = new Promise((resolve, reject) => {
      if (savedIp != null && savedIp != '') {
        setTimeout(() => {
          resolve(savedIp);
        }, 2);
      } else {
        if (ajax != null) {
          ajax.open('GET', 'https://api.ipify.org', true);
          ajax.onreadystatechange = function () {
            if (this.readyState == 4) {
              if (this.status == 200) {
                var ip = this.responseText;
                try {
                  sessionStorage.setItem('ip', ip);
                  return resolve(ip);
                } catch (error) {
                  reject('Error setting IP: ' + error);
                }
              } else {
                reject('Error getting IP');
              }
            }
          };
          ajax.send(null);
        }
      }
    });
    return returnPromise;
  }

  async GetPageInfo() {
    var toReturn = {};
    toReturn.url = window.location.href;
    toReturn.path = window.location.pathname;
    toReturn.title = document.title;
    toReturn.referrer = window.location.hostname;
    toReturn.device_info = this.GetDeviceInfo();
    try {
      var ip = await this.GetUserIpAddress();
      if (ip != null) {
        toReturn.ip = ip;
      }
    } catch (error) {
      toReturn.ip = 'error getting IP';
      this.Log('error', 'Error getting IP: ' + error);
    }

    this.Log(
      'debug',
      'GetPageInfo: returns: \n' + ExcedePixel.excedeStringify(toReturn)
    );
    return toReturn;
  }

  Log(level, message) {
    if (!this.Debug) {
      return;
    }
    if (level == 'debug') {
      console.debug(message);
    } else if (level == 'info') {
      console.info(message);
    } else if (level == 'warn') {
      console.warn(message);
    } else if (level == 'error') {
      console.error(message);
    } else {
      console.debug(message);
    }
  }

  IsMobile() {
    return isMobile.any;
  }

  GetIdentifier() {
    var that = this;
    that.Log('debug', 'GetIdentifier: called');
    var responsePromise = new Promise((resolve, reject) => {
      if (that.AnonymousId != null && that.AnonymousId != '') {
        that.Log(
          'debug',
          'GetIdentifier: Identifier found. The promise returns: ' +
          that.AnonymousId
        );
        resolve(that.AnonymousId);
      } else {
        that.Log(
          'debug',
          'GetIdentifier: Identifier not found. Going to find it: '
        );
        that
          .InitIdentifier()
          .then((identifier) => {
            that.Log(
              'debug',
              'GetIdentifier: Identifier fetched. The promise returns: ' +
              identifier
            );
            resolve(identifier);
          })
          .catch((error) => {
            that.Log(
              'error',
              'GetIdentifier: Fetch Identifier Error: ' + error
            );
            reject(error);
          });
      }
    });
    return responsePromise;
  }

  GetDeviceInfo() {
    // TODO ~ replace this function with a more reliable solution
    function findBrowser() {
      if (
        (navigator.userAgent.indexOf('Opera') ||
          navigator.userAgent.indexOf('OPR')) != -1
      ) {
        return 'Opera';
      } else if (navigator.userAgent.indexOf('Edg') != -1) {
        return 'Edge';
      } else if (navigator.userAgent.indexOf('Chrome') != -1) {
        return 'Chrome';
      } else if (navigator.userAgent.indexOf('Safari') != -1) {
        return 'Safari';
      } else if (navigator.userAgent.indexOf('Firefox') != -1) {
        return 'Firefox';
      } else if (
        navigator.userAgent.indexOf('MSIE') != -1 ||
        !!document.documentMode == true
      ) {
        //IF IE > 10
        return 'IE';
      } else {
        return 'unknown';
      }
    }

    const resolution = `${window.screen.availHeight} x ${window.screen.availWidth}`;

    const mobile = window.navigator.userAgentData.mobile;

    const isAndroid = /(android)/i.test(navigator.userAgent);

    function isiOS() {
      return (
        [
          'iPad Simulator',
          'iPhone Simulator',
          'iPod Simulator',
          'iPad',
          'iPhone',
          'iPod',
        ].includes(navigator.platform) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
      );
    }

    var toReturn = {};
    toReturn.user_agent = window.navigator.userAgent;
    toReturn.browser = findBrowser();
    toReturn.language = window.navigator.language;
    toReturn.resolution = resolution;
    toReturn.is_mobile = mobile;
    toReturn.is_android = isAndroid;
    toReturn.is_ios = isiOS();
    console.log('toReturn', toReturn);
    this.Log(
      'debug',
      'GetDeviceInfo: returns:\n' + ExcedePixel.excedeStringify(toReturn)
    );
    return toReturn;
  }
  AppendIdentifier(data, event) {
    if (this.UserId != null && this.UserId != '') {
      data['userId'] = this.UserId;
    } else if (this.AnonymousId != null && this.AnonymousId != '') {
      data['anonymousId'] = this.AnonymousId;
    }

    //for Identify event allways append anonymousId
    if (event == ExcedePixel.EventType.Identify) {
      data['anonymousId'] = this.AnonymousId;
    }
    this.Log(
      'debug',
      'Append Identifier: returns:\n' + ExcedePixel.excedeStringify(data)
    );
    return data;
  }
  InitIdentifier = function () {
    var that = this;
    //check if there is a User ID. If one is found, the existing value will be used
    var identifierPromise = new Promise((resolve, reject) => {
      that.Log('debug', 'InitIdentifier:');
      if (that.AnonymousId && that.AnonymousId != '') {
        that.Log('debug', 'InitIdentifier: returns existing anonymousId: ');
        return resolve(that.AnonymousId);
      }

      //try to set Anonymous ID from  sessionStorage
      var localId = sessionStorage.getItem('id');
      // var localId = Cookies.get("sc_session_id");

      if (localId != null && localId != '') {
        that.Log(
          'debug',
          'InitIdentifier: returns anonymousId from the existing in sessionStorage Identifier: '
        );
        that.AnonymousId = localId;
        return resolve(localId);
      }
      //Anonymous ID is not found. Try to set it as UUID
      try {
        localId = ExcedePixel.GenerateUUID();
        sessionStorage.setItem('id', localId);
        that.AnonymousId = localId;
        that.Log('debug', 'InitIdentifier: returns new anonymousId: ');
        return resolve(localId);
      } catch (error) {
        that.Log('error', 'InitIdentifier: Error: ' + error);
        return reject(error);
      }
    });
    return identifierPromise;
  };

  SendEventWithFP = async function (eventType, data) {
    var that = this;
    this.InitIdentifier().then((identifier) => {
      if (identifier != null || identifier != '') {
        that.Log('debug', 'SendEventWithFP: identifier: ' + identifier);
        that.SendEvent(eventType, data);
      } else {
        that.Log('error', 'SendEventWithFP: identifier is null');
      }
    });
  };

  SendEvent = async function (eventType, data) {
    this.Log('debug', 'SendEvent: eventType: ' + eventType);
    switch (eventType) {
      case ExcedePixel.EventType.Identify:
        var traits = {
          firstName: data['first_name'],
          lastName: data['last_name'],
          phone: data['phone'],
          totalSpent: data['total_spent'],
          email: data['email'],
        };
        this.Send(eventType, traits);
        break;
      case ExcedePixel.EventType.Screen:
        var screenData = this.GetDeviceInfo();
        this.Send(eventType, screenData);
        break;
      case ExcedePixel.EventType.Page:
        var pageInfo = await this.GetPageInfo();
        this.Send(eventType, pageInfo);
        break;
      case ExcedePixel.EventType.FormClosed:
        var pageInfo = await this.GetPageInfo();
        this.Send(eventType, pageInfo);
        break;
      case ExcedePixel.EventType.ProductSearched:
        var properties = {
          query: data,
        };
        this.Send(eventType, properties);
        break;
      case ExcedePixel.EventType.Error:
        var properties = {};
        var pageInfo = await this.GetPageInfo();
        properties.pageInfo = pageInfo;
        if (data instanceof Error) {
          properties.error = data?.message;
          properties.stack = data?.stack;
        } else {
          properties.error = data;
        }
        this.Send(eventType, properties);
        break;

      case ExcedePixel.EventType.ProductViewed:
      case ExcedePixel.EventType.ProductAdded:
      case ExcedePixel.EventType.ProductRemoved:
        var properties = {
          id: ExcedePixel.toInt(data['id']),
          sku: data['sku'],
          type: data['type'] ? data['type'] : data['product_type'],
          title: data['title'],
          vendor: data['vendor'],
          variant_id: ExcedePixel.toInt(data['variant_id']),
          image: data['image'],
          price: ExcedePixel.toInt(data['price']),
          quantity: ExcedePixel.toInt(data['quantity']),
          handle: data['handle'],
          currency: this.ShopCurrency,
        };

        if (typeof data?.variant_featured_image == 'object') {
          properties.featured_image = data?.variant_featured_image?.src;
        } else if (typeof data?.featured_image == 'object') {
          properties.featured_image = data?.featured_image?.src;
        } else if (
          typeof data?.featured_image == 'array' &&
          data?.featured_image.length > 0
        ) {
          properties.featured_image = data?.featured_image[0]?.src;
        } else {
          properties.featured_image = data?.featured_image;
        }

        try {
          var ip = await this.GetUserIpAddress();
          if (ip != null) {
            properties.ip = ip;
          }
        } catch (error) {
          this.Log('error', 'Error getting IP: ' + error);
        }

        this.Send(eventType, properties);
        break;
      default:
        this.Log('error', 'SendEvent: Unknown event type: ' + eventType);
        return;
    }
  };
  Send = function (eventType, body) {
    if (this.Disabled) {
      return;
    }
    if (body == null) {
      this.Log('error', 'Send: body is null');
      return;
    }

    var dataToSend = {};
    dataToSend.type = eventType;

    //Identify calls expect properties to be send under 'traits' vs 'properties' for the rest
    if (eventType == ExcedePixel.EventType.Identify) {
      dataToSend.traits = body;
    } else {
      dataToSend.properties = body;
    }

    this.LastSentBody.unshift(dataToSend);

    var dataWithIds = this.AppendIdentifier(dataToSend, eventType);
    var dataToSend = JSON.stringify(dataWithIds);

    this.Log(
      'debug',
      'Send: eventType: ' +
      eventType +
      ' body: \n' +
      ExcedePixel.excedeStringify(dataWithIds)
    );
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    var that = this;
    fetch(`${this.BEAddress}/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataToSend,
    })
      .then(function (response) {
        that.Log(
          'debug',
          'Send: response:\n' + ExcedePixel.excedeStringify(response)
        );
      })
      .catch(function (error) {
        that.Log(
          'error',
          'Send: error:\n' + ExcedePixel.excedeStringify(error)
        );
      });
  };
  static excedeStringify(obj) {
    return JSON.stringify(obj, null, 2);
  }
  static toInt(n) {
    if (n == undefined || n == null) {
      return null;
    }
    return parseInt(n);
  }
  static getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
  static setCookie(cname, cvalue, exhours = 1) {
    var d = new Date();
    d.setTime(d.getTime() + exhours * 1 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }
}
