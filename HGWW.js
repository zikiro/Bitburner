/** @param {NS} ns */
export async function main(ns) {
	const server = ns.args[0];
	while (true) {
		await ns.hack(server);
		await ns.grow(server);
		await ns.weaken(server);
		await ns.weaken(server);
	}
}