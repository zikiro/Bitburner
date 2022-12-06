/** @param {NS} ns */
export async function main(ns) {
	ns.purchaseServer('faze', 32768);
	await ns.sleep(100000);
}