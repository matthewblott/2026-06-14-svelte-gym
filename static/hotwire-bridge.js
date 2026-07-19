"use strict";
(() => {
  // src/lib/hotwire/bridge.ts
  var Bridge = class {
    #adapter;
    #lastMessageId;
    #pendingMessages;
    #pendingCallbacks;
    constructor() {
      this.#adapter = null;
      this.#lastMessageId = 0;
      this.#pendingMessages = [];
      this.#pendingCallbacks = /* @__PURE__ */ new Map();
    }
    start() {
      this.notifyApplicationAfterStart();
    }
    notifyApplicationAfterStart() {
      document.dispatchEvent(new Event("web-bridge:ready"));
    }
    supportsComponent(component) {
      if (this.#adapter) {
        return this.#adapter.supportsComponent(component);
      } else {
        return false;
      }
    }
    send({ component, event, data, callback }) {
      if (!this.#adapter) {
        this.#savePendingMessage({ component, event, data, callback });
        return null;
      }
      if (!this.supportsComponent(component)) return null;
      const id = this.generateMessageId();
      const message = {
        id,
        component,
        event,
        data: {
          ...data,
          metadata: {
            url: window.location.href
          }
        }
      };
      this.#adapter.receive(message);
      if (callback) {
        this.#pendingCallbacks.set(id, callback);
      }
      return id;
    }
    receive(message) {
      this.executeCallbackFor(message);
    }
    executeCallbackFor(message) {
      const callback = this.#pendingCallbacks.get(message.id);
      if (callback) {
        callback(message);
      }
    }
    removeCallbackFor(messageId) {
      if (this.#pendingCallbacks.has(messageId)) {
        this.#pendingCallbacks.delete(messageId);
      }
    }
    removePendingMessagesFor(component) {
      this.#pendingMessages = this.#pendingMessages.filter((message) => message.component !== component);
    }
    generateMessageId() {
      const id = ++this.#lastMessageId;
      return id.toString();
    }
    setAdapter(adapter) {
      this.#adapter = adapter;
      document.documentElement.dataset.bridgePlatform = this.#adapter.platform;
      this.adapterDidUpdateSupportedComponents();
      this.#sendPendingMessages();
    }
    adapterDidUpdateSupportedComponents() {
      if (this.#adapter) {
        document.documentElement.dataset.bridgeComponents = this.#adapter.supportedComponents.join(" ");
      }
    }
    #savePendingMessage(message) {
      this.#pendingMessages.push(message);
    }
    #sendPendingMessages() {
      this.#pendingMessages.forEach((message) => this.send(message));
      this.#pendingMessages = [];
    }
  };

  // src/lib/hotwire/utils.ts
  function locationWithActionIsSamePage(location) {
    return location.href === window.location.href;
  }
  function scrollToAnchorFromLocation(location) {
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView();
    }
  }
  function uuid() {
    return Array.from({ length: 36 }).map((_, i) => {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        return "-";
      } else if (i === 14) {
        return "4";
      } else if (i === 19) {
        return (Math.floor(Math.random() * 4) + 8).toString(16);
      } else {
        return Math.floor(Math.random() * 15).toString(16);
      }
    }).join("");
  }
  function canNavigate(url) {
    if (!window.HotwireNavigator.enabled) return false;
    const fileExtensions = [
      ".7z",
      ".aac",
      ".apk",
      ".avi",
      ".bmp",
      ".bz2",
      ".css",
      ".csv",
      ".deb",
      ".dmg",
      ".doc",
      ".docx",
      ".exe",
      ".gif",
      ".gz",
      ".heic",
      ".heif",
      ".ico",
      ".iso",
      ".jpeg",
      ".jpg",
      ".js",
      ".json",
      ".m4a",
      ".mkv",
      ".mov",
      ".mp3",
      ".mp4",
      ".mpeg",
      ".mpg",
      ".msi",
      ".ogg",
      ".ogv",
      ".pdf",
      ".pkg",
      ".png",
      ".ppt",
      ".pptx",
      ".rar",
      ".rtf",
      ".svg",
      ".tar",
      ".tif",
      ".tiff",
      ".txt",
      ".wav",
      ".webm",
      ".webp",
      ".wma",
      ".wmv",
      ".xls",
      ".xlsx",
      ".xml",
      ".zip"
    ];
    const hasFileExtension = fileExtensions.some((ext) => url.pathname.endsWith(ext));
    return url.origin === window.location.origin && !hasFileExtension;
  }

  // src/lib/hotwire/navigator.ts
  var nativeAdapter = null;
  var restorationIdentifier = uuid();
  var currentHistoryIndex = 0;
  var STORAGE_KEY = "hotwire-native-bolt:restoration-mapping";
  var HISTORY_INDEX_KEY = "hotwire-native-bolt:current-history-index";
  var startVisitHandler = async () => console.error("Start visit handler must be set");
  var cancelVisitHandler = async () => console.warn("Cancel visit handler is not set");
  function initializeHistoryIndex() {
    const stored = sessionStorage.getItem(HISTORY_INDEX_KEY);
    if (!stored) return;
    const parsed = parseInt(stored, 10);
    if (isNaN(parsed)) return;
    currentHistoryIndex = parsed;
  }
  function saveHistoryIndex(index) {
    sessionStorage.setItem(HISTORY_INDEX_KEY, index.toString());
  }
  function getStorageMapping() {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    return JSON.parse(stored);
  }
  function setStorageMapping(mapping) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(mapping));
  }
  function saveRestorationMapping(restorationId, index) {
    const mapping = getStorageMapping();
    mapping[restorationId] = index;
    setStorageMapping(mapping);
  }
  function getHistoryIndexForRestorationId(restorationId) {
    const mapping = getStorageMapping();
    return mapping[restorationId];
  }
  function invalidateFutureHistory(fromIndex) {
    const mapping = getStorageMapping();
    const validEntries = Object.entries(mapping).filter(([, index]) => index <= fromIndex);
    const filtered = Object.fromEntries(validEntries);
    setStorageMapping(filtered);
  }
  function waitForHistoryNavigation() {
    return new Promise((resolve) => {
      const onPopState = () => {
        window.removeEventListener("popstate", onPopState);
        resolve();
      };
      window.addEventListener("popstate", onPopState);
    });
  }
  initializeHistoryIndex();
  if (currentHistoryIndex === 0) {
    saveRestorationMapping(restorationIdentifier, 0);
  }
  function handlePathCall(functionPath, args) {
    switch (functionPath) {
      case "registerAdapter": {
        nativeAdapter = args[0];
        break;
      }
      case "navigator.locationWithActionIsSamePage": {
        return locationWithActionIsSamePage(args[0]);
      }
      case "navigator.startVisit": {
        const visit = new HotwireVisit(new URL(args[0]), args[1], args[2]);
        return nativeAdapter?.visitStarted(visit);
      }
      case "navigator.view.scrollToAnchorFromLocation": {
        scrollToAnchorFromLocation(args[0]);
        break;
      }
    }
    return void 0;
  }
  function handlePathAccess(path) {
    switch (path) {
      case "navigator.restorationIdentifier": {
        return restorationIdentifier;
      }
      case "navigator.location": {
        return window.location;
      }
    }
    return createNestedProxy(path);
  }
  function createNestedProxy(path = "") {
    return new Proxy(function() {
    }, {
      apply(_target, _thisArg, args) {
        return handlePathCall(path, args);
      },
      get(_target, prop, _receiver) {
        if (typeof prop === "symbol") return void 0;
        const newPath = path ? `${path}.${prop}` : `${prop}`;
        return handlePathAccess(newPath);
      }
    });
  }
  var HotwireVisit = class {
    constructor(location, restorationIdentifier2 = "", options = { action: "advance" }) {
      this.location = location;
      this.restorationIdentifier = restorationIdentifier2 || uuid();
      this.options = options;
      this.isPageRefresh = options.action === "replace";
    }
    location;
    identifier = uuid();
    options;
    hasCachedSnapshot() {
      return true;
    }
    isPageRefresh;
    restorationIdentifier;
    async #startVisit() {
      await startVisitHandler(this.location, this.restorationIdentifier, this.options);
      if (this.options.action === "replace") {
        this.#replaceCurrentHistoryEntry();
      } else {
        this.#advanceToNextHistoryEntry();
      }
      restorationIdentifier = this.restorationIdentifier;
    }
    #replaceCurrentHistoryEntry() {
      const mapping = getStorageMapping();
      const entriesWithoutCurrent = Object.entries(mapping).filter(([, index]) => index !== currentHistoryIndex);
      const filtered = Object.fromEntries(entriesWithoutCurrent);
      filtered[this.restorationIdentifier] = currentHistoryIndex;
      setStorageMapping(filtered);
    }
    #advanceToNextHistoryEntry() {
      currentHistoryIndex++;
      saveHistoryIndex(currentHistoryIndex);
      saveRestorationMapping(this.restorationIdentifier, currentHistoryIndex);
    }
    async #restore() {
      const targetIndex = getHistoryIndexForRestorationId(this.restorationIdentifier);
      if (targetIndex === void 0) return this.#fallbackToStartVisit("No history index found");
      const delta = targetIndex - currentHistoryIndex;
      if (delta >= 0) return this.#fallbackToStartVisit("Cannot navigate forward in history");
      await this.#navigateBackInHistory(delta);
      this.#updateHistoryState(targetIndex);
      await startVisitHandler(this.location, this.restorationIdentifier, this.options);
    }
    async #fallbackToStartVisit(reason) {
      console.warn(`${reason} for restorationIdentifier: ${this.restorationIdentifier}, deferring to start visit`);
      return this.#startVisit();
    }
    async #navigateBackInHistory(delta) {
      const navigationPromise = waitForHistoryNavigation();
      history.go(delta);
      await navigationPromise;
    }
    #updateHistoryState(targetIndex) {
      invalidateFutureHistory(targetIndex);
      currentHistoryIndex = targetIndex;
      saveHistoryIndex(currentHistoryIndex);
      restorationIdentifier = this.restorationIdentifier;
    }
    issueRequest() {
      nativeAdapter?.visitRequestStarted(this);
      const operation = this.options.action === "restore" ? this.#restore() : this.#startVisit();
      operation.then(this.#handleSuccessfulVisit).catch(this.#handleFailedVisit).finally(this.#visitCompleted);
    }
    #handleSuccessfulVisit = () => {
      nativeAdapter?.visitRequestCompleted(this);
      nativeAdapter?.visitRequestFinished(this);
      nativeAdapter?.visitRendered(this);
    };
    #handleFailedVisit = (error) => {
      const statusCode = this.#extractStatusCode(error);
      nativeAdapter?.visitRequestFailedWithStatusCode(this, statusCode);
    };
    #visitCompleted = () => {
      nativeAdapter?.visitCompleted(this);
    };
    #extractStatusCode(error) {
      if (typeof error === "object" && error !== null && "status" in error && typeof error.status === "number") {
        return error.status;
      }
      return 500;
    }
    // Frameworks like sveltekit and nextjs manage their own history and snapshots.
    changeHistory() {
    }
    loadCachedSnapshot() {
    }
    loadResponse() {
    }
    cancel() {
      return cancelVisitHandler(this.location, this.restorationIdentifier, this.options);
    }
  };
  var HotwireNavigator = {
    canNavigate,
    get enabled() {
      return !!nativeAdapter;
    },
    setStartVisitHandler(handler) {
      startVisitHandler = handler;
    },
    setCancelVisitHandler(handler) {
      cancelVisitHandler = handler;
    },
    visitProposedToLocation(location, options) {
      nativeAdapter?.visitProposedToLocation(location, {
        action: options?.action ?? "advance"
      });
    },
    formSubmissionStarted(location) {
      nativeAdapter?.formSubmissionStarted({ location });
    },
    formSubmissionFinished(location) {
      nativeAdapter?.formSubmissionFinished({ location });
    }
  };
  function createTurbo() {
    return createNestedProxy();
  }

  // src/lib/hotwire/index.ts
  window.HotwireNavigator = HotwireNavigator;
  window.Turbo = createTurbo();
  var webBridge = new Bridge();
  if (!window.Strada) {
    window.Strada = { web: webBridge };
  }
  if (!window.HotwireNative) {
    window.HotwireNative = {
      web: webBridge
    };
  }
  webBridge.start();
})();
