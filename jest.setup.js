import "@testing-library/jest-dom";

if (!global.crypto) {
  global.crypto = {};
}

global.crypto.randomUUID = global.crypto.randomUUID || (() => "test-id");
