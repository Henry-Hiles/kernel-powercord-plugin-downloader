const { contextBridge } = require("electron")
const { resolve, join } = require("path")

const exec = require("util").promisify(require("child_process").exec)

contextBridge.exposeInMainWorld("download", async (link, plugin) => {
    const pluginsPath = join(
        resolve(__dirname, "..", ".."),
        "powercord",
        plugin ? "plugins" : "themes"
    )
    try {
        await exec(`git clone ${link[0]}`, {
            cwd: pluginsPath,
        })

        return {
            reloadMessage: "Please reload discord with Ctrl+R.",
        }
    } catch (error) {
        return { error }
    }
})
