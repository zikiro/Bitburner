/** @param {NS} ns */
export async function main(ns) {
	ns.purchaseServer('faze', 65536);
	await ns.sleep(100000);
}