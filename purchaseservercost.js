/** @param {NS} ns */
export async function main(ns) {
	
	const ram = ns.args[0];
	const cost = await ns.getPurchasedServerCost(ram);
	ns.tprint(cost);
	
}