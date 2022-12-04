/** @param {NS} ns */
export async function main(ns) {
	const targets = ns.args;
	const hosts = await ns.scan();
	const weakenFile = 'weaken.js';
	const weakenFileSetup = 'maxWeaken.js';

	hosts.forEach(async (host) => {
		const currentTarget = Math.floor(Math.random() * targets.length);
		const server = await ns.getServer(host);
		if (!server.purchasedByPlayer || server.hostname === 'home') return;
		await ns.killall(host);

		if (!ns.fileExists(weakenFile, host)) {
			await ns.scp(weakenFile, host);
		}
		if (ns.fileExists(weakenFileSetup, host)) {
			ns.rm(weakenFileSetup, host)
		}
		await ns.scp(weakenFileSetup, host);
		await ns.exec(weakenFileSetup, host, 1, targets[currentTarget]);
	});


}