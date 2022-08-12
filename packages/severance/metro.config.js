// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config")
const path = require("path")

const PROJECT_ROOT = __dirname
const WORKSPACE_ROOT = path.resolve(__dirname, "../../")
const config = getDefaultConfig(__dirname)

config.watchFolders = [WORKSPACE_ROOT]

config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [
    path.resolve(PROJECT_ROOT, "node_modules"),
    path.resolve(WORKSPACE_ROOT, "node_modules")
  ]
}

module.exports = config
