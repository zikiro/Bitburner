/** @param {NS} ns */
export async function main(ns) {
	const server = ns.args[0];
	const ram = ns.args[1];
	if (ns.serverExists(server)) {
		await ns.killall(server);
		await ns.deleteServer(server);
	}
	await ns.purchaseServer(server, ram);

}