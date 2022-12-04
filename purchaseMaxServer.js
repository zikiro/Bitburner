/** @param {NS} ns */
export async function main(ns) {
const server = ns.args[0];
const ram = ns.args[1];
await ns.killall(server);
await ns.deleteServer(server);
await ns.purchaseServer(server, ram);
await ns.sleep(15000);
}