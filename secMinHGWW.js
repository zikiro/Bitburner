/** @param {NS} ns */
export async function main(ns) {
	const server = ns.args[0];
	let secLvMin = false;
	while (true) {
		const curSecLV = await ns.getServerSecurityLevel(server);
		const minSecLV = await ns.getServerMinSecurityLevel(server);
		const maxSec = minSecLV * 1.5;
		if (secLvMin || curSecLV <= minSecLV) {
			if (!secLvMin) {
				secLvMin = true;
			}
			if (curSecLV <= maxSec) {
				await ns.hack(server);
				await ns.grow(server);
				await ns.weaken(server);
				await ns.weaken(server);
			} else {
				await ns.weaken(server);
			}
		} else {
			await ns.weaken(server);
		}

	}
}