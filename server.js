#!/usr/bin/env node
// Compatibility entrypoint so `node server.js` works from the project root.
// It simply imports and runs the actual server implementation in /server.
import "./server/server.js";
